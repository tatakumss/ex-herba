import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import PlantIdentificationService from '../../services/PlantIdentificationService';

export default function PlantScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);

  useEffect(() => {
    // Initialize TensorFlow models on component mount
    const initializeModels = async () => {
      try {
        await PlantIdentificationService.initialize();
        setIsModelLoading(false);
      } catch (error) {
        console.error('Failed to initialize models:', error);
        setIsModelLoading(false);
        Alert.alert('Model Loading Error', 'Failed to load plant identification models. Some features may not work properly.');
      }
    };

    initializeModels();
  }, []);

  const identifyPlantFromImage = async (imageUri) => {
    setIsIdentifying(true);

    try {
      // Use real TensorFlow Lite models for identification
      const identificationResult = await PlantIdentificationService.identifyWithAllModels(imageUri);

      if (identificationResult.success) {
        const { plant, leaf, mendeley } = identificationResult.results;
        
        // Get the best result from all models
        let bestResult = null;
        let modelUsed = '';
        
        if (plant.success && plant.topResult.confidence > 0.5) {
          bestResult = plant.topResult;
          modelUsed = 'Plant Species Model';
        } else if (leaf.success && leaf.topResult.confidence > 0.5) {
          bestResult = leaf.topResult;
          modelUsed = 'Leaf Classification Model';
        } else if (mendeley.success && mendeley.topResult.confidence > 0.5) {
          bestResult = mendeley.topResult;
          modelUsed = 'Academic Plant Model';
        }

        if (bestResult) {
          Alert.alert(
            'Herbal Plant Identified!',
            `${bestResult.label}\n\nConfidence: ${bestResult.percentage}%\nModel: ${modelUsed}\n\nTop 3 Results:\n${plant.success ? plant.results.slice(0, 3).map(r => `• ${r.label} (${r.percentage}%)`).join('\n') : 'No results'}`,
            [
              { text: 'View Details', onPress: () => showDetailedResults(identificationResult) },
              { text: 'Save to Collection' },
              { text: 'OK' }
            ]
          );
        } else {
          Alert.alert(
            'Identification Uncertain',
            'The models could not confidently identify this herbal plant. Please try:\n• Taking a clearer photo\n• Better lighting\n• Different angle\n• Focus on leaves or distinctive features',
            [{ text: 'Try Again' }, { text: 'OK' }]
          );
        }
      } else {
        Alert.alert('Identification Failed', 'Unable to process the image. Please try again.');
      }
    } catch (error) {
      console.error('Identification error:', error);
      Alert.alert('Error', 'An error occurred during plant identification. Please try again.');
    } finally {
      setIsIdentifying(false);
    }
  };

  const handleCameraPress = async () => {
    if (isModelLoading) {
      Alert.alert('Please Wait', 'Plant identification models are still loading...');
      return;
    }

    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Camera permission is required to take photos');
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      await identifyPlantFromImage(result.assets[0].uri);
    }
  };

  const handleUploadPress = async () => {
    if (isModelLoading) {
      Alert.alert('Please Wait', 'Plant identification models are still loading...');
      return;
    }

    // Request media library permissions
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Gallery access is required to select photos');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
      await identifyPlantFromImage(result.assets[0].uri);
    }
  };

  const showDetailedResults = (results) => {
    const { plant, leaf, mendeley } = results.results;
    let detailText = 'Detailed Results:\n\n';
    
    if (plant.success) {
      detailText += `🌿 Plant Species Model:\n${plant.results.slice(0, 3).map(r => `  • ${r.label}: ${r.percentage}%`).join('\n')}\n\n`;
    }
    
    if (leaf.success) {
      detailText += `🍃 Leaf Classification Model:\n${leaf.results.slice(0, 3).map(r => `  • ${r.label}: ${r.percentage}%`).join('\n')}\n\n`;
    }
    
    if (mendeley.success) {
      detailText += `🔬 Academic Model:\n${mendeley.results.slice(0, 3).map(r => `  • ${r.label}: ${r.percentage}%`).join('\n')}`;
    }

    Alert.alert('Detailed Results', detailText, [{ text: 'OK' }]);
  };

  const handleLibraryPress = () => {
    router.push("/(tabs)/library");
  };

  return (
    <View className="flex-1 bg-green-50">
      {/* Header */}
      <View className="px-4 pt-12 pb-6">
        <Text className="text-2xl font-bold text-green-800 text-center">
          Plant Identification
        </Text>
        <Text className="text-gray-600 text-center mt-2">
          Discover and learn about plants around you
        </Text>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Capture Herbal Plants Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons name="camera-outline" size={24} color="#2f855a" />
            <Text className="text-xl font-bold text-green-800 ml-2">Capture Herbal Plants</Text>
          </View>
          <TouchableOpacity
            onPress={handleCameraPress}
            className="bg-white rounded-2xl p-6 shadow-lg flex-row items-center"
            activeOpacity={0.7}
            disabled={isIdentifying || isModelLoading}
          >
            <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center">
              {isIdentifying ? (
                <ActivityIndicator size="large" color="#2f855a" />
              ) : (
                <Ionicons name="camera" size={32} color="#2f855a" />
              )}
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-green-800">
                {isModelLoading ? 'Loading Models...' : isIdentifying ? 'Identifying...' : 'Take Photo'}
              </Text>
              <Text className="text-gray-500 mt-1">
                {isModelLoading ? 'AI models are loading, please wait' : 
                 isIdentifying ? 'Processing your herbal plant image' : 
                 'Use camera to capture herbal plants in real-time'}
              </Text>
            </View>
            {!isIdentifying && !isModelLoading && (
              <Ionicons name="chevron-forward" size={24} color="#9ae6b4" />
            )}
          </TouchableOpacity>
        </View>

        {/* Upload Herbal Plants Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons name="image-outline" size={24} color="#7c3aed" />
            <Text className="text-xl font-bold text-green-800 ml-2">Upload Herbal Plants</Text>
          </View>
          <TouchableOpacity
            onPress={handleUploadPress}
            className="bg-white rounded-2xl p-6 shadow-lg flex-row items-center"
            activeOpacity={0.7}
            disabled={isIdentifying || isModelLoading}
          >
            <View className="w-16 h-16 rounded-full bg-purple-100 items-center justify-center">
              {isIdentifying ? (
                <ActivityIndicator size="large" color="#7c3aed" />
              ) : (
                <Ionicons name="image" size={32} color="#7c3aed" />
              )}
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-green-800">
                {isModelLoading ? 'Loading Models...' : isIdentifying ? 'Identifying...' : 'Select from Gallery'}
              </Text>
              <Text className="text-gray-500 mt-1">
                {isModelLoading ? 'AI models are loading, please wait' : 
                 isIdentifying ? 'Processing your herbal plant image' : 
                 'Choose existing herbal plant photos from gallery'}
              </Text>
            </View>
            {!isIdentifying && !isModelLoading && (
              <Ionicons name="chevron-forward" size={24} color="#9ae6b4" />
            )}
          </TouchableOpacity>
        </View>

        {/* Browse Library Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons name="book-open-outline" size={24} color="#2563eb" />
            <Text className="text-xl font-bold text-green-800 ml-2">Browse Library</Text>
          </View>
          <TouchableOpacity
            onPress={handleLibraryPress}
            className="bg-white rounded-2xl p-6 shadow-lg flex-row items-center"
            activeOpacity={0.7}
          >
            <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center">
              <Ionicons name="library" size={32} color="#2563eb" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-green-800">Explore Plant Database</Text>
              <Text className="text-gray-500 mt-1">
                Browse comprehensive herbal plant collection
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9ae6b4" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <Text className="text-lg font-bold text-green-800 mb-4">Quick Stats</Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center mb-2">
                <MaterialCommunityIcons name="leaf" size={24} color="#2f855a" />
              </View>
              <Text className="text-sm text-gray-500">Identified</Text>
              <Text className="text-lg font-bold text-green-800">12</Text>
            </View>
            <View className="items-center">
              <View className="w-12 h-12 rounded-full bg-blue-100 items-center justify-center mb-2">
                <Ionicons name="bookmark" size={24} color="#2563eb" />
              </View>
              <Text className="text-sm text-gray-500">Saved</Text>
              <Text className="text-lg font-bold text-green-800">8</Text>
            </View>
            <View className="items-center">
              <View className="w-12 h-12 rounded-full bg-orange-100 items-center justify-center mb-2">
                <Ionicons name="camera" size={24} color="#ea580c" />
              </View>
              <Text className="text-sm text-gray-500">Photos</Text>
              <Text className="text-lg font-bold text-green-800">24</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-2xl p-6 shadow-lg">
          <Text className="text-lg font-bold text-green-800 mb-4">Recent Activity</Text>
          <View className="space-y-3">
            {[
              { name: "Turmeric", time: "2 hours ago", type: "identified", benefits: "Anti-inflammatory" },
              { name: "Ginger", time: "1 day ago", type: "saved", benefits: "Digestive aid" },
              { name: "Lavender", time: "3 days ago", type: "identified", benefits: "Calming" },
            ].map((item, index) => (
              <View key={index} className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-green-100 items-center justify-center">
                  <MaterialCommunityIcons name="leaf" size={20} color="#2f855a" />
                </View>
                <View className="ml-3 flex-1">
                  <Text className="font-semibold text-gray-800">{item.name}</Text>
                  <Text className="text-xs text-blue-600">{item.benefits}</Text>
                  <Text className="text-sm text-gray-500">{item.time}</Text>
                </View>
                <View className={`px-2 py-1 rounded-full ${
                  item.type === 'identified' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  <Text className={`text-xs font-medium ${
                    item.type === 'identified' ? 'text-green-700' : 'text-blue-700'
                  }`}>
                    {item.type}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

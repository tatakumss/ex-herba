import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

export default function PlantScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCameraPress = async () => {
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
      // Simulate plant identification
      Alert.alert(
        'Plant Identified!', 
        'This appears to be Turmeric (Curcuma longa)\n\nBenefits: Anti-inflammatory, Antioxidant\n\nConfidence: 94%',
        [{ text: 'Save to Collection' }, { text: 'OK' }]
      );
    }
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
        {/* Main Action Cards */}
        <View className="space-y-4 mb-8">
          {/* Camera Card */}
          <TouchableOpacity
            onPress={handleCameraPress}
            className="bg-white rounded-2xl p-6 shadow-lg flex-row items-center"
            activeOpacity={0.7}
          >
            <View className="w-16 h-16 rounded-full bg-green-100 items-center justify-center">
              <Ionicons name="camera" size={32} color="#2f855a" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-green-800">Take Photo</Text>
              <Text className="text-gray-500 mt-1">
                Capture a plant to identify it instantly
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#9ae6b4" />
          </TouchableOpacity>

          {/* Library Card */}
          <TouchableOpacity
            onPress={handleLibraryPress}
            className="bg-white rounded-2xl p-6 shadow-lg flex-row items-center"
            activeOpacity={0.7}
          >
            <View className="w-16 h-16 rounded-full bg-blue-100 items-center justify-center">
              <Ionicons name="library" size={32} color="#2563eb" />
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-lg font-bold text-green-800">Browse Library</Text>
              <Text className="text-gray-500 mt-1">
                Explore our comprehensive plant database
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

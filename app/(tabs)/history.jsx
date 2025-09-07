import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function History() {
  const historyData = [
    {
      id: 1,
      name: "Turmeric",
      scientific: "Curcuma longa",
      date: "2024-01-15",
      time: "2:30 PM",
      confidence: 95,
      status: "identified",
      benefits: "Anti-inflammatory, Antioxidant"
    },
    {
      id: 2,
      name: "Ginger",
      scientific: "Zingiber officinale",
      date: "2024-01-14",
      time: "10:15 AM",
      confidence: 88,
      status: "saved",
      benefits: "Digestive aid, Nausea relief"
    },
    {
      id: 3,
      name: "Echinacea",
      scientific: "Echinacea purpurea",
      date: "2024-01-13",
      time: "4:45 PM",
      confidence: 92,
      status: "identified",
      benefits: "Immune support"
    },
    {
      id: 4,
      name: "Lavender",
      scientific: "Lavandula angustifolia",
      date: "2024-01-12",
      time: "11:20 AM",
      confidence: 89,
      status: "saved",
      benefits: "Calming, Sleep aid"
    },
    {
      id: 5,
      name: "Chamomile",
      scientific: "Matricaria chamomilla",
      date: "2024-01-11",
      time: "3:10 PM",
      confidence: 96,
      status: "identified",
      benefits: "Relaxation, Digestive"
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 90) return 'bg-green-100';
    if (confidence >= 75) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <View className="flex-1 bg-green-50">
      {/* Header */}
      <View className="px-4 pt-12 pb-6 bg-white">
        <Text className="text-2xl font-bold text-green-800 text-center">
          Identification History
        </Text>
        <Text className="text-gray-600 text-center mt-2">
          Your plant discovery journey
        </Text>
      </View>

      {/* Stats Summary */}
      <View className="mx-4 mt-4 bg-white rounded-2xl p-4 shadow-lg">
        <View className="flex-row justify-around">
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-800">{historyData.length}</Text>
            <Text className="text-sm text-gray-500">Total Scans</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-800">
              {historyData.filter(item => item.status === 'identified').length}
            </Text>
            <Text className="text-sm text-gray-500">Identified</Text>
          </View>
          <View className="items-center">
            <Text className="text-2xl font-bold text-green-800">
              {historyData.filter(item => item.status === 'saved').length}
            </Text>
            <Text className="text-sm text-gray-500">Saved</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <Text className="text-lg font-bold text-green-800 mb-4 mt-4">Recent Activity</Text>
        
        {historyData.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="bg-white rounded-2xl p-4 shadow-lg mb-3"
            activeOpacity={0.7}
          >
            <View className="flex-row items-start">
              {/* Plant Icon */}
              <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
                <MaterialCommunityIcons name="leaf" size={24} color="#2f855a" />
              </View>
              
              {/* Plant Info */}
              <View className="ml-4 flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-bold text-gray-800 text-lg">{item.name}</Text>
                  <View className={`px-2 py-1 rounded-full ${getConfidenceBg(item.confidence)}`}>
                    <Text className={`text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                      {item.confidence}% match
                    </Text>
                  </View>
                </View>
                
                <Text className="text-gray-500 italic text-sm mt-1">{item.scientific}</Text>
                <Text className="text-xs text-blue-600 mt-1">{item.benefits}</Text>
                
                <View className="flex-row items-center justify-between mt-2">
                  <View className="flex-row items-center">
                    <Ionicons name="calendar-outline" size={14} color="#6b7280" />
                    <Text className="text-gray-500 text-sm ml-1">
                      {formatDate(item.date)} at {item.time}
                    </Text>
                  </View>
                  
                  <View className={`px-2 py-1 rounded-full ${
                    item.status === 'identified' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      item.status === 'identified' ? 'text-blue-700' : 'text-purple-700'
                    }`}>
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {historyData.length === 0 && (
          <View className="items-center justify-center py-12">
            <MaterialCommunityIcons name="leaf-off" size={64} color="#9ae6b4" />
            <Text className="text-gray-500 text-lg mt-4">No history yet</Text>
            <Text className="text-gray-400 text-center mt-2">
              Start identifying plants to see your history here
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

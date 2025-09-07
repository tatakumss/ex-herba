import { View, Text, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");

  const herbalPlants = [
    { name: "Turmeric", scientific: "Curcuma longa", difficulty: "Easy", benefits: "Anti-inflammatory, Antioxidant" },
    { name: "Ginger", scientific: "Zingiber officinale", difficulty: "Easy", benefits: "Digestive aid, Nausea relief" },
    { name: "Lavender", scientific: "Lavandula angustifolia", difficulty: "Easy", benefits: "Calming, Sleep aid" },
    { name: "Echinacea", scientific: "Echinacea purpurea", difficulty: "Medium", benefits: "Immune support" },
    { name: "Chamomile", scientific: "Matricaria chamomilla", difficulty: "Easy", benefits: "Relaxation, Digestive" },
    { name: "Peppermint", scientific: "Mentha piperita", difficulty: "Easy", benefits: "Digestive, Respiratory" },
  ];

  return (
    <View className="flex-1 bg-green-50">
      {/* Header */}
      <View className="px-4 pt-12 pb-6 bg-white">
        <Text className="text-2xl font-bold text-green-800 text-center mb-4">
          Plant Library
        </Text>
        
        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-2xl px-4 py-3">
          <Ionicons name="search" size={20} color="#6b7280" />
          <TextInput
            placeholder="Search plants..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-3 text-gray-800"
          />
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Herbal Plants */}
        <Text className="text-lg font-bold text-green-800 mb-4">Herbal Plants</Text>
        <View className="space-y-3">
          {herbalPlants.map((plant, index) => (
            <TouchableOpacity
              key={index}
              className="bg-white rounded-2xl p-4 shadow-lg flex-row items-center"
              activeOpacity={0.7}
            >
              <View className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
                <MaterialCommunityIcons name="leaf" size={24} color="#2f855a" />
              </View>
              <View className="ml-4 flex-1">
                <Text className="font-semibold text-gray-800">{plant.name}</Text>
                <Text className="text-sm text-gray-500 italic">{plant.scientific}</Text>
                <Text className="text-xs text-blue-600 mt-1">{plant.benefits}</Text>
                <View className="flex-row items-center mt-1">
                  <View className={`px-2 py-1 rounded-full ${
                    plant.difficulty === 'Easy' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      plant.difficulty === 'Easy' ? 'text-green-700' : 'text-yellow-700'
                    }`}>
                      {plant.difficulty}
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9ae6b4" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

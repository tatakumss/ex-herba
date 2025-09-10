import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-green-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-10 pb-6 bg-green-100 rounded-b-3xl shadow-md">
        {/* Left: Profile + Greeting */}
        <View className="flex-row items-center space-x-2">
          <Ionicons name="person-circle-outline" size={36} color="#2f855a" />
          <View>
            <Text className="text-base text-gray-700">Hello,</Text>
            <Text className="text-lg font-bold text-green-800">User 👋</Text>
          </View>
        </View>

        {/* Right: Notifications */}
        <TouchableOpacity className="p-2 rounded-full bg-white shadow">
          <Ionicons name="notifications-outline" size={26} color="#2f855a" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Plant Collected Card */}
        <View className="bg-white rounded-2xl p-5 shadow-lg flex-row items-center mb-6">
          <View className="w-14 h-14 rounded-full bg-green-100 items-center justify-center">
            <MaterialCommunityIcons name="leaf" size={30} color="#2f855a" />
          </View>
          <View className="ml-4">
            <Text className="text-lg font-bold text-green-800">Plant Collected</Text>
            <Text className="text-gray-500">You have 12 plants 🌱</Text>
          </View>
        </View>

        {/* Large Skeleton Image Row */}
        <Text className="text-lg font-bold text-green-800 mb-4">Your Collection</Text>
        <View className="flex-row justify-between flex-wrap mb-20">
          {[...Array(5)].map((_, index) => (
            <View
              key={index}
              className="w-[45%] h-40 bg-green-100 rounded-2xl shadow-md items-center justify-center mb-4"
            >
              <Ionicons name="image-outline" size={48} color="#9ae6b4" />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Middle Tab (Plant Button) */}
      <TouchableOpacity
        className="absolute bottom-6 self-center bg-green-400 w-16 h-16 rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="leaf" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}

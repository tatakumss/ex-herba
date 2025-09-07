import { View, Text, ScrollView, TouchableOpacity, Switch } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Profile() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const profileStats = [
    { label: "Plants Identified", value: "47", icon: "leaf", color: "#16a34a" },
    { label: "Days Active", value: "23", icon: "calendar", color: "#0891b2" },
    { label: "Photos Taken", value: "156", icon: "camera", color: "#dc2626" },
    { label: "Plants Saved", value: "32", icon: "bookmark", color: "#7c3aed" },
  ];

  const menuItems = [
    { title: "My Collection", icon: "bookmark-outline", hasArrow: true },
    { title: "Settings", icon: "settings-outline", hasArrow: true },
    { title: "Help & Support", icon: "help-circle-outline", hasArrow: true },
    { title: "About", icon: "information-circle-outline", hasArrow: true },
  ];

  return (
    <View className="flex-1 bg-green-50">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="bg-green-600 pt-12 pb-8 px-4">
          <View className="items-center">
            <View className="w-24 h-24 rounded-full bg-white items-center justify-center mb-4 shadow-lg">
              <Ionicons name="person" size={48} color="#16a34a" />
            </View>
            <Text className="text-2xl font-bold text-white">Plant Explorer</Text>
            <Text className="text-green-100 mt-1">Botanical Enthusiast</Text>
          </View>
        </View>

        {/* Stats Cards */}
        <View className="px-4 -mt-6">
          <View className="bg-white rounded-2xl p-4 shadow-lg">
            <Text className="text-lg font-bold text-gray-800 mb-4 text-center">Your Journey</Text>
            <View className="flex-row flex-wrap justify-between">
              {profileStats.map((stat, index) => (
                <View key={index} className="w-[48%] items-center mb-4">
                  <View 
                    className="w-12 h-12 rounded-full items-center justify-center mb-2"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <Ionicons name={stat.icon} size={24} color={stat.color} />
                  </View>
                  <Text className="text-2xl font-bold text-gray-800">{stat.value}</Text>
                  <Text className="text-sm text-gray-500 text-center">{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-4 mt-6">
          <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                className={`flex-row items-center px-4 py-4 ${
                  index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
                }`}
                activeOpacity={0.7}
              >
                <View className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
                  <Ionicons name={item.icon} size={20} color="#6b7280" />
                </View>
                <Text className="flex-1 ml-4 text-gray-800 font-medium">{item.title}</Text>
                {item.hasArrow && (
                  <Ionicons name="chevron-forward" size={20} color="#9ae6b4" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View className="px-4 mt-6">
          <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <View className="px-4 py-3 border-b border-gray-100">
              <Text className="font-semibold text-gray-800">Preferences</Text>
            </View>
            
            <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center">
                  <Ionicons name="notifications-outline" size={20} color="#3b82f6" />
                </View>
                <Text className="ml-4 text-gray-800 font-medium">Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#e5e7eb', true: '#16a34a' }}
                thumbColor={notificationsEnabled ? '#ffffff' : '#ffffff'}
              />
            </View>

            <View className="flex-row items-center justify-between px-4 py-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-purple-100 items-center justify-center">
                  <Ionicons name="moon-outline" size={20} color="#8b5cf6" />
                </View>
                <Text className="ml-4 text-gray-800 font-medium">Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#e5e7eb', true: '#16a34a' }}
                thumbColor={darkModeEnabled ? '#ffffff' : '#ffffff'}
              />
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

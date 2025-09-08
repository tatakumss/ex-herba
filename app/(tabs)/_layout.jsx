import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { View, Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === 'ios' ? 25 : 15,
          left: 50,
          right: 50,
          backgroundColor: "white",
          borderRadius: 25,
          height: 60,
          paddingHorizontal: 20,
          elevation: 0,
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: "#e5e7eb",
        },
        tabBarActiveTintColor: "#22c55e",
        tabBarInactiveTintColor: "#6b7280",
      }}
    >
      {/* Home */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`${focused ? 'bg-green-500' : 'bg-transparent'} w-10 h-10 rounded-2xl items-center justify-center`}>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={24}
                  color={focused ? "white" : "#6b7280"}
                />
              </View>
            </View>
          ),
        }}
      />

      {/* Library */}
      <Tabs.Screen
        name="library"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`${focused ? 'bg-green-500' : 'bg-transparent'} w-10 h-10 rounded-2xl items-center justify-center`}>
                <Ionicons
                  name={focused ? "library" : "library-outline"}
                  size={24}
                  color={focused ? "white" : "#6b7280"}
                />
              </View>
            </View>
          ),
        }}
      />

      {/* Floating Plant Tab (center) */}
      <Tabs.Screen
        name="plant"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center -mt-4">
              <View className={`${focused ? 'bg-green-600' : 'bg-green-500'} w-12 h-12 rounded-2xl items-center justify-center`}>
                <MaterialCommunityIcons name="leaf" size={28} color="white" />
              </View>
            </View>
          ),
        }}
      />

      {/* History */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`${focused ? 'bg-green-500' : 'bg-transparent'} w-10 h-10 rounded-2xl items-center justify-center`}>
                <Ionicons
                  name={focused ? "time" : "time-outline"}
                  size={24}
                  color={focused ? "white" : "#6b7280"}
                />
              </View>
            </View>
          ),
        }}
      />

      {/* Profile */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className="items-center justify-center">
              <View className={`${focused ? 'bg-green-500' : 'bg-transparent'} w-10 h-10 rounded-2xl items-center justify-center`}>
                <Ionicons
                  name={focused ? "person" : "person-outline"}
                  size={24}
                  color={focused ? "white" : "#6b7280"}
                />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

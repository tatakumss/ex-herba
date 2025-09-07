import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Animated } from "react-native"; // For icon scale animation
import "../../global.css";

function TabBarIcon({ name, color, size, focused }) {
  return (
    <Animated.View
      style={{
        transform: [{ scale: focused ? 1.2 : 1 }],
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name={name} size={size} color={color} />
    </Animated.View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#67C090", 
        tabBarInactiveTintColor: "#9CA3AF", // Gray-400
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          backgroundColor: "#fff",
          borderRadius: 20,
          height: 70,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.15,
          shadowRadius: 6,
          elevation: 6, // Android shadow
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="home-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="book-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="time-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <TabBarIcon name="person-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

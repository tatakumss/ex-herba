import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate after 3 seconds (adjust as needed)
    const timer = setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/lottie/Leaf scanning.json")}
        autoPlay
        loop={false}   // play once
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // match your brand color
    justifyContent: "center",
    alignItems: "center",
  },
});

import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from "react-native";
import { wp, hp } from "../helpers/common";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { theme } from "../constants/theme";
import { useRouter } from "expo-router";

export default function Welcomescreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.bgImage}
        resizeMode="cover"
      />
      <Animated.View
        entering={FadeInDown.duration(1000).springify()}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0)",
            "rgba(255,255,255,0.5)",
            "white",
            "white",
          ]}
          style={styles.gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
        />
      </Animated.View>
      <View style={styles.contentContainer}>
        <Animated.View entering={FadeInDown.duration(1000).springify()}>
          <Text style={styles.title}>VistaHaven</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(1000).delay(200).springify()}
        >
          <Text style={styles.punchline}>Your Sanctuary of Stunning Views</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(1000).delay(200).springify()}
        >
          <Pressable
            onPress={() => router.push("home")}
            style={styles.startButton}
          >
            <Text style={styles.startTitle}>Start Exploring</Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
    position: "absolute",
  },
  gradient: {
    width: wp(100),
    height: hp(70),
    bottom: 0,
    position: "absolute",
  },
  contentContainer: {
    position: "absolute",
    bottom: hp(11),
    width: wp(100),
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: hp(6),
    fontWeight: theme.fontWeights.bold,
    color: "#000",
    marginBottom: 10,
  },
  punchline: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  startTitle: {
    fontSize: 16,
    color: "#FFF",
  },
});

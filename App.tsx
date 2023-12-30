import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { customFontLocation } from "./constants";
import NavigationRoutes from "./navigation";

export default function App() {
  const [fontsLoaded] = useFonts(customFontLocation);

  if (!fontsLoaded) return null;
  return (
    <NavigationContainer>
      <NavigationRoutes />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

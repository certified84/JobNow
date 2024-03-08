import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { customFontLocation } from "./constants";
import NavigationRoutes from "./navigation";
import { MenuProvider } from "react-native-popup-menu";

export default function App() {
  const [fontsLoaded] = useFonts(customFontLocation);

  if (!fontsLoaded) return null;
  return (
    <MenuProvider>
      <NavigationContainer>
        <NavigationRoutes />
      </NavigationContainer>
    </MenuProvider>
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

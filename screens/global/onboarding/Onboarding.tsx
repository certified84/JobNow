import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import { Briefcase, User } from "../../../assets/svg/Onboarding";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types";

export default function OnboardingScreen() {
  const navigation = useNavigation<StackNavigation>();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconContainer}>
          <Briefcase />
        </View>
        <Text style={styles.title}>JobNow</Text>
      </View>
      <Text style={{ ...TYPOGRAPHY.h2, margin: SIZES.md, color: COLORS.white }}>
        Conneting you to your next job opportunity instantly. Find your dream
        job with us
      </Text>
      <View style={{ width: "100%", justifyContent: "center" }}>
        <TouchableOpacity
          style={{ ...styles.btnContinue, backgroundColor: COLORS.white }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("OnboardingContinueScreen")}
        >
          <Text style={{ ...TYPOGRAPHY.h4 }}>Get started</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btnContinue, backgroundColor: COLORS.black }}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.white }}>
          Read about our
        </Text>
        <TouchableOpacity activeOpacity={0.5} style={{ padding: 4 }}>
          <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>Terms</Text>
        </TouchableOpacity>
        <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.white }}>and</Text>
        <TouchableOpacity activeOpacity={0.5} style={{ padding: 4 }}>
          <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: SIZES.md,
  },
  btnContinue: {
    marginVertical: SIZES.sm,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
  iconContainer: {
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.xs,
  },
  title: {
    ...TYPOGRAPHY.h1,
    marginStart: SIZES.xs,
    color: COLORS.white,
    fontSize: 30,
  },
});

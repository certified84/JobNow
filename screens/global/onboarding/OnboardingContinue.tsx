import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import { Briefcase, User } from "../../../assets/svg/Onboarding";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../../types";
import { Toast, ALERT_TYPE, Dialog } from "react-native-alert-notification";
import { Option } from "../../../components/AuthOption";

export default function OnboardingContinueScreen() {
  const navigation = useNavigation<StackNavigation>();
  const [selected, setSelected] = useState(-1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select an option</Text>
      <Text style={styles.description}>
        Choose whether you’re an employer in search of a job, or an employer in
        search of an employee.
      </Text>

      <View style={styles.line} />

      <View style={styles.optionsContainer}>
        <Option
          title="Job Seeker"
          desc="I am in search of a job"
          isSelected={selected === 0}
          color="#F3F8FF"
          icon={<Briefcase />}
          onPress={() => setSelected(0)}
        />
        <Option
          title="Employer"
          desc="I am looking for employees"
          isSelected={selected === 1}
          color="#FFF0E6"
          icon={<User />}
          onPress={() => setSelected(1)}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        disabled={selected === -1}
        onPress={() => {
          selected === 0
            ? navigation.navigate("SignupScreen")
            : navigation.navigate("EmployerSignupScreen");
        }}
        style={{ ...styles.btnContinue, opacity: selected === -1 ? 0.5 : 1 }}
      >
        <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: SIZES.md,
  },
  title: { ...TYPOGRAPHY.h1, margin: SIZES.xxs },
  description: { ...TYPOGRAPHY.p, fontSize: SIZES.sm, textAlign: "center" },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
  },
  btnContinue: {
    marginVertical: SIZES.xl,
    marginTop: 80,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
});

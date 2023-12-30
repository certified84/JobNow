import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import { Briefcase, User } from "../../assets/svg/Onboarding";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigation } from "../../types";

export default function OnboardingScreen() {
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
          selected === 0 ? navigation.navigate("ExpertiseSelectionScreen") : {};
        }}
        style={{ ...styles.btnContinue, opacity: selected === -1 ? 0.5 : 1 }}
      >
        <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

interface OptionProps {
  title: string;
  desc: string;
  icon: React.ReactNode; // or whatever type your icon is
  isSelected: boolean;
  color: string;
  onPress?: () => void;
}

const Option: React.FC<OptionProps> = ({
  title,
  desc,
  icon,
  isSelected,
  color,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.5}
      style={{
        ...styles.optionContainer,
        borderColor: isSelected ? "#3C8AFF" : "#F0F0F0",
      }}
    >
      <View style={{ ...styles.optionIconContainer, backgroundColor: color }}>
        {icon}
      </View>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={{ ...TYPOGRAPHY.p, textAlign: "center" }}>{desc}</Text>
    </TouchableOpacity>
  );
};

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
  optionContainer: {
    flex: 0.43,
    borderWidth: 4,
    borderRadius: SIZES.md,
    paddingVertical: SIZES.xl,
    paddingHorizontal: SIZES.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  optionIconContainer: {
    padding: SIZES.md,
    borderRadius: 50,
  },
  optionTitle: {
    ...TYPOGRAPHY.h3,
    marginVertical: SIZES.xxs,
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

import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { SIZES, TYPOGRAPHY } from "../theme";

interface OptionProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  isSelected?: boolean;
  color: string;
  onPress?: () => void;
}

export const Option: React.FC<OptionProps> = ({
  title,
  desc,
  icon,
  isSelected = false,
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
});

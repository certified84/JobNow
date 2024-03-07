import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { EmptyNotifications } from "../assets/svg/Notification";
import { COLORS, SIZES, TYPOGRAPHY } from "../theme";

interface EmptyDesignProps {
  title: string;
  description: string;
  onPress?: () => void;
  btnTitle?: string;
}
const EmptyDesign: React.FC<EmptyDesignProps> = ({
  title,
  description,
  onPress,
  btnTitle,
}) => {
  return (
    <View style={styles.container}>
      <EmptyNotifications />
      <Text style={{ ...TYPOGRAPHY.h4, marginTop: 30, marginBottom: 4 }}>
        {title}
      </Text>
      <Text style={{ ...TYPOGRAPHY.p }}>{description}</Text>

      {onPress && (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onPress}
          style={{ ...styles.btnContinue }}
        >
          <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
            {btnTitle}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default EmptyDesign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  btnContinue: {
    width: '85%',
    margin: SIZES.xl,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
});

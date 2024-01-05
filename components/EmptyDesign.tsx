import { StyleSheet, Text, View } from "react-native";
import { EmptyNotifications } from "../assets/svg/Notification";
import { TYPOGRAPHY } from "../theme";

interface EmptyDesignProps {
  title: string;
  description: string;
}
const EmptyDesign: React.FC<EmptyDesignProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <EmptyNotifications />
      <Text style={{ ...TYPOGRAPHY.h4, marginTop: 30, marginBottom: 4 }}>
        {title}
      </Text>
      <Text style={{ ...TYPOGRAPHY.p }}>{description}</Text>
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
});

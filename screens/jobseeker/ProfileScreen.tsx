import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { COLORS, TYPOGRAPHY } from "../../theme";

const JobSeekerProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ ...TYPOGRAPHY.p }}>Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default JobSeekerProfileScreen;

const styles = StyleSheet.create({});

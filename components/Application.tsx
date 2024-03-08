import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../theme";
import { Application, Job } from "../data/models/Job";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StackNavigation } from "../types";
import { Briefcase } from "../assets/svg/Onboarding";
import { Avatar } from "react-native-paper";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

interface JobProps {
  application?: Application;
  width: number;
  horizontal?: boolean | null;
  navigation: StackNavigation;
  bookmarked?: boolean;
}

const ApplicationComponent: React.FC<JobProps> = ({
  application,
  width,
  horizontal,
  navigation,
}) => {
  const handlePress = async () => {
    const supported = await Linking.canOpenURL(application?.resume ?? "");
    if (supported) {
      await Linking.openURL(application?.resume ?? "");
    } else {
      Toast.show({
        title: "An error occurred",
        textBody: "An error occurred opening the resume",
        titleStyle: { ...TYPOGRAPHY.h5 },
        textBodyStyle: { ...TYPOGRAPHY.p },
        type: ALERT_TYPE.DANGER,
      });
    }
    // () =>
    //   navigation?.navigate("ResumeDetailScreen", {
    //     resume: application?.resume,
    //   });
  };

  return (
    <TouchableOpacity
      disabled={true}
      activeOpacity={0.5}
      style={{
        ...styles.jobContainer,
        width: width,
        marginTop: SIZES.sm,
        backgroundColor: horizontal ? "white" : "#F9F9F9",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image size={50} source={{ uri: application?.photoUrl }} />
        <View style={{ marginStart: SIZES.xxs }}>
          <Text style={{ ...TYPOGRAPHY.h4 }}>{application?.name}</Text>
          <Text style={{ ...TYPOGRAPHY.p }}>Mobile Application Developer</Text>
        </View>
      </View>

      <View style={styles.line} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: SIZES.sm,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 0.45,
            backgroundColor: COLORS.primary,
            padding: SIZES.sm,
            paddingVertical: SIZES.xs,
            borderRadius: 100,
            alignItems: "center",
          }}
          onPress={handlePress}
        >
          <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.white }}>
            View Resume
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            flex: 0.45,
            padding: SIZES.sm,
            paddingVertical: SIZES.xs,
            borderRadius: 100,
            alignItems: "center",
            borderWidth: 1,
            borderColor: COLORS.primary,
          }}
          onPress={() =>
            navigation.navigate("ApplicationDetailScreen", {
              application: application,
            })
          }
        >
          <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.primary }}>
            View Details
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default ApplicationComponent;

const styles = StyleSheet.create({
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  jobContainer: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: "#CACACA",
    padding: SIZES.sm,
    paddingBottom: 0,
  },
  companyLogoContainer: {
    padding: SIZES.xs,
    borderRadius: SIZES.xxs,
    borderWidth: 2,
    borderColor: "#CACACA",
  },
  logoBookmarkContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  jobTypeContainer: {
    borderWidth: 1,
    borderColor: "#CACACA",
    padding: 4,
    paddingHorizontal: SIZES.xs,
    borderRadius: SIZES.xxs,
    marginEnd: SIZES.sm,
  },
});

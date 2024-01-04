import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { StackNavigation, StackParamList } from "../../../types";
import Search from "../../../components/Search";
import { useState } from "react";
import { jobs } from "../../../data/defaultData";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { Application, Job } from "../../../data/models/Job";
import { Ionicons } from "@expo/vector-icons";
import { Briefcase } from "../../../assets/svg/Onboarding";
import { JobStatus } from "../../../constants";

type ScreenRouteProp = RouteProp<StackParamList, "JobApplicationsScreen">;
type NavProp = NavigationProp<StackParamList, "JobApplicationsScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobApplicationsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <Header
          title={"Applications"}
          navigation={navigation}
          showBookmark={false}
          bookmarked={false}
          showBack={false}
        />

        <FlatList
          ListHeaderComponent={() => (
            <View style={{ marginBottom: SIZES.md }}>
              <Search
                text={searchText}
                onChangeText={setSearchText}
                placeHolder="Search..."
                style={{ marginTop: 0 }}
                borderColor={"#F0F0F0"}
                activeBorderColor={COLORS.primary}
              />
            </View>
          )}
          data={jobs}
          style={{ marginHorizontal: SIZES.md }}
          renderItem={({ item, index }) => (
            <JobComponent
              application={item}
              width={width - SIZES.md * 2}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={() => <View style={{ height: 90 }} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobApplicationsScreen;

interface JobComponentProps {
  application: Application;
  width: number;
  navigation: StackNavigation;
}

const JobComponent: React.FC<JobComponentProps> = ({
  application,
  navigation,
}) => {
  const job = application.job;
  return (
    <TouchableOpacity
      style={{ marginHorizontal: SIZES.md }}
      activeOpacity={0.5}
      onPress={() =>
        navigation.navigate("JobApplicationDetailScreen", { job: job })
      }
    >
      <View style={styles.jobComponentContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={styles.companyLogoContainer}>
            {job.companyLogo && (
              <Image
                source={{ uri: job.companyLogo }}
                style={{ width: 24, height: 24 }}
              />
            )}
            {!job.companyLogo && <Briefcase />}
          </View>
          <View>
            <Text style={{ ...TYPOGRAPHY.h4 }}>{job.title}</Text>
            <View style={styles.companyContainer}>
              <Text style={styles.company}>{job.company}</Text>
              <View
                style={{
                  ...styles.statusContainer,
                  backgroundColor: JobStatus[application.status].background,
                }}
              >
                <Text
                  style={{
                    ...TYPOGRAPHY.p,
                    color: JobStatus[application.status].color,
                  }}
                >
                  {JobStatus[application.status].text}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={SIZES.xl} color={COLORS.black} />
      </View>
      <View style={styles.line} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  jobComponentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  line: {
    marginVertical: SIZES.sm,
    backgroundColor: "#F0F0F0",
    height: 1,
  },
  companyLogoContainer: {
    padding: SIZES.xs,
    borderRadius: SIZES.xxs,
    borderWidth: 2,
    borderColor: "#F0F0F0",
    marginEnd: SIZES.xxs,
  },
  companyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  company: {
    ...TYPOGRAPHY.h5,
    fontFamily: "outfit_semi_bold",
    color: "#ADADAF",
  },
  statusContainer: {
    paddingHorizontal: SIZES.xxs,
    paddingVertical: SIZES.xxs - 2,
    borderRadius: 5,
    marginStart: SIZES.xs,
  },
});

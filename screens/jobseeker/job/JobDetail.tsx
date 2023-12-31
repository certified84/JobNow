import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { StackParamList } from "../../../types";
import { useState } from "react";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SceneMap, TabView } from "react-native-tab-view";
import DescriptionTab from "./tabs/Description";
import RequirementsTab from "./tabs/Requirements";
import RenderTab from "./components/RenderTab";

type ScreenRouteProp = RouteProp<StackParamList, "JobDetailScreen">;
type NavProp = NavigationProp<StackParamList, "JobDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const job = route?.params.job!;
  const [bookmarked, setBookmarked] = useState(route!.params.bookmarked);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "description", title: "Description" },
    { key: "requirements", title: "Requirements" },
  ]);

  const renderScene = SceneMap({
    description: () => <DescriptionTab job={job} />,
    requirements: () => <RequirementsTab job={job} />,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <Header
          title={route!.params.title}
          navigation={navigation}
          showBookmark={route!.params.showBookmark}
          bookmarked={bookmarked}
          onBookmarkPress={() => setBookmarked(!bookmarked)}
        />
        {/* <ScrollView style={{ flex: 1 }}> */}
          <View style={styles.jobContainer}>
            <View style={styles.companyLogoContainer}>
              {job.companyLogo && (
                <Image
                  source={{ uri: job.companyLogo }}
                  style={{ width: 24, height: 24 }}
                />
              )}
              {!job.companyLogo && (
                <MaterialCommunityIcons
                  name="briefcase"
                  size={24}
                  color={COLORS.primary}
                />
              )}
            </View>

            <Text style={{ ...TYPOGRAPHY.h3, marginVertical: SIZES.xs }}>
              {job.title}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ ...TYPOGRAPHY.p }}>
                {`${job.company}   \u2022   `}{" "}
              </Text>
              <View style={styles.jobTypeContainer}>
                <Text
                  style={{
                    ...TYPOGRAPHY.p,
                    color: COLORS.primary,
                  }}
                >
                  {job.type}
                </Text>
              </View>
              <View style={styles.jobTypeContainer}>
                <Text
                  style={{
                    ...TYPOGRAPHY.p,
                    color: COLORS.primary,
                  }}
                >
                  {job.locationType}
                </Text>
              </View>
            </View>

            <View style={{ ...styles.line, width: "100%" }} />

            <Text style={styles.jobLocation}>{job.location}</Text>
            <Text style={styles.pay}>{job.pay}</Text>
          </View>

          <View style={{ ...styles.line, margin: SIZES.md }} />

          <TabView
            renderTabBar={() => <RenderTab index={index} setIndex={setIndex} />}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: width, height: height }}
            style={{ flex: 1, height: 'auto' }}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {}}
            style={styles.btnContinue}
          >
            <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
              Apply Now
            </Text>
          </TouchableOpacity>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default JobDetailScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  jobContainer: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: "#CACACA",
    padding: SIZES.md,
    marginHorizontal: SIZES.md,
    alignItems: "center",
  },
  companyLogoContainer: {
    padding: SIZES.xs,
    borderRadius: SIZES.xxs,
    borderWidth: 2,
    borderColor: "#CACACA",
  },
  jobTypeContainer: {
    backgroundColor: "#DDEAFF",
    padding: 4,
    paddingHorizontal: SIZES.xs,
    borderRadius: SIZES.xxs,
    marginEnd: SIZES.sm,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  pay: {
    ...TYPOGRAPHY.h4,
    color: COLORS.primary,
    marginTop: SIZES.xxs,
  },
  jobLocation: { ...TYPOGRAPHY.h3, color: "#ADADAF", fontSize: SIZES.sm },
  btnContinue: {
    marginBottom: SIZES.xl,
    marginHorizontal: SIZES.md,
    // marginTop: 80,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
});

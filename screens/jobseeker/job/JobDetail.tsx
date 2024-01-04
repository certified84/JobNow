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
import { Briefcase } from "../../../assets/svg/Onboarding";
import JobDetailComponent from "../../../components/JobDetailComponent";
import { Job } from "../../../data/models/Job";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebase";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type ScreenRouteProp = RouteProp<StackParamList, "JobDetailScreen">;
type NavProp = NavigationProp<StackParamList, "JobDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const job = route?.params.job!;
  const [values, setValues] = useState({
    bookmarked: route!.params.bookmarked,
    index: 0,
    routes: [
      { key: "description", title: "Description" },
      { key: "requirements", title: "Requirements" },
    ],
  });

  async function uploadData(job: Job) {
    await addDoc(collection(firestore, "jobs"), job)
      .then((snapshot) => {
        updateDoc(snapshot, { id: snapshot.id });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // setValue({
        //   ...value,
        //   loading: false,
        // });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again.",
        });
      });
  }

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
          bookmarked={values.bookmarked}
          onBookmarkPress={() =>
            setValues({ ...values, bookmarked: !values.bookmarked })
          }
        />
        {/* <ScrollView style={{ flex: 1 }}> */}
        <JobDetailComponent job={job} />

        <View style={{ ...styles.line, margin: SIZES.md }} />

        <TabView
          renderTabBar={() => (
            <RenderTab
              index={values.index}
              setIndex={(index) => setValues({ ...values, index: index })}
            />
          )}
          navigationState={{ index: values.index, routes: values.routes }}
          renderScene={renderScene}
          onIndexChange={(index) => setValues({ ...values, index: index })}
          initialLayout={{ width: width, height: height }}
          style={{ flex: 1, height: "auto" }}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation?.navigate("JobApplicationScreen", {
              job: job,
              title: "Apply to Job",
              showBookmark: false,
              bookmarked: false,
            });
          }}
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
  line: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  btnContinue: {
    marginBottom: SIZES.xxs,
    marginHorizontal: SIZES.md,
    // marginTop: 80,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
});

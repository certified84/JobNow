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
import { useEffect, useState } from "react";
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
import { auth, firestore } from "../../../firebase";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { useDocument } from "react-firebase-hooks/firestore";
import { defaultUser } from "../../../data/models/User";
import { Loader } from "../../../components/Loader";

type ScreenRouteProp = RouteProp<StackParamList, "JobDetailScreen">;
type NavProp = NavigationProp<StackParamList, "JobDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobDescriptionScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const user = auth.currentUser;
  const [values, setValues] = useState({
    userData: defaultUser,
    bookmarked: route!.params.bookmarked,
    index: 0,
    routes: [
      { key: "description", title: "Description" },
      { key: "requirements", title: "Requirements" },
    ],
    job: route?.params.job!,
  });

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setValues({
        ...values,
        userData: { ...defaultUser, ...userSnapshot.data() },
      });
    }
  }, [userSnapshot]);

  const renderScene = SceneMap({
    description: () => (
      <DescriptionTab
        descripon={values.job?.description}
        setDescripon={(text) =>
          setValues({ ...values, job: { ...values.job, description: text } })
        }
      />
    ),
    requirements: () => <RequirementsTab />,
  });
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={userLoading} />
      <View style={styles.innerContainer}>
        <Header
          title={"Post a Job"}
          navigation={navigation}
          showBookmark={route!.params.showBookmark}
          bookmarked={false}
        />
        {/* <ScrollView style={{ flex: 1 }}> */}

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

export default JobDescriptionScreen;

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
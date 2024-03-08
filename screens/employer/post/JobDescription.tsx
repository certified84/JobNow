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
import { Job, defaultJob } from "../../../data/models/Job";
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
    loading: false,
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
        setDescription={(text) =>
          setValues({ ...values, job: { ...values.job, description: text } })
        }
      />
    ),
    requirements: () => <RequirementsTab />,
  });

  const uploadJob = async () => {
    setValues({ ...values, loading: true });
    const data: Job = {
      ...values.job,
      requirements: [""],
    };

    const docRef = addDoc(collection(firestore, `jobs`), data);
    await docRef
      .then((snapshot) => {
        updateDoc(snapshot, { id: snapshot.id }).then(() => {
          setValues({ ...values, loading: false });
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Job uploaded",
            textBody: "Your vacancy was uploaded successfully",
          });
          navigation?.goBack();
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setValues({ ...values, loading: false });
        console.log(errorCode, errorMessage);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again",
        });
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={userLoading || values.loading} />
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
          onPress={uploadJob}
          style={styles.btnContinue}
        >
          <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
            Save and Post Job
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

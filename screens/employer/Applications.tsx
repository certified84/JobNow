import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS, SIZES } from "../../theme";
import Header from "../../components/Header";
import { StackParamList } from "../../types";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import JobComponent from "../../components/JobComponent";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import {
  DocumentData,
  Firestore,
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Job } from "../../data/models/Job";
import { Loader } from "../../components/Loader";
import EmptyDesign from "../../components/EmptyDesign";
import { defaultUser } from "../../data/models/User";
import ApplicationComponent from "../../components/Application";

type ScreenRouteProp = RouteProp<StackParamList, "BookmarksScreen">;
type NavProp = NavigationProp<StackParamList, "BookmarksScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const EmployerApplicationsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState({ ...defaultUser });
  const user = auth.currentUser;

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  const jobsRef = collection(firestore, "applications");
  const q = query(
    jobsRef
    // where("id", "==", "")
    // orderBy("date", "desc")
  );
  const [jobsSnapshot, jobsLoading, jobsError] = useCollection(q);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setUserData(userSnapshot.data());
      // console.log("User", userSnapshot.data());
    }
  }, [userSnapshot, jobsSnapshot]);

  useEffect(() => {
    if (jobsSnapshot) {
      const data = jobsSnapshot.docs
      setJobs(data);
    }
  }, [jobsSnapshot, userSnapshot, userData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={jobsLoading} />
      <View style={styles.innerContainer}>
        <Header
          title={"Applications"}
          navigation={navigation}
          showBack={false}
          showBookmark={false}
          bookmarked={false}
        />

        {jobs.length <= 0 ? (
          <EmptyDesign
            title="No applications"
            description="Potential employees havent applied to any of your listings yet"
          />
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <Search
                text={searchText}
                onChangeText={setSearchText}
                placeHolder="Search..."
                style={{ marginTop: 0 }}
                borderColor={"#F0F0F0"}
                activeBorderColor={COLORS.primary}
              />
            )}
            // showsVerticalScrollIndicator={false}
            data={jobs}
            style={{ marginHorizontal: SIZES.md }}
            renderItem={({ item, index }) => (
              <ApplicationComponent
                application={item.data()}
                width={width * 0.9}
                horizontal
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
            ListFooterComponent={() => <View style={{ height: 90 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default EmployerApplicationsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
});

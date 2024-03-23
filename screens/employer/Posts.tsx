import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
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
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Job } from "../../data/models/Job";
import { Loader } from "../../components/Loader";
import EmptyDesign from "../../components/EmptyDesign";
import { defaultUser } from "../../data/models/User";

type ScreenRouteProp = RouteProp<StackParamList, "BookmarksScreen">;
type NavProp = NavigationProp<StackParamList, "BookmarksScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const EmployerPostsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const [userData, setUserData] = useState({ ...defaultUser });
  const user = auth.currentUser;

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  const jobsRef = collection(firestore, "jobs");
  const q = query(
    jobsRef,
    // where("id", "==", "")
    orderBy("date", "desc")
  );
  const [jobsSnapshot, jobsLoading, jobsError] = useCollection(q);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setUserData(userSnapshot.data());
    }
  }, [userSnapshot, jobsSnapshot]);

  useEffect(() => {
    if (jobsSnapshot) {
      const data = jobsSnapshot.docs.filter(
        (item) => item.data().companyId === userData.uid
      );
      console.log(data.length);
      setJobs(data);
    }
  }, [jobsSnapshot, userSnapshot, userData]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={jobsLoading} />
      <View style={styles.innerContainer}>
        <Header
          title={"Posts"}
          navigation={navigation}
          showBack={false}
          showBookmark={true}
          bookmarked={false}
          which={"post"}
          onBookmarkPress={() => navigation?.navigate("PostJobScreen")}
        />

        {jobs.length <= 0 ? (
          <View style={{ flex: 1 }}>
            <EmptyDesign
              title="No Vacancies"
              description="You haven't uploaded any listings yet. Post one now!"
              onPress={() => navigation?.navigate("PostJobScreen")}
              btnTitle="Post a Job"
            />
          </View>
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
              <JobComponent
                job={item.data()}
                width={width - SIZES.md * 2}
                navigation={navigation}
                bookmarked={false}
                showBookmark={false}
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

export default EmployerPostsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
});

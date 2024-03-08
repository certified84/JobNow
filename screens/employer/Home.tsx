import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  useWindowDimensions,
  Image,
  ScrollView,
} from "react-native";
import { Props } from "../../types";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import { Avatar } from "react-native-paper";
import { SimpleLineIcons, FontAwesome5 } from "@expo/vector-icons";
import Search from "../../components/Search";
import { useEffect, useState } from "react";
import JobComponent from "../../components/JobComponent";
import { auth, firestore } from "../../firebase";
import SplashIcon from "../../assets/svg/SplashIcon";
import { collection, doc, query, where } from "firebase/firestore";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { defaultUser } from "../../data/models/User";
import VacancyComponent from "../../components/VacancyComponent";
import ApplicationComponent from "../../components/Application";
import { Application } from "../../data/models/Job";

const EmployerHomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  const user = auth.currentUser!;
  const [userData, setUserData] = useState({ ...defaultUser });

  const userRef = doc(firestore, "users", user!.uid);
  const [userSnapshot, userLoading, userError] = useDocument(userRef);

  useEffect(() => {
    if (userSnapshot?.exists) {
      setUserData(userSnapshot.data());
    }
  }, [userSnapshot]);

  const jobsRef = collection(firestore, "jobs");
  const q = query(
    jobsRef
    // where("communityId", "==", "")
    // orderBy("date", "desc")
  );
  const [jobsSnapshot, jobsLoading, jobsError] = useCollection(q);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (jobsSnapshot) {
      const data = jobsSnapshot.docs;
      setJobs(data);
    }
  }, [jobsSnapshot]);

  const applicationsRef = collection(firestore, "applications");
  const applicationQuery = query(
    applicationsRef,
    where("job.companyId", "==", user.uid)
    // orderBy("date", "desc")
  );
  const [applicationsSnapshot, applicatinsLoading, applicationsError] =
    useCollection(applicationQuery);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (applicationsSnapshot) {
      const data = applicationsSnapshot.docs;
      setApplications(data);
    }
  }, [applicationsSnapshot]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              {user.photoURL ? (
                <Avatar.Image size={50} source={{ uri: user.photoURL }} />
              ) : (
                <FontAwesome5 size={40} name="user-circle" />
              )}
            </TouchableOpacity>
            <View style={{ marginStart: SIZES.sm }}>
              <Text style={{ ...TYPOGRAPHY.h5 }}>Hello,</Text>
              <Text style={{ ...TYPOGRAPHY.h3 }}>{user.displayName}</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate("NotificationsScreen")}
            style={styles.notificationIconContainer}
          >
            <SimpleLineIcons size={20} name="bell" />
          </TouchableOpacity>
        </View>
        <View style={styles.line} />

        <ScrollView>
          <Search
            text={searchText}
            onChangeText={setSearchText}
            placeHolder="Search for a job or skill..."
            style={{
              marginTop: 0,
              backgroundColor: "#F0F0F0",
              marginHorizontal: SIZES.sm,
            }}
          />

          <View style={styles.moreContainer}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>My Vacanacies</Text>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() =>
                navigation.navigate("JobsScreen", {
                  title: "Suggested Jobs",
                  bookmarked: false,
                  showBookmark: false,
                })
              }
            >
              <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.primary }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={jobs}
            style={{ marginHorizontal: SIZES.md }}
            renderItem={({ item, index }) => (
              <VacancyComponent
                job={item.data()}
                width={width * 0.7}
                horizontal
                navigation={navigation}
                bookmarked={userData.bookmarks?.includes(item.data().id)}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          <View style={{ ...styles.moreContainer, marginBottom: 0 }}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>Recent Applications</Text>
            <TouchableOpacity
              style={{ padding: 4 }}
              onPress={() =>
                navigation.navigate("JobsScreen", {
                  title: "Top Jobs",
                  bookmarked: false,
                  showBookmark: false,
                })
              }
            >
              <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.primary }}>
                See more
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: "center" }}>
            {applications.map((application, index) => (
              <ApplicationComponent
                key={index}
                application={application.data()}
                width={width * 0.9}
                horizontal
                navigation={navigation}
              />
            ))}
          </View>

          {/* <FlatList
            data={jobs}
            contentContainerStyle={{ alignItems: "center" }}
            renderItem={({ item, index }) => (
              <ApplicationComponent
                job={item.data()}
                width={width * 0.9}
                horizontal
                navigation={navigation}
                bookmarked={userData.bookmarks?.includes(item.data().id)}
              />
            )}
            keyExtractor={(item) => item.id}
          /> */}
          <View style={{ height: 90 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EmployerHomeScreen;

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
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  imageContainer: {
    borderRadius: SIZES.md,
    overflow: "hidden",
    padding: SIZES.md,
    marginHorizontal: SIZES.md,
  },
  nameContainer: {
    flexDirection: "row",
    marginHorizontal: SIZES.md,
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationIconContainer: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: "gray",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: SIZES.sm,
    backgroundColor: "#FFFFFF",
    marginTop: SIZES.xl,
    borderRadius: SIZES.xs,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  moreContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: SIZES.md,
    alignItems: "center",
  },
});

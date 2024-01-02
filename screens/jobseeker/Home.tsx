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
import { SimpleLineIcons } from "@expo/vector-icons";
import { jobs } from "../../data/defaultData";
import Search from "../../components/Search";
import { useState } from "react";
import JobComponent from "../../components/JobComponent";

const JobSeekerHomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  const [searchText, setSearchText] = useState("");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => navigation.navigate("JobSeekerProfileScreen")}
            >
              <Avatar.Image
                source={{
                  uri: "https://source.unsplash.com/random/?computer,developer",
                }}
                size={50}
              />
            </TouchableOpacity>
            <View style={{ marginStart: SIZES.sm }}>
              <Text style={{ ...TYPOGRAPHY.h5 }}>Hello,</Text>
              <Text style={{ ...TYPOGRAPHY.h3 }}>Bolarinwa Tobi</Text>
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
          <ImageBackground
            source={require("../../assets/images/home_card_background.png")}
            style={styles.imageContainer}
          >
            <Text
              style={{
                ...TYPOGRAPHY.h1,
                color: COLORS.white,
              }}
            >
              Find your dream job with us, on JobNow.
            </Text>

            <Search
              text={searchText}
              onChangeText={setSearchText}
              placeHolder="Search for a job or skill..."
            />
          </ImageBackground>

          <View style={styles.moreContainer}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>Suggested Jobs</Text>
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
              <JobComponent
                job={item}
                width={width * 0.7}
                horizontal
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
          />

          <View style={styles.moreContainer}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>Top Jobs</Text>
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

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={jobs}
            style={{ marginHorizontal: SIZES.md }}
            renderItem={({ item, index }) => (
              <JobComponent
                job={item}
                width={width * 0.7}
                horizontal
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={{ height: 90 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default JobSeekerHomeScreen;

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

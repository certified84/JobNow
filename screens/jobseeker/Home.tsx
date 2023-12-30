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
import { Avatar, TextInput } from "react-native-paper";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import { Filter } from "../../assets/svg/Home";
import { Job } from "../../data/models/Job";
import { jobs } from "../../data/defaultData";

const JobSeekerHomeScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <View style={styles.nameContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity activeOpacity={0.6}>
              <Avatar.Image source={{ uri: "" }} size={50} />
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

            <TextInput
              placeholder={"Search for a job or skill..."}
              theme={{ roundness: SIZES.xs }}
              left={
                <TextInput.Icon
                  icon={() => (
                    <Ionicons
                      name="search-outline"
                      size={SIZES.md}
                      color={"black"}
                    />
                  )}
                  color={COLORS.primary}
                />
              }
              right={
                <TextInput.Icon
                  icon={() => (
                    <TouchableOpacity activeOpacity={0.5}>
                      <Filter />
                    </TouchableOpacity>
                  )}
                  color={COLORS.primary}
                />
              }
              style={{
                backgroundColor: "white",
                color: COLORS.primary,
                marginTop: SIZES.xl,
              }}
              mode="outlined"
              outlineColor="transparent"
              activeOutlineColor="transparent"
              placeholderTextColor={"#ADADAF"}
              selectionColor={COLORS.black}
              onChangeText={(text) => {}}
            />
          </ImageBackground>

          <View style={styles.moreContainer}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>Suggested Jobs</Text>
            <TouchableOpacity style={{ padding: 4 }}>
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
              <JobComponent job={item} width={width * 0.7} />
            )}
            keyExtractor={(item) => item.id}
          />

          <View style={styles.moreContainer}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>Top Jobs</Text>
            <TouchableOpacity style={{ padding: 4 }}>
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
              <JobComponent job={item} width={width * 0.7} />
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={{ height: SIZES.md }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default JobSeekerHomeScreen;

interface JobProps {
  job: Job;
  width: number;
}

const JobComponent: React.FC<JobProps> = ({ job, width }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{ ...styles.jobContainer, width: width }}
    >
      <View style={styles.logoBookmarkContainer}>
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

        {/* <TouchableOpacity activeOpacity={0.5} style={{ padding: 4 }}> */}
          <MaterialCommunityIcons
            name="bookmark-outline"
            size={30}
            color={COLORS.primary}
          />
        {/* </TouchableOpacity> */}
      </View>

      <Text style={{ ...TYPOGRAPHY.h3, marginVertical: SIZES.xs }}>
        {job.title}
      </Text>

      <Text style={{ ...TYPOGRAPHY.p }}>
        {`${job.company} \u2022 `}{" "}
        <Text style={{ color: COLORS.primary }}>{job.pay}</Text>
      </Text>

      <View style={styles.line} />

      <Text style={{ ...TYPOGRAPHY.h4, fontSize: SIZES.sm }}>
        {job.location}
      </Text>

      <View style={{ flexDirection: "row", marginTop: SIZES.sm }}>
        <View style={styles.jobTypeContainer}>
          <Text style={{ ...TYPOGRAPHY.p }}>{job.type}</Text>
        </View>
        <View style={styles.jobTypeContainer}>
          <Text style={{ ...TYPOGRAPHY.p }}>{job.locationType}</Text>
        </View>
      </View>
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
  jobContainer: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: "#CACACA",
    padding: SIZES.sm,
    marginEnd: SIZES.md,
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

import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { StackParamList } from "../../../types";
import { useEffect, useState } from "react";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  FileUpload,
  FileUploaded,
  Link,
  Mail,
  User,
} from "../../../assets/svg/Job";

type ScreenRouteProp = RouteProp<StackParamList, "JobApplicationScreen">;
type NavProp = NavigationProp<StackParamList, "JobApplicationScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const JobApplicationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const [values, setValues] = useState({
    bookmarked: route?.params.bookmarked,
    name: "",
    email: "",
    porfolioLink: "",
    coverLetter: "",
    resume: false,
    resumeUploaded: false,
  });

  useEffect(() => {
    if (values.resume) {
      setTimeout(() => {
        setValues({ ...values, resume: false, resumeUploaded: true });
      }, 4000);
    }
  }, [values.resume, values.resumeUploaded]);
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
        <ScrollView style={{ margin: SIZES.md }}>
          <Text style={{ ...TYPOGRAPHY.h4 }}>Full Name</Text>

          <TextInput
            placeholder={"e.g Firstname Lastname"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <User />} />}
            style={styles.textInput}
            mode="outlined"
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.name}
            onChangeText={(text) => setValues({ ...values, name: text })}
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Email</Text>

          <TextInput
            placeholder={"e.g name@example.com"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <Mail />} />}
            style={styles.textInput}
            mode="outlined"
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.email}
            onChangeText={(text) => setValues({ ...values, email: text })}
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Upload Resume</Text>

          {values.resumeUploaded ? (
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#FFF3F3",
                padding: SIZES.md,
                justifyContent: "space-between",
                marginVertical: SIZES.xs,
                borderRadius: SIZES.sm,
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: 'center' }}>
                <FileUploaded />
                <View style={{ marginStart: SIZES.sm }}>
                  <Text style={{ ...TYPOGRAPHY.h5 }}>
                    CV-Bolarinwa_Daniel.pdf
                  </Text>
                  <Text style={{ ...TYPOGRAPHY.p, fontSize: SIZES.xs }}>128kb</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() =>
                  setValues({ ...values, resumeUploaded: false, resume: false })
                }
              >
                <Ionicons name="close" color={"#F92020"} size={24} />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {!values.resume ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() =>
                    setValues({ ...values, resume: !values.resume })
                  }
                  style={styles.uploadResumeContainer}
                >
                  <FileUpload />
                  <Text style={{ ...TYPOGRAPHY.p, marginTop: SIZES.xxs }}>
                    Browse File
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.uploadResumeContainer}>
                  <FileUpload />
                  <Text style={styles.uploading}>Uploading...</Text>
                </View>
              )}
            </View>
          )}

          <Text style={{ ...TYPOGRAPHY.h4 }}>Portfolio Link</Text>

          <TextInput
            placeholder={"e.g https://link.portforlio.com"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <Link />} />}
            style={styles.textInput}
            mode="outlined"
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.porfolioLink}
            onChangeText={(text) =>
              setValues({ ...values, porfolioLink: text })
            }
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Cover Letter</Text>

          <TextInput
            placeholder={"Anything more you'd like to say to the recruiter..."}
            theme={{ roundness: SIZES.xs }}
            style={{ ...styles.textInput, minHeight: 100, maxHeight: 200 }}
            mode="outlined"
            multiline
            numberOfLines={5}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.coverLetter}
            onChangeText={(text) => setValues({ ...values, coverLetter: text })}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {}}
            style={styles.btnContinue}
          >
            <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
              Submit
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default JobApplicationScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  textInput: {
    backgroundColor: "#F6F6F6",
    color: COLORS.primary,
    marginBottom: SIZES.sm,
  },
  btnContinue: {
    marginVertical: SIZES.xl,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
  uploadResumeContainer: {
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginVertical: SIZES.xs,
    borderRadius: SIZES.md,
    backgroundColor: "#F6F6F6",
    padding: 30,
    borderColor: "#ADADAF",
  },
  uploading: {
    ...TYPOGRAPHY.p,
    marginTop: SIZES.xxs,
    color: COLORS.primary,
  },
});

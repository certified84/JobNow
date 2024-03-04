import {
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Avatar, TextInput } from "react-native-paper";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { StackParamList } from "../../../types";
import Search from "../../../components/Search";
import { useEffect, useState } from "react";
import JobComponent from "../../../components/JobComponent";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import {
  DocumentData,
  Firestore,
  addDoc,
  collection,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, firestore, storage } from "../../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Job } from "../../../data/models/Job";
import { Loader } from "../../../components/Loader";
import EmptyDesign from "../../../components/EmptyDesign";
import { defaultUser } from "../../../data/models/User";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { ActionButton, DefaultButton } from "../../../components/Buttons";
import { TermsCondition } from "../../../assets/svg/Settings";
import {
  FileUpload,
  FileUploaded,
  Link,
  Mail,
  User,
} from "../../../assets/svg/Job";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getDownloadURL, ref } from "firebase/storage";
import { useUploadFile } from "react-firebase-hooks/storage";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { updateProfile } from "firebase/auth";

type ScreenRouteProp = RouteProp<StackParamList, "SettingsScreen">;
type NavProp = NavigationProp<StackParamList, "SettingsScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

interface IValuesProps {
  name: string;
  email: string;
  country: string;
  address: string;
  photo: boolean;
  photoUploaded: boolean;
  loading: boolean;
  file?: string | null;
}

const CompanyProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const user = auth.currentUser;
  const splitIndex = user?.displayName?.indexOf(" ");
  const [values, setValues] = useState<IValuesProps>({
    name: "",
    email: "",
    country: "",
    address: "",
    photo: false,
    photoUploaded: false,
    loading: false,
    file: null,
    // application: { ...defaultApplication, job: job },
  });

  const disabled = values.country === "" || values.address === "";

  const reference = doc(firestore, "users", user!.uid);
  const [snapshot, loading, error] = useDocument(reference);

  const [uploadFile, uploading, imageSnapshot, imageError] = useUploadFile();
  const photoRef = ref(storage, `profileImages/${user!.uid}/profileImage.jpg`);

  const pickPhoto = async () => {
    // setValues({ ...values, photoUploaded: false, file: null });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setValues({ ...values, file: result.assets[0].uri });
      uploadPhoto(result.assets[0].uri, user!.uid);
    }
  };

  async function uploadPhoto(imageUri: string, id: string) {
    try {
      const { uri } = await FileSystem.getInfoAsync(imageUri);
      const blob: Blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function (e) {
          console.log(e);
          reject(new TypeError("Network request failed"));
        };
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      await uploadFile(photoRef, blob, { contentType: "image/jpeg" })
        .then(() => {
          setValues({ ...values, photoUploaded: true });
          Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title: "Logo uploaded",
            textBody:
              "Logo uploaded successfully. Please complete your sign up",
          });
          getUrl();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setValues({ ...values, loading: false });
          Toast.show({
            type: ALERT_TYPE.DANGER,
            title: "Error",
            textBody: "An error occurred. Please try again.",
          });
        });
      // blob.close()
    } catch (e) {
      console.log(e);
      setValues({ ...values, loading: false });
      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: "Error",
        textBody: "An error occurred. Please try again.",
      });
    }
  }

  async function getUrl() {
    await getDownloadURL(photoRef)
      .then((url) => {
        updateFirebaseProfile(url, user!.uid);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again",
        });
      });
  }

  async function updateFirebaseProfile(downloadUrl: string, id: string) {
    setValues({ ...values, loading: true });
    await updateProfile(user!, {
      photoURL: downloadUrl ?? user?.photoURL,
    })
      .then(() => setValues({ ...values, file: downloadUrl }))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValues({ ...values, loading: false });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again.",
        });
      });
  }

  async function updateCompanyProfile(id: string, fields: Map<string, any>) {
    setValues({...values, loading: true})
    const obj = Object.fromEntries(fields);
    await updateDoc(reference, obj)
      .then(() => {
        setValues({ ...values, loading: false });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Company Profile updated",
          textBody: "Your company profile has been updated successfully",
        });
        navigation?.navigate("EmployerDashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValues({ ...values, loading: false });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again",
        });
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={false} />
      <View style={styles.innerContainer}>
        <Header
          title={"Company Profile"}
          navigation={navigation}
          showBack={false}
          showBookmark={false}
          bookmarked={false}
        />
        <ScrollView style={{ margin: SIZES.md }}>
          {!values.photoUploaded && (
            <Text style={{ ...TYPOGRAPHY.h4 }}>Company Logo</Text>
          )}

          {values.photoUploaded ? (
            <ImageBackground
              style={styles.logoBackground}
              source={{ uri: values.file ?? user?.photoURL ?? "" }}
            >
              <TouchableOpacity
                style={styles.btnPickPhoto}
                activeOpacity={0.5}
                onPress={pickPhoto}
              >
                <MaterialIcons name="edit" color={"#FFF"} size={SIZES.md} />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <View>
              {!values.file ? (
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={pickPhoto}
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

          <Text style={{ ...TYPOGRAPHY.h4 }}>Name of Company</Text>

          <TextInput
            placeholder={"e.g Firstname Lastname"}
            theme={{ roundness: SIZES.xs }}
            left={<TextInput.Icon icon={() => <User />} />}
            style={styles.textInput}
            mode="outlined"
            editable={false}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={user?.displayName ?? ""}
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
            value={user?.email ?? ""}
            editable={false}
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Country</Text>

          <TextInput
            placeholder={"Country where your company is located"}
            theme={{ roundness: SIZES.xs }}
            left={
              <TextInput.Icon
                icon={() => (
                  <Ionicons name="flag" size={SIZES.lg} color={"#ADADAF"} />
                )}
              />
            }
            style={styles.textInput}
            mode="outlined"
            autoCorrect={false}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.country}
            onChangeText={(text) => setValues({ ...values, country: text })}
          />

          <Text style={{ ...TYPOGRAPHY.h4 }}>Address</Text>

          <TextInput
            placeholder={"The address of your company"}
            theme={{ roundness: SIZES.xs }}
            left={
              <TextInput.Icon
                icon={() => (
                  <Entypo name="address" size={SIZES.lg} color={"#ADADAF"} />
                )}
              />
            }
            style={styles.textInput}
            mode="outlined"
            autoCorrect={false}
            outlineColor={"transparent"}
            activeOutlineColor={COLORS.primary}
            placeholderTextColor={"#ADADAF"}
            selectionColor={COLORS.black}
            value={values.address}
            onChangeText={(text) => setValues({ ...values, address: text })}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              const map = new Map();
              map.set("resume", values.file);
              map.set("country", values.country);
              map.set("address", values.address);
              map.set("type", "employer");
              updateCompanyProfile(user?.uid ?? "", map);
            }}
            disabled={disabled}
            style={{ ...styles.btnContinue, opacity: disabled ? 0.5 : 1 }}
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

export default CompanyProfileScreen;

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
  btnContinue: {
    marginVertical: SIZES.xl,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
  logoBackground: {
    width: 135,
    height: 130,
    borderRadius: SIZES.lg,
    alignSelf: "center",
    backgroundColor: "red",
    marginBottom: SIZES.md,
    overflow: "hidden",
  },
  btnPickPhoto: {
    padding: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    position: "absolute",
    bottom: SIZES.xxs,
    right: SIZES.xxs,
  },
});

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import { StackParamList } from "../../../types";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { ActionButton } from "../../../components/Buttons";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AccountNameDialog from "./dialogs/AccountNameDialog";
import { auth, firestore, storage } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { useUploadFile } from "react-firebase-hooks/storage";
import { getDownloadURL, ref } from "firebase/storage";
import { defaultUser } from "../../../data/models/User";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { Avatar } from "react-native-paper";
import { updateProfile } from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

type IconKeys = "name" | "phone" | "email";

interface IconProps {
  which: IconKeys;
}

type ScreenRouteProp = RouteProp<StackParamList, "ProfileScreen">;
type NavProp = NavigationProp<StackParamList, "ProfileScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const Icon: React.FC<IconProps> = ({ which }) => {
  const Icons = {
    name: () => (
      <MaterialIcons name="person-outline" size={24} color={COLORS.primary} />
    ),
    phone: () => (
      <MaterialIcons name="phone" size={24} color={COLORS.primary} />
    ),
    email: () => (
      <MaterialIcons name="mail-outline" size={24} color={COLORS.primary} />
    ),
  };
  const CurrentIcon = Icons[which];
  return <CurrentIcon />;
};

type Data = {
  title: string;
  subtitle: string;
  which: IconKeys;
};

const ProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const user = auth.currentUser;

  const [showModal, setShowModal] = useState(false);
  const action = ({ which }: { which: IconKeys }) => {
    switch (which) {
      case "name":
        setShowModal(true);
        break;
      case "phone":
        break;
      case "email":
        break;
    }
  };

  const reference = doc(firestore, "users", user!.uid);
  const [snapshot, loading, error] = useDocument(reference);

  const [uploadFile, uploading, imageSnapshot, imageError] = useUploadFile();
  const profileImageRef = ref(
    storage,
    `profileImages/${user!.uid}/profileImage.jpg`
  );

  const [values, setValues] = useState({
    ...defaultUser,
    image: null,
    loading: false,
  });

  const data: Data[] = [
    {
      title: values.name ?? "",
      which: "name",
      subtitle: "Account Name",
    },
    {
      title:
        values.phone !== null && values.phone!.length > 0
          ? values.phone
          : "Click to change",
      which: "phone",
      subtitle: "Phone Number",
    },
    {
      title: values.email ?? "",
      which: "email",
      subtitle: "Email Address",
    },
  ];

  useEffect(() => {
    if (snapshot && snapshot.exists()) {
      const data = snapshot.data();
      setValues({ ...values, ...data });
    }
  }, [snapshot]);

  useEffect(() => console.log(values.loading), [values.loading]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setValues({ ...values, image: result.assets[0].uri });
    }
  };

  async function uploadImage() {
    console.log("Upload Image: ", values.image);
    if (values.image == null) {
      navigation?.goBack();
      return;
    }
    setValues({ ...values, loading: true });
    try {
      const { uri } = await FileSystem.getInfoAsync(values.image);
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
      await uploadFile(profileImageRef, blob, { contentType: "image/jpeg" })
        .then(() => getUrl())
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
    await getDownloadURL(profileImageRef)
      .then((url) => {
        // setDownloadUrl(url)
        updateFirebaseProfile(url);
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
  }

  async function updateFirebaseProfile(downloadUrl: string | null) {
    setValues({ ...values, loading: true });
    await updateProfile(user!, {
      photoURL: downloadUrl ?? user?.photoURL,
    })
      .then(() => updateUserProfile())
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

  async function updateUserProfile() {
    setValues({ ...values, loading: true });
    await updateDoc(reference, {
      photo:
        values.image !== null
          ? user!.photoURL
          : values.photo /* If the user selected an image, then the photo 
        field should be the users photoURL since the user photo gets uploaded first else, set it to what it was initially */,
    })
      .then(() => {
        setValues({ ...values, loading: false });
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
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={loading} />
      <View style={styles.innerContainer}>
        <Header
          title={"Profile"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={pickImage}
          style={styles.profileImageContainer}
        >
          {values.image || user!.photoURL ? (
            <View>
              {values.image ? (
                <Avatar.Image size={100} source={{ uri: values.image }} />
              ) : (
                <Avatar.Image
                  size={100}
                  source={{ uri: user?.photoURL ?? "" }}
                />
              )}
            </View>
          ) : (
            <View />
          )}
          <Ionicons
            name="camera-outline"
            size={SIZES.xl}
            color={COLORS.white}
            style={{ position: "absolute" }}
          />
        </TouchableOpacity>

        {data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => action({ which: item.which })}
            key={index}
            style={styles.itemContainer}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.iconContainer}>
                <Icon which={item.which} />
              </View>
              <View style={{ marginStart: SIZES.sm, justifyContent: "center" }}>
                <Text style={{ ...TYPOGRAPHY.h5, marginBottom: 4 }}>
                  {item.title}
                </Text>
                {item.subtitle && (
                  <Text style={{ ...TYPOGRAPHY.p, marginTop: 4 }}>
                    {item.subtitle}
                  </Text>
                )}
              </View>
            </View>

            <MaterialIcons
              name={
                Platform.OS === "android"
                  ? "arrow-forward"
                  : "arrow-forward-ios"
              }
              size={24}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        ))}
        <View
          style={{ flex: 1, justifyContent: "flex-end", marginTop: SIZES.xl }}
        >
          <ActionButton
            buttonTitle="Done"
            buttonColor={COLORS.primary}
            textColor="white"
            onPress={uploadImage}
          />
        </View>
      </View>
      {showModal && (
        <AccountNameDialog
          modalVisible={true}
          setModalVisible={setShowModal}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: "#F2F2F2",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xs,
    marginHorizontal: SIZES.md,
    marginBottom: SIZES.sm,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    padding: SIZES.sm,
    borderRadius: 50,
    backgroundColor: "#F3F8FF",
  },
  profileImageContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: SIZES.xl,
  },
});

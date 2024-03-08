import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
} from "react-native";
import { Snackbar, TextInput } from "react-native-paper";
import {
  ActionButton,
  AppleButton,
  GoogleButton,
} from "../../../components/Buttons";
import { styles } from "./Login";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import { Loader } from "../../../components/Loader";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { doc, setDoc } from "firebase/firestore";
import { is_email } from "../../../constants";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { User, defaultUser } from "../../../data/models/User";
import { StackParamList } from "../../../types";
import { Ionicons } from "@expo/vector-icons";

type ScreenRouteProp = RouteProp<StackParamList, "SignupScreen">;
type NavProp = NavigationProp<StackParamList, "SignupScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation: NavProp;
};

const EmployerSignupScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    success: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const disabled =
    value.name === "" || value.email === "" || value.password === "";

  async function signUp() {
    if (!is_email(value.email)) {
      setErrors({ ...errors, email: true });
      return;
    }

    setValue({ ...value, loading: true });
    await createUserWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        uploadData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValue({ ...value, loading: false });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again.",
        });
      });
  }

  async function uploadData(user: FirebaseUser) {
    const data: User = {
      ...defaultUser,
      uid: user.uid,
      name: value.name,
      email: value.email.toLowerCase(),
      type: "employer"
    };
    await setDoc(doc(firestore, "users", user.uid), data)
      .then(() => {
        updateUserProfile(user, value.name);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValue({
          ...value,
          loading: false,
        });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again.",
        });
      });
  }

  async function updateUserProfile(
    user: FirebaseUser,
    displayName?: string | null
  ) {
    await updateProfile(user, { displayName: displayName })
      .then(() => {
        sendEmailVerification(user);
        setValue({
          ...value,
          loading: false,
          success: true,
        });
        Toast.show({
          type: ALERT_TYPE.INFO,
          title: "Email verification",
          textBody: "A verification email has been sent to your email address.",
        });
        navigation.navigate("CompanyProfileScreen");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValue({
          ...value,
          loading: false,
        });
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again.",
        });
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Loader showLoader={value.loading} />

      <View style={{ flex: 1, margin: SIZES.md, paddingTop: SIZES.lg }}>
        <Text style={styles.titleText}>Sign up</Text>
        <Text style={styles.subtitleText}>
          Find your dream employee with us
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Company Name"
          theme={{ roundness: SIZES.xs }}
          value={value.name}
          autoCorrect={false}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, name: false });
            } else {
              setErrors({ ...errors, name: true });
            }
            setValue({ ...value, name: text });
          }}
          style={{ ...styles.inputField, marginTop: SIZES.xl }}
          activeOutlineColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={"#ADADAF"}
          // textColor={COLORS.onSecondaryContainer}
        />
        {errors.name && <Text style={styles.errorText}>Name is required</Text>}

        <TextInput
          mode="outlined"
          placeholder="Email"
          keyboardType="email-address"
          theme={{ roundness: SIZES.xs }}
          autoCorrect={false}
          value={value.email}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, email: false });
            } else {
              setErrors({ ...errors, email: true });
            }
            setValue({ ...value, email: text });
          }}
          style={styles.inputField}
          activeOutlineColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={"#ADADAF"}
          // textColor={COLORS.onSecondaryContainer}
        />
        {errors.email && (
          <Text style={styles.errorText}>Email is required</Text>
        )}

        <TextInput
          mode="outlined"
          placeholder="Password"
          theme={{ roundness: SIZES.xs }}
          value={value.password}
          autoCorrect={false}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, password: false });
            } else {
              setErrors({ ...errors, password: true });
            }
            setValue({ ...value, password: text });
          }}
          secureTextEntry={!value.showPassword}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() =>
                    setValue({ ...value, showPassword: !value.showPassword })
                  }
                  activeOpacity={0.5}
                >
                  {value.showPassword ? (
                    <Ionicons
                      name="eye-off"
                      color={COLORS.primary}
                      size={SIZES.md}
                    />
                  ) : (
                    <Ionicons
                      name="eye"
                      color={COLORS.primary}
                      size={SIZES.md}
                    />
                  )}
                </TouchableOpacity>
              )}
              color={COLORS.primary}
            />
          }
          style={styles.inputField}
          activeOutlineColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={"#ADADAF"}
          // textColor={COLORS.onSecondaryContainer}
        />
        {errors.password && (
          <Text style={styles.errorText}>Password is required</Text>
        )}

        <ActionButton
          disabled={disabled}
          onPress={signUp}
          style={{
            width: "100%",
            marginTop: SIZES.lg,
            opacity: disabled ? 0.5 : 1,
          }}
          buttonTitle={"Sign up"}
          buttonColor={COLORS.primary}
          textColor={COLORS.white}
        />

        <View style={styles.dividerContainer}>
          <View
            style={{ flex: 0.42, height: 1, backgroundColor: COLORS.darkGray }}
          />
          <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.black }}>OR</Text>
          <View
            style={{ flex: 0.42, height: 1, backgroundColor: COLORS.darkGray }}
          />
        </View>

        <GoogleButton
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.INFO,
              title: "Coming soon",
              textBody: "This feature isn't available yet",
            })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up with Google"}
        />

        <AppleButton
          onPress={() =>
            Toast.show({
              type: ALERT_TYPE.INFO,
              title: "Coming soon",
              textBody: "This feature isn't available yet",
            })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up with Apple"}
        />

        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View style={{ ...styles.bottomDivider, width: width }} />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...TYPOGRAPHY.h5 }}>Already have an account?</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginHorizontal: SIZES.xxs }}
              onPress={() => {
                navigation.navigate("LoginScreen" as never);
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.primary }}>
                Sign in.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmployerSignupScreen;

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
  StatusBar,
} from "react-native";
import { Snackbar, TextInput } from "react-native-paper";
import {
  ActionButton,
  AppleButton,
  GoogleButton,
} from "../../../components/Buttons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import { StackNavigation } from "../../../types";
// import { auth } from "../../../../firebase";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithCredential,
  User as FirebaseUser,
} from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { Loader } from "../../../components/Loader";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { is_email } from "../../../constants";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../../../data/models/User";
import { Ionicons } from "@expo/vector-icons";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
  const navigation = useNavigation<StackNavigation>();
  const { width } = useWindowDimensions();
  //   const provider = new GoogleAuthProvider();

  //   const [{}, userCredential] = useSignInWithGoogle(auth);

  // GoogleSignin.configure({
  //     webClientId: '535570809491-rfd6nbbqpi8178tpdcbe079k6qhlscmm.apps.googleusercontent.com',
  // });

  const [value, setValue] = useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const disabled = value.email === "" || value.password === "";

  async function signInWithGoogle() {
    setValue({ ...value, loading: true });
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
    // .then((has) => {
    //     if (!has) return
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
    // })
    // await useSignInWithGoogle(auth, provider)
    // const { idToken } = await GoogleSignin.signIn();
    // const credential = GoogleAuthProvider.credential(idToken);

    // await signInWithCredential(auth, userCredential)
    setValue({
      ...value,
      //   message: userCredential.user.displayName,
      loading: false,
    });
    // .then((credential) => {
    //     const user = credential.user
    //     setValue({...value, loading: false})
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
    // })
  }

  async function signIn() {
    if (!is_email(value.email)) {
      setErrors({ ...errors, email: true });
      return;
    }

    setValue({ ...value, loading: true });
    await signInWithEmailAndPassword(auth, value.email, value.password)
      .then((userCredential) => {
        const user = userCredential.user;
        fetchUserData(user);
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

  async function fetchUserData(user: FirebaseUser) {
    const userRef = doc(firestore, "users", user.uid);
    getDoc(userRef).then((snapshot) => {
      setValue({ ...value, loading: false });
      if (snapshot.exists()) {
        const userData = snapshot.data() as User;
        if (userData.skills.length <= 0) {
          navigation.navigate("ExpertiseSelectionScreen");
        } else {
          navigation.navigate("JobSeekerDashboard");
        }
      } else {
        Toast.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: "An error occurred. Please try again.",
        });
      }
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
        <Text style={styles.titleText}>Sign in</Text>
        <Text style={styles.subtitleText}>
          New jobs might have been added since you last logged in
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Email"
          theme={{ roundness: SIZES.xs }}
          autoCorrect={false}
          keyboardType="email-address"
          value={value.email}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, email: false });
            } else {
              setErrors({ ...errors, email: true });
            }
            setValue({ ...value, email: text });
          }}
          style={{ ...styles.inputField, marginTop: SIZES.xl }}
          activeOutlineColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={"#ADADAF"}
          //   textColor={COLORS.black}
        />
        {errors.email && (
          <Text style={styles.errorText}>Email is required</Text>
        )}

        <TextInput
          mode="outlined"
          placeholder="Password"
          autoCorrect={false}
          theme={{ roundness: SIZES.xs }}
          value={value.password}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, password: false });
            } else if (text === "") {
              setErrors({ ...errors, password: true });
            }
            setValue({ ...value, password: text });
          }}
          secureTextEntry={!value.showPassword}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() => setValue({...value, showPassword: !value.showPassword})}
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
          //   textColor={COLORS.black}
        />
        {errors.password && (
          <Text style={styles.errorText}>Password is required</Text>
        )}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate("ForgotPasswordScreen");
          }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <ActionButton
          disabled={disabled}
          onPress={signIn}
          style={{
            width: "100%",
            marginTop: SIZES.lg,
            opacity: disabled ? 0.5 : 1,
          }}
          buttonTitle={"Sign in"}
          buttonColor={COLORS.primary}
          textColor={COLORS.white}
        />

        <View style={styles.dividerContainer}>
          <View style={styles.line} />
          <Text style={{ ...TYPOGRAPHY.h5 }}>OR</Text>
          <View style={styles.line} />
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
          buttonTitle={"Sign in with Google"}
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
          buttonTitle={"Sign in with Apple"}
        />

        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View style={styles.bottomDivider} />
          <View style={{ flexDirection: "row" }}>
            <Text style={{ ...TYPOGRAPHY.h5 }}>New to JobNow?</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ marginHorizontal: SIZES.xxs }}
              onPress={() => {
                navigation.navigate("SignupScreen");
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.primary }}>
                Sign up.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  inputField: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    marginTop: SIZES.sm,
  },
  forgotPasswordButton: {
    paddingTop: SIZES.sm,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  forgotPassword: {
    ...TYPOGRAPHY.h4,
    color: COLORS.primary,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  titleText: {
    ...TYPOGRAPHY.h3,
    fontSize: SIZES.xl - 2,
    alignSelf: "center",
  },
  subtitleText: {
    ...TYPOGRAPHY.p,
    marginTop: SIZES.md,
    alignSelf: "center",
  },
  errorText: {
    ...TYPOGRAPHY.p,
    alignSelf: "flex-end",
    color: COLORS.red,
  },
  dividerContainer: {
    flexDirection: "row",
    width: "100%",
    marginTop: SIZES.xl,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomDivider: {
    height: 1,
    backgroundColor: COLORS.darkGray,
    marginBottom: SIZES.md,
  },
  line: { flex: 0.42, height: 1, backgroundColor: COLORS.darkGray },
});

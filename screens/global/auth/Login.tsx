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
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { useEffect, useState } from "react";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import { StackNavigation, StackParamList } from "../../../types";
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
import ReactNativeModal from "react-native-modal";
import { Option } from "../../../components/AuthOption";
import { Briefcase, User as UserIcon } from "../../../assets/svg/Onboarding";
// import { useSignInWithGoogle } from "react-firebase-hooks/auth";
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

type ScreenRouteProp = RouteProp<StackParamList, "LoginScreen">;
type NavProp = NavigationProp<StackParamList, "LoginScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation: NavProp;
};

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width, height } = useWindowDimensions();
  //   const provider = new GoogleAuthProvider();

  //   const [{}, userCredential] = useSignInWithGoogle(auth);

  // GoogleSignin.configure({
  //     webClientId: '535570809491-rfd6nbbqpi8178tpdcbe079k6qhlscmm.apps.googleusercontent.com',
  // });

  const [values, setValues] = useState({
    email: "",
    password: "",
    loading: false,
    showPassword: false,
    showDialog: false,
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

  const disabled = values.email === "" || values.password === "";

  async function signInWithGoogle() {
    setValues({ ...values, loading: true });
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
    setValues({
      ...values,
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
    if (!is_email(values.email)) {
      setErrors({ ...errors, email: true });
      return;
    }

    setValues({ ...values, loading: true });
    await signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        const user = userCredential.user;
        fetchUserData(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setValues({
          ...values,
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
    getDoc(userRef)
      .then((snapshot) => {
        setValues({ ...values, loading: false });
        if (snapshot.exists()) {
          const userData = snapshot.data() as User;
          console.log(userData);
          if (userData.type !== null) {
            if (userData.type === "employer")
              navigation.navigate("EmployerDashboard");
            else navigation.navigate("CompanyProfileScreen");
          } else if (userData.skills.length <= 0) {
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
        setValues({
          ...values,
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
      <Loader showLoader={values.loading} />
      <SignupOptionDialog
        showDialog={values.showDialog}
        setShowDialog={(value) => setValues({ ...values, showDialog: value })}
        width={width}
        height={height}
        navigation={navigation}
      />

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
          value={values.email}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, email: false });
            } else {
              setErrors({ ...errors, email: true });
            }
            setValues({ ...values, email: text });
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
          value={values.password}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, password: false });
            } else if (text === "") {
              setErrors({ ...errors, password: true });
            }
            setValues({ ...values, password: text });
          }}
          secureTextEntry={!values.showPassword}
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() =>
                    setValues({ ...values, showPassword: !values.showPassword })
                  }
                  activeOpacity={0.5}
                >
                  {values.showPassword ? (
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
            navigation?.navigate("ForgotPasswordScreen");
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
                setValues({ ...values, showDialog: true });
                // navigation.navigate("SignupScreen");
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

interface ISignupOptionDialogProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  action?: () => void;
  width: number;
  height: number;
  navigation: StackNavigation;
}

const SignupOptionDialog: React.FC<ISignupOptionDialogProps> = ({
  showDialog,
  setShowDialog,
  action,
  width,
  height,
  navigation,
}) => {
  return (
    <ReactNativeModal
      isVisible={showDialog}
      onBackdropPress={() => setShowDialog(false)}
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.5}
      deviceWidth={width}
      deviceHeight={height}
      onSwipeComplete={(gestureState) => setShowDialog(false)}
    >
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Select an option</Text>
        <Text style={styles.description}>
          Choose whether you’re an employer in search of a job, or an employer
          in search of an employee.
        </Text>

        <View style={styles.line2} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <Option
            title="Job Seeker"
            desc="I am in search of a job"
            color="#F3F8FF"
            icon={<Briefcase />}
            onPress={() => {
              setShowDialog(false);
              navigation.navigate("SignupScreen");
            }}
          />
          <Option
            title="Employer"
            desc="I am looking for employees"
            color="#FFF0E6"
            icon={<UserIcon />}
            onPress={() => {
              setShowDialog(false);
              navigation.navigate("EmployerSignupScreen");
            }}
          />
        </View>
      </View>
    </ReactNativeModal>
  );
};

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
  title: { ...TYPOGRAPHY.h1, margin: SIZES.xxs, alignSelf: "center" },
  description: {
    ...TYPOGRAPHY.p,
    fontSize: SIZES.sm,
    textAlign: "center",
  },
  line2: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.md,
    padding: 40,
    paddingHorizontal: SIZES.md,
  },
});

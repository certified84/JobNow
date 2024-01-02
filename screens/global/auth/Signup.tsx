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
import { useNavigation } from "@react-navigation/native";
// import { Loader } from '../../../components/Loader';
import { useEffect, useState } from "react";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
// import { User as FirebaseUser, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
// import { auth, firestore } from '../../../../firebase';
// import { doc, setDoc } from 'firebase/firestore';
// import { User, defaultUser } from '../../../data/model/User'

const SignupScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
    loading: false,
    showSnackBar: false,
    success: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  useEffect(
    () => setValue({ ...value, showSnackBar: value.message !== "" }),
    [value.message]
  );

  async function signUp() {
    if (value.name === "") {
      setErrors({ ...errors, name: true });
      return;
    } else if (value.email === "") {
      setErrors({ ...errors, email: true });
      return;
    } else if (value.password === "") {
      setErrors({ ...errors, password: true });
      return;
    }

    setValue({ ...value, loading: true });
    // await createUserWithEmailAndPassword(auth, value.email, value.password)
    // .then((userCredential) => {
    //     const user = userCredential.user
    //     uploadData(user)
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //     setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
    // })
  }

  // async function uploadData(user: FirebaseUser) {
  //     const data: User = { ...defaultUser, uid: user.uid, name: value.name, email: value.email.toLowerCase() }
  //     await setDoc(doc(firestore, "users", user.uid), data)
  //     .then(() => {
  //         updateUserProfile(user, value.name)
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log(errorCode, errorMessage)
  //         setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
  //     })
  // }

  // async function updateUserProfile(user: FirebaseUser, displayName? : string | null) {
  //     await updateProfile(user, {displayName: displayName})
  //     .then(() => {
  //         sendEmailVerification(user)
  //         setValue({ ...value, message: "A verification email has been sent to your email address.", loading: false, success: true })
  //         auth.signOut()
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         console.log(errorCode, errorMessage)
  //         setValue({ ...value, message: "An error occurred. Please try again.", loading: false })
  //     })
  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Loader showLoader={value.loading} /> */}

      <View style={{ flex: 1, margin: SIZES.md, paddingTop: SIZES.lg }}>
        <Text
          style={{
            ...TYPOGRAPHY.h3,
            fontSize: SIZES.xl - 2,
            alignSelf: "center",
          }}
        >
          Sign up
        </Text>
        <Text
          style={{
            ...TYPOGRAPHY.p,
            marginTop: SIZES.md,
            alignSelf: "center",
          }}
        >
          Find your dream job with us
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Name"
          theme={{ roundness: SIZES.xs }}
          value={value.name}
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
        {errors.name && (
          <Text
            style={{
              ...TYPOGRAPHY.p,
              alignSelf: "flex-end",
              color: COLORS.red,
            }}
          >
            Name is required
          </Text>
        )}

        <TextInput
          mode="outlined"
          placeholder="Email"
          theme={{ roundness: SIZES.xs }}
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
          <Text
            style={{
              ...TYPOGRAPHY.p,
              alignSelf: "flex-end",
              color: COLORS.red,
            }}
          >
            Email is required
          </Text>
        )}

        <TextInput
          mode="outlined"
          placeholder="Password"
          theme={{ roundness: SIZES.xs }}
          value={value.password}
          onChangeText={(text) => {
            if (text !== "") {
              setErrors({ ...errors, password: false });
            } else {
              setErrors({ ...errors, password: true });
            }
            setValue({ ...value, password: text });
          }}
          secureTextEntry={true}
          style={styles.inputField}
          activeOutlineColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={"#ADADAF"}
          // textColor={COLORS.onSecondaryContainer}
        />
        {errors.password && (
          <Text
            style={{
              ...TYPOGRAPHY.p,
              alignSelf: "flex-end",
              color: COLORS.red,
            }}
          >
            Password is required
          </Text>
        )}

        <ActionButton
          onPress={signUp}
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up"}
          buttonColor={COLORS.primary}
          textColor={COLORS.white}
        />

        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: SIZES.xl,
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
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
            setValue({ ...value, showSnackBar: true, message: "Coming soon.." })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up with Google"}
        />

        <AppleButton
          onPress={() =>
            setValue({ ...value, showSnackBar: true, message: "Coming soon.." })
          }
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Sign up with Apple"}
        />

        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <View
            style={{
              height: 1,
              backgroundColor: COLORS.darkGray,
              marginBottom: SIZES.md,
              width: width,
            }}
          />
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

      <Snackbar
        visible={value.showSnackBar}
        onDismiss={() => setValue({ ...value, message: "" })}
        theme={{ colors: { primary: COLORS.primary } }}
        action={{
          //   textColor: COLORS.primary,
          label: "OK",
          onPress: () => {
            if (value.success) navigation.navigate("LoginScreen" as never);
          },
        }}
      >
        <Text style={{ ...TYPOGRAPHY.p, color: COLORS.white }}>
          {value.message}
        </Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default SignupScreen;

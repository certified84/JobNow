import {
  Platform,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import { Props } from "../../types";
import { useEffect, useState } from "react";
import { User, defaultUser } from "../../data/models/User";
import {
  useCollection,
  useDocument,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../firebase";
import { Loader } from "../../components/Loader";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

const ExpertiseSelectionScreen: React.FC<Props> = ({ route, navigation }) => {
  const [values, setValues] = useState({
    selected: [-1],
    loading: false,
  });
  const skills = [
    "Accountancy",
    "Aerospace Engineering",
    "Architecture",
    "Banking",
    "Design",
    "Journalism",
    "Nursing",
  ];

  const user = auth.currentUser!;
  const reference = doc(firestore, "users", user.uid);
  const [snapshot, loading, error] = useDocument(reference);

  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });
  }, [navigation]);

  async function updateUserProfile() {
    setValues({ ...values, loading: true });
    const userRef = doc(firestore, "users", user.uid);
    await updateDoc(userRef, {
      skills: skills.filter((_, index) => values.selected.includes(index)),
    })
      .then(() => {
        setValues({ ...values, loading: false });
        navigation.navigate("JobSeekerDashboard");
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
      <Loader showLoader={values.loading || loading} />
      <View style={styles.innerContainer}>
        {/* <TouchableOpacity
          style={{ padding: 8, paddingStart: 0 }}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
            size={24}
            color="black"
          />
        </TouchableOpacity> */}

        <FlatList
          ListHeaderComponent={() => (
            <View
              style={{ flex: 1, marginTop: SIZES.xl, alignItems: "center" }}
            >
              <Text style={{ ...TYPOGRAPHY.h2 }}>Expertise</Text>
              <Text style={{ ...TYPOGRAPHY.p, marginVertical: SIZES.xxs }}>
                Please select your field of expertise
              </Text>

              <View style={styles.line} />
            </View>
          )}
          style={{ width: "100%" }}
          data={skills}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <Option
                title={item}
                isSelected={values.selected.includes(index)}
                onPress={() => {
                  if (values.selected.includes(index)) {
                    setValues({
                      ...values,
                      selected: values.selected.filter(
                        (item) => item !== index
                      ),
                    });
                  } else {
                    setValues({
                      ...values,
                      selected: [...values.selected, index],
                    });
                    // setSelected([...selected, index]);
                  }
                }}
              />
            );
          }}
          ListFooterComponent={() => (
            <TouchableOpacity
              activeOpacity={0.5}
              disabled={values.selected.length <= 1}
              onPress={updateUserProfile}
              style={{
                ...styles.btnContinue,
                opacity: values.selected.length <= 1 ? 0.5 : 1,
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.white }}>
                Continue
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

interface OptionProps {
  title: string;
  isSelected: boolean;
  onPress?: () => void;
}

const Option: React.FC<OptionProps> = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        ...styles.optionContainer,
        borderColor: isSelected ? "#3C8AFF" : "#F0F0F0",
      }}
    >
      <View
        style={{
          ...styles.checkBox,
          backgroundColor: isSelected ? "#3C8AFF" : "white",
          borderWidth: isSelected ? 0 : 2,
        }}
      >
        <MaterialCommunityIcons name="check" size={14} color="white" />
      </View>
      <Text style={{ ...TYPOGRAPHY.h5, marginStart: SIZES.xs }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ExpertiseSelectionScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingHorizontal: SIZES.md,
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  btnContinue: {
    marginVertical: SIZES.xl,
    padding: SIZES.sm,
    backgroundColor: "#1472FF",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.md,
  },
  optionContainer: {
    flexDirection: "row",
    width: "100%",
    padding: SIZES.md,
    borderWidth: 2,
    borderRadius: SIZES.xxs,
    borderStartWidth: 2,
    alignItems: "center",
    marginBottom: SIZES.sm,
  },
  checkBox: {
    padding: 2,
    borderColor: "#3C8AFF",
    borderRadius: 4,
  },
});

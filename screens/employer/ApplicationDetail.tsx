import {
  Text,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import Header from "../../components/Header";
import { StackParamList } from "../../types";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import JobDetailComponent from "../../components/JobDetailComponent";
import { JobStatus } from "../../constants";
import { FileUploaded } from "../../assets/svg/Job";
import { auth, firestore } from "../../firebase";
import { Timestamp, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import { Avatar, TextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";
import { Loader } from "../../components/Loader";

type ScreenRouteProp = RouteProp<StackParamList, "ApplicationDetailScreen">;
type NavProp = NavigationProp<StackParamList, "ApplicationDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const { Popover } = renderers;

const ApplicationDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { width } = useWindowDimensions();
  const user = auth.currentUser;
  const [values, setValues] = useState({
    loading: false,
    message: JobStatus[route!.params.application.status].update,
    showDropdown: false,
    status: route?.params.application.status!,
  });

  const status = {
    sent: { status: "Application Sent", color: COLORS.primary, message: "" },
    pending: { status: "Application Pending", color: "#FF802B" },
    rejected: { status: "Application Rejected", color: "#F92020" },
    accepted: { status: "Application Accepted", color: "#1EB300" },
  };

  const [application, setApplication] = useState(route?.params.application!);
  const applicationRef = doc(firestore, `applications`, application.id);
  const [snapshot, loading, error] = useDocument(applicationRef);
  const statusUpdateDate = (application.statusUpdateDate as Timestamp)
    ?.toDate()
    .toDateString();

  useEffect(() => {
    if (snapshot && snapshot.exists()) {
      setApplication(snapshot.data());
    }
  }, [snapshot]);

  useEffect(
    () => setValues({ ...values, message: JobStatus[values.status].update }),
    [values.status]
  );

  async function updateApplication() {
    setValues({...values, loading: true})
    const applicationRef = doc(firestore, `applications`, application.id);
    await updateDoc(applicationRef, {
      status: values.status,
      statusUpdate: values.message,
      statusUpdateDate: serverTimestamp(),
    })
      .then(() => {
        setValues({ ...values, loading: false });
        Toast.show({
          type: ALERT_TYPE.SUCCESS,
          title: "Application Updated",
          textBody: "Application updated successfully",
        });
        navigation?.goBack();
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
      <Loader showLoader={values.loading}/>
      <View style={styles.innerContainer}>
        <Header
          title={"Application Details"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Avatar.Image source={{ uri: application.photoUrl }} size={80} />
              <View style={{ marginStart: SIZES.sm }}>
                <Text style={{ ...TYPOGRAPHY.h4 }}>{application.name}</Text>
                <Text style={{ ...TYPOGRAPHY.p }}>{application.job.title}</Text>
              </View>
            </View>

            <View style={styles.line} />

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primary,
                padding: SIZES.sm,
                borderRadius: 100,
                alignItems: "center",
              }}
            >
              <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.white }}>
                See Resume
              </Text>
            </TouchableOpacity>

            <View style={{ height: SIZES.sm }} />

            <View
              style={{
                flexDirection: "row",
                borderColor: status[values.status].color,
                borderWidth: 1,
                padding: SIZES.sm,
                borderRadius: SIZES.md,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{ ...TYPOGRAPHY.h5, color: status[values.status].color }}
              >
                {status[values.status].status}
              </Text>

              <Menu renderer={Popover} rendererProps={{ placement: "bottom" }}>
                <MenuTrigger>
                  <Ionicons
                    name="chevron-down"
                    color={status[values.status].color}
                    size={SIZES.md}
                  />
                </MenuTrigger>
                <MenuOptions customStyles={menuOptionsStyle}>
                  <View
                    style={{
                      paddingTop: SIZES.xl,
                      backgroundColor: COLORS.white,
                      borderRadius: SIZES.xs,
                      // alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        ...TYPOGRAPHY.h5,
                        marginBottom: SIZES.xxs,
                        paddingHorizontal: SIZES.md,
                      }}
                    >
                      Select Status
                    </Text>

                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        opacity: 0.2,
                        backgroundColor: "gray",
                      }}
                    />

                    <MenuOption
                      onSelect={() =>
                        setValues({ ...values, status: "rejected" })
                      }
                    >
                      <View
                        style={{
                          alignSelf: "center",
                          borderColor: "gray",
                          padding: SIZES.xs,
                        }}
                      >
                        <Text>Reject</Text>
                      </View>
                    </MenuOption>

                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        opacity: 0.2,
                        backgroundColor: "gray",
                      }}
                    />

                    <MenuOption
                      onSelect={() =>
                        setValues({ ...values, status: "accepted" })
                      }
                    >
                      <View
                        style={{
                          alignSelf: "center",
                          borderColor: "gray",
                          padding: SIZES.xs,
                        }}
                      >
                        <Text>Accept</Text>
                      </View>
                    </MenuOption>
                  </View>
                </MenuOptions>
              </Menu>
            </View>

            <View style={styles.line} />

            <Text style={{ ...TYPOGRAPHY.h4, marginTop: SIZES.xs }}>
              Message
            </Text>

            <TextInput
              placeholder=""
              theme={{ roundness: SIZES.xs }}
              style={{ ...styles.textInputField, minHeight: 150 }}
              mode="outlined"
              outlineColor="#555555"
              multiline
              // editable={false}
              activeOutlineColor={"#555555"}
              selectionColor="#555555"
              // textColor={"#555555"}
              value={values.message}
              onChangeText={(text) => {
                setValues({ ...values, message: text });
              }}
            />
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              padding: SIZES.sm,
              borderRadius: 100,
              alignItems: "center",
              marginHorizontal: SIZES.md,
            }}
            onPress={updateApplication}
          >
            <Text style={{ ...TYPOGRAPHY.h5, color: COLORS.white }}>
              Update application
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: SIZES.sm }} />

        {/* <JobDetailComponent application={application} /> */}

        {/* <View style={{ marginHorizontal: SIZES.md, marginTop: SIZES.lg }}>
          <Text style={{ ...TYPOGRAPHY.h4 }}>Resume</Text>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.uploadResumeContainer}
          >
            <FileUploaded />
            <Text style={styles.resume}>
              {`CV-${user?.displayName?.substring(
                0,
                splitIndex
              )}-${user?.displayName?.substring(
                splitIndex ?? 0 + 1,
                user?.displayName?.length
              )}.pdf`}
            </Text>
          </TouchableOpacity>

          <Text style={{ ...TYPOGRAPHY.h4 }}>Application Status</Text>

          <View style={styles.statusDateContainer}>
            <View
              style={{
                ...styles.statusContainer,
                backgroundColor: JobStatus[application.status].background,
              }}
            >
              <Text
                style={{
                  ...TYPOGRAPHY.p,
                  color: JobStatus[application.status].color,
                }}
              >
                {JobStatus[application.status].text}
              </Text>
            </View>
            <Text style={{ ...TYPOGRAPHY.p }}>{statusUpdateDate}</Text>
          </View>

          <Text style={{ ...TYPOGRAPHY.p }}>
            {JobStatus[application.status].update}
          </Text>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default ApplicationDetailScreen;

const menuOptionsStyle = {
  optionsContainer: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: SIZES.md,
    padding: 0,
  },
};

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: "#CACACA",
    padding: SIZES.md,
    marginHorizontal: SIZES.md,
  },
  line: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginVertical: SIZES.sm,
  },
  textInputField: {
    backgroundColor: "#ECECEC",
    color: COLORS.black,
    marginTop: SIZES.xs,
  },
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  statusContainer: {
    paddingHorizontal: SIZES.xxs,
    paddingVertical: SIZES.xxs - 2,
    borderRadius: 5,
  },
  statusDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: SIZES.sm,
  },
  uploadResumeContainer: {
    overflow: "hidden",
    flexDirection: "row",
    borderWidth: 1,
    borderStyle: "dashed",
    alignItems: "center",
    marginVertical: SIZES.md,
    borderRadius: SIZES.xs,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.xxs,
    borderColor: "#ADADAF",
  },
  resume: {
    ...TYPOGRAPHY.h5,
    fontFamily: "outfit_semi_bold",
    color: "#ADADAF",
    marginStart: SIZES.md,
  },
});

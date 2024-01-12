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
import { StackNavigation } from "../../../../types";
import { Loader } from "../../../../components/Loader";
import Header from "../../../../components/Header";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../../theme";
import { ActionButton } from "../../../../components/Buttons";
import { TextInput } from "react-native-paper";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../../../firebase";
import { updateProfile } from "firebase/auth";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

interface AccountNameDialogProps {
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
  navigation: StackNavigation;
}

const AccountNameDialog: React.FC<AccountNameDialogProps> = ({
  modalVisible,
  setModalVisible,
  navigation,
}) => {
  const user = auth.currentUser;
  const reference = doc(firestore, "users", user!.uid);

  const [value, setValue] = useState({
    firstname: user?.displayName!.split(" ")[0],
    lastname: user?.displayName!.split(" ")[1],
    firstnameError: false,
    lastnameError: false,
    loading: false,
    success: false,
  });

  async function updateFirebaseProfile() {
    setValue({ ...value, loading: true });
    await updateProfile(user!, {
      displayName: `${value.firstname} ${value.lastname}`,
    })
      .then(() => updateUserProfile())
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

  async function updateUserProfile() {
    setValue({ ...value, loading: true });
    await updateDoc(reference, { name: `${value.firstname} ${value.lastname}` })
      .then(() => {
        setValue({ ...value, loading: false });
        setModalVisible(false);
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

  const disabled = value.firstname!.length <= 0 || value.lastname!.length <= 0;

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
          <Loader showLoader={value.loading} />
          <View style={{ flex: 1 }}>
            <Header
              title={"Account Name"}
              navigation={navigation}
              showBack={true}
              onBackPress={() => setModalVisible(false)}
              showBookmark={false}
              bookmarked={false}
            />

            <View style={{ margin: SIZES.md }}>
              <Text style={{ ...TYPOGRAPHY.h5 }}>First Name</Text>
              <TextInput
                mode="outlined"
                placeholder="First name"
                theme={{ roundness: SIZES.xs }}
                autoCorrect={false}
                value={value.firstname}
                onChangeText={(text) => {
                  if (text !== "") {
                    setValue({ ...value, firstnameError: false });
                  } else {
                    setValue({ ...value, firstnameError: true });
                  }
                  setValue({ ...value, firstname: text });
                }}
                style={{ ...styles.inputField, marginBottom: SIZES.xl }}
                activeOutlineColor={COLORS.primary}
                selectionColor={COLORS.primary}
                placeholderTextColor={"#ADADAF"}
                //   textColor={COLORS.black}
              />
              {value.firstnameError && (
                <Text style={styles.errorText}>First name is required</Text>
              )}
              <Text>Last Name</Text>
              <TextInput
                mode="outlined"
                placeholder="Last name"
                theme={{ roundness: SIZES.xs }}
                autoCorrect={false}
                value={value.lastname}
                onChangeText={(text) => {
                  if (text !== "") {
                    setValue({ ...value, lastnameError: false });
                  } else {
                    setValue({ ...value, lastnameError: true });
                  }
                  setValue({ ...value, lastname: text });
                }}
                style={{ ...styles.inputField, marginBottom: SIZES.xl }}
                activeOutlineColor={COLORS.primary}
                selectionColor={COLORS.primary}
                placeholderTextColor={"#ADADAF"}
                //   textColor={COLORS.black}
              />
              {value.lastnameError && (
                <Text style={styles.errorText}>Last name is required</Text>
              )}
            </View>
            <View style={{ flex: 1, justifyContent: "flex-end" }}>
              <ActionButton
                disabled={disabled}
                buttonTitle="Done"
                buttonColor={COLORS.primary}
                textColor="white"
                onPress={updateFirebaseProfile}
              />
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default AccountNameDialog;

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: COLORS.white,
    color: COLORS.black,
    marginTop: 4,
  },
  errorText: {
    ...TYPOGRAPHY.p,
    alignSelf: "flex-end",
    color: COLORS.red,
  },
});

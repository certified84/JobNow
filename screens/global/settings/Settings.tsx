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
} from "react-native";
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
  collection,
  doc,
  query,
  where,
} from "firebase/firestore";
import { auth, firestore } from "../../../firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { Job } from "../../../data/models/Job";
import { QueryDocumentSnapshot } from "firebase-functions/v1/firestore";
import { Loader } from "../../../components/Loader";
import EmptyDesign from "../../../components/EmptyDesign";
import { defaultUser } from "../../../data/models/User";
import { MaterialIcons } from "@expo/vector-icons";
import { ActionButton, DefaultButton } from "../../../components/Buttons";

type IconKeys = "profile" | "notifications" | "faqs";

interface IconProps {
  which: IconKeys;
}

const Icon: React.FC<IconProps> = ({ which }) => {
  const Icons = {
    profile: () => (
      <MaterialIcons name="person" size={24} color={COLORS.primary} />
    ),
    notifications: () => (
      <MaterialIcons name="notifications" size={24} color={COLORS.primary} />
    ),
    faqs: () => (
      <MaterialIcons name="help" size={24} color={COLORS.primary} />
    ),
  };
  const CurrentIcon = Icons[which];
  return <CurrentIcon />;
};

const data: any[] = [
  {
    title: "Profile",
    subtitle: "Edit your profile",
    which: "profile"
  },
  {
    title: "Notifications",
    subtitle: "Notifications settings",
    which: "notifications"
  },
  {
    title: "FAQs & Support",
    subtitle: "Get support and send feedback",
    which: "faqs"
  },
];

type ScreenRouteProp = RouteProp<StackParamList, "SettingsScreen">;
type NavProp = NavigationProp<StackParamList, "SettingsScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const SettingsScreen: React.FC<Props> = ({ route, navigation }) => {
  const action = ({ which }: {which: IconKeys}) => {
    switch (which) {
      case "profile":
        navigation?.navigate("ProfileScreen");
        break;
      case "notifications":
        navigation?.navigate("NotificationsScreen");
        break;
      case "faqs":
        navigation?.navigate("FAQScreen");
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={false} />
      <View style={styles.innerContainer}>
        <Header
          title={"Settings"}
          navigation={navigation}
          showBack={false}
          showBookmark={false}
          bookmarked={false}
        />
        {data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() =>action({which: item.which})}
            key={index}
            style={styles.itemContainer}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.iconContainer}>
                <Icon which={item.which} />
              </View>
              <View style={{ marginStart: SIZES.sm, justifyContent: "center" }}>
                <Text style={{ ...TYPOGRAPHY.h4, marginBottom: 4 }}>
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
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 80 }}>
          <ActionButton
            buttonTitle="Sign out"
            buttonColor="red"
            textColor="white"
            onPress={() => {
              auth.signOut();
              navigation?.navigate("LoginScreen");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

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
});

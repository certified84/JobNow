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
import { TermsCondition } from "../../../assets/svg/Settings";

type IconKeys = "faqs" | "privacy" | "terms";

interface IconProps {
  which: IconKeys;
}

const Icon: React.FC<IconProps> = ({ which }) => {
  const Icons = {
    faqs: () => (
      <MaterialIcons name="help" size={24} color={COLORS.primary} />
    ),
    "privacy": () => (
      <MaterialIcons name="shield" size={24} color={COLORS.primary} />
    ),
    "terms": () => (
      <TermsCondition />
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

const data: Data[] = [
  {
    title: "FAQs",
    which: "faqs",
    subtitle: "Edit your profile",
  },
  {
    title: "Privacy Policy",
    which: "privacy",
    subtitle: "Notifications settings",
  },
  {
    title: "Terms of Use",
    which: "terms",
    subtitle: "Get support and send feedback",
  },
];

type ScreenRouteProp = RouteProp<StackParamList, "SettingsScreen">;
type NavProp = NavigationProp<StackParamList, "SettingsScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const FAQScreen: React.FC<Props> = ({ route, navigation }) => {
  const action = ({ which }: {which: IconKeys}) => {
    switch (which) {
      case "faqs":

        break;
      case "privacy":

        break;
      case "terms":

        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={false} />
      <View style={styles.innerContainer}>
        <Header
          title={"FAQs & Support"}
          navigation={navigation}
          showBack={false}
          showBookmark={false}
          bookmarked={false}
        />
        {data.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
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
                {/* {item.subtitle && (
                  <Text style={{ ...TYPOGRAPHY.p, marginTop: 4 }}>
                    {item.subtitle}
                  </Text>
                )} */}
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
      </View>
    </SafeAreaView>
  );
};

export default FAQScreen;

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

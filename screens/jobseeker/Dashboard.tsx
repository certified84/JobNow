import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Props } from "../../types";
import { COLORS, SIZES } from "../../theme";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
  Bookmark,
  BookmarkSelected,
  BriefcaseSelected,
  Briefcase,
  PersonSelected,
  Person,
  SettingsSelected,
  Settings,
} from "../../assets/svg/Navigation";
import { useEffect } from "react";
import JobSeekerHomeScreen from "./Home";
import JobApplicationsScreen from "./job/JobApplications";
import BookmarksScreen from "./job/Bookmarks";
import SettingsScreen from "../global/settings/Settings";

const Tab = createMaterialBottomTabNavigator();

const JobSeekerDashboard: React.FC<Props> = ({ route, navigation }) => {
  useEffect(() => {
    navigation.addListener("beforeRemove", (e: any) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName="JobSeekerHomeScreen"
        activeColor={COLORS.primary}
        labeled={false}
        inactiveColor={"#ADADAF"}
        barStyle={{
          backgroundColor: COLORS.white,
          position: "absolute",
          elevation: 0,
          // height: "10%",
          paddingBottom: 8,
        }}
        screenListeners={{
          tabPress: (e) => {},
        }}
      >
        <Tab.Screen
          name="JobSeekerHomeScreen"
          component={JobSeekerHomeScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarIcon}>
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={SIZES.xl}
                  color={color}
                />
                <Text style={{ ...styles.tabBarLabel, color: color }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="JobApplicationsScreen"
          component={JobApplicationsScreen}
          initialParams={{
            bookmark: false,
            showBookmark: false,
            showBack: false,
          }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarIcon}>
                {focused ? <BriefcaseSelected /> : <Briefcase />}
                <Text style={{ ...styles.tabBarLabel, color: color }}>
                  Applications
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="BookmarksScreen"
          component={BookmarksScreen}
          initialParams={{
            title: "Bookmarks",
            bookmarked: false,
            showBookmark: false,
            showBack: false,
          }}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarIcon}>
                {focused ? <BookmarkSelected /> : <Bookmark />}
                <Text style={{ ...styles.tabBarLabel, color: color }}>
                  Bookmarks
                </Text>
              </View>
            ),
          }}
        />
        {/* <Tab.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return focused ? (
                <View style={styles.tabBarIcon}>
                  {/* <BoardIcon color={color} /> */}
        {/* <Text style={{ ...styles.tabBarLabel, color: color }}>
                    Messages
                  </Text>
                </View>
              ) : (
                <View style={styles.tabBarIcon}>
                  {/* <BoardIcon color={color} /> */}
        {/* <Text style={{ ...styles.tabBarLabel, color: color }}>
                    Messages
                  </Text>
                </View>
              );
            },
          }}   */}
        {/* /> */}
        <Tab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={styles.tabBarIcon}>
                {focused ? <SettingsSelected /> : <Settings />}
                <Text style={{ ...styles.tabBarLabel, color: color }}>
                  Profile
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default JobSeekerDashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  tabBarIcon: {
    alignItems: "center",
    justifyContent: "space-between",
    margin: 0,
    padding: 0,
  },
  tabBarLabel: {
    width: "100%",
    fontFamily: "outfit_semi_bold",
    fontSize: SIZES.xs,
    textAlign: "center",
    marginTop: SIZES.xxs / 2,
  },
});

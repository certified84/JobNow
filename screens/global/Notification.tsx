import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
} from "react-native";
import { Props } from "../../types";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { EmptyNotifications } from "../../assets/svg/Notification";

const NotificationsScreen: React.FC<Props> = ({ route, navigation }) => {
  const notifications: Notification[] = [];
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{ padding: 8, paddingStart: 0 }}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons
              name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: "center", marginEnd: 24 }}>
            <Text style={{ ...TYPOGRAPHY.h3 }}>Notifications</Text>
          </View>
        </View>
        {notifications.length <= 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center", marginBottom: 24 }}
          >
            <EmptyNotifications />
            <Text style={{ ...TYPOGRAPHY.h4, marginTop: 30, marginBottom: 4 }}>No Notifications</Text>
            <Text style={{ ...TYPOGRAPHY.p }}>
              You do not have any notifications yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={({ item, index }) => <View></View>}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
    marginHorizontal: SIZES.md,
  },
});

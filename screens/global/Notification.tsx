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
import {
  Briefcase,
  EmptyNotifications,
  Fingerprint,
  Password,
  Shield,
  Upload,
  Verification,
  Warning,
} from "../../assets/svg/Notification";
import { Notification } from "../../data/models/Norification";
import Header from "../../components/Header";
import { notifications } from "../../data/defaultData";

const NotificationsScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.innerContainer}>
        <Header title={"Notifications"} navigation={navigation} />

        {notifications.length <= 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <EmptyNotifications />
            <Text style={{ ...TYPOGRAPHY.h4, marginTop: 30, marginBottom: 4 }}>
              No Notifications
            </Text>
            <Text style={{ ...TYPOGRAPHY.p }}>
              You do not have any notifications yet
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            renderItem={({ item, index }) => (
              <NotificationComponent notification={item} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

interface NorificationProps {
  notification: Notification;
}

const NotificationComponent: React.FC<NorificationProps> = ({
  notification,
}) => {
  const icon = {
    upload: Upload,
    verification: Verification,
    job: Briefcase,
    warning: Warning,
    password: Password,
    security: Fingerprint,
    setup: Shield,
  };
  const Icon = icon[notification.type];
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        marginBottom: SIZES.md,
        marginHorizontal: SIZES.md,
        alignItems: "center",
      }}
    >
      <View style={{ ...styles.optionIconContainer }}>{<Icon />}</View>
      <View style={{ marginHorizontal: SIZES.sm }}>
        <Text style={{ ...TYPOGRAPHY.h4 }}>{notification.title}</Text>
        <Text
          style={{ ...TYPOGRAPHY.h5 }}
          ellipsizeMode="clip"
          numberOfLines={1}
        >
          {notification.description}
        </Text>
      </View>

      <View style={{ alignItems: "flex-end", justifyContent: "space-between" }}>
        <Text style={{ ...TYPOGRAPHY.p }}>{notification.time}</Text>
        {!notification.read && (
          <View
            style={{
              width: SIZES.xxs,
              height: SIZES.xxs,
              borderRadius: SIZES.md,
              backgroundColor: COLORS.primary,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    marginTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight! + SIZES.sm
        : SIZES.sm,
  },
  optionIconContainer: {
    padding: SIZES.md,
    borderRadius: 50,
    backgroundColor: "#F3F8FF",
  },
});

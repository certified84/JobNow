import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../theme";
import { MaterialIcons } from "@expo/vector-icons";
import { StackNavigation } from "../types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  navigation: StackNavigation;
  showBookmark?: boolean;
  showBack?: boolean;
  bookmarked?: boolean;
  onBookmarkPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  navigation,
  showBookmark,
  showBack = true,
  bookmarked,
  onBookmarkPress,
}) => (
  <View>
    <View style={styles.innerContainer}>
      <TouchableOpacity
        style={{ padding: 8, paddingStart: 0, opacity: showBack ? 1 : 0 }}
        onPress={() => navigation.goBack()}
        disabled={!showBack}
      >
        <MaterialIcons
          name={Platform.OS === "android" ? "arrow-back" : "arrow-back-ios"}
          size={24}
          color="black"
        />
      </TouchableOpacity>

      <Text style={{ ...TYPOGRAPHY.h3 }}>{title}</Text>

      <TouchableOpacity
        disabled={!showBookmark}
        onPress={onBookmarkPress}
        style={{ opacity: showBookmark ? 1 : 0, padding: 8, paddingEnd: 0 }}
      >
        <MaterialCommunityIcons
          name={bookmarked ? "bookmark" : "bookmark-outline"}
          size={24}
          color={bookmarked ? COLORS.primary : COLORS.black}
        />
      </TouchableOpacity>
    </View>
    <View style={styles.line} />
  </View>
);

export default Header;

const styles = StyleSheet.create({
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SIZES.md,
    justifyContent: "space-between",
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginBottom: SIZES.sm,
    marginTop: SIZES.xxs,
  },
});

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

interface HeaderProps {
  title: string;
  navigation: StackNavigation;
}

const Header: React.FC<HeaderProps> = ({ title, navigation }) => (
  <View>
    <View style={styles.innerContainer}>
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
        <Text style={{ ...TYPOGRAPHY.h3 }}>{title}</Text>
      </View>
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
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.lightGray,
    marginBottom: SIZES.sm,
    marginTop: SIZES.xxs,
  },
});

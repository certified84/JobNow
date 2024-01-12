import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";
import Header from "../../../components/Header";
import { Loader } from "../../../components/Loader";
import { StackParamList } from "../../../types";
import { RouteProp, NavigationProp } from "@react-navigation/native";

type ScreenRouteProp = RouteProp<StackParamList, "ProfileScreen">;
type NavProp = NavigationProp<StackParamList, "ProfileScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const ProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <Loader showLoader={false} />
      <View style={styles.innerContainer}>
        <Header
          title={"Profile"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />

        <TouchableOpacity
        activeOpacity={.5}
          style={styles.profileImageContainer}
        ></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  profileImageContainer: {
    alignSelf: "center",
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
    borderRadius: 100, 
    alignItems: 'center',
    justifyContent:'center'
  }
});

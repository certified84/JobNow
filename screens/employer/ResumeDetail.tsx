import {
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../theme";
import Header from "../../components/Header";
import { StackParamList } from "../../types";
import { RouteProp, NavigationProp } from "@react-navigation/native";
import { auth } from "../../firebase";

type ScreenRouteProp = RouteProp<StackParamList, "ResumeDetailScreen">;
type NavProp = NavigationProp<StackParamList, "ResumeDetailScreen">;

type Props = {
  route?: ScreenRouteProp;
  navigation?: NavProp;
};

const ResumeDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.container}>
        <Header
          title={"Resume"}
          navigation={navigation}
          showBack={true}
          showBookmark={false}
          bookmarked={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResumeDetailScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: SIZES.xs,
    borderWidth: 2,
    borderColor: "#CACACA",
    padding: SIZES.md,
    marginHorizontal: SIZES.md,
  },
});

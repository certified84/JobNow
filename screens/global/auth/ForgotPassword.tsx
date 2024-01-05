import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { TextInput } from "react-native-paper";
import { ActionButton, GoogleButton } from "../../../components/Buttons";
import { styles } from "./Login";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES, TYPOGRAPHY } from "../../../theme";

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin: SIZES.md }}>
        <Text
          style={{
            ...TYPOGRAPHY.h3,
            fontSize: SIZES.xl - 2,
            alignSelf: "center",
          }}
        >
          Forgot password?
        </Text>
        <Text
          style={{
            ...TYPOGRAPHY.p,
            marginTop: SIZES.md,
            alignSelf: "center",
          }}
        >
          Enter your email and we'll send you a reset link
        </Text>

        <TextInput
          mode="outlined"
          placeholder="Email"
          autoCorrect={false}
          theme={{ roundness: SIZES.xs }}
          style={[styles.inputField, { marginTop: SIZES.xl }]}
          activeOutlineColor={COLORS.primary}
          selectionColor={COLORS.primary}
          placeholderTextColor={"#ADADAF"}
          // textColor={COLORS.onSecondaryContainer}
        />

        <ActionButton
          style={{ width: "100%", marginTop: SIZES.lg }}
          buttonTitle={"Reset password"}
          buttonColor={COLORS.primary}
          textColor={COLORS.white}
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

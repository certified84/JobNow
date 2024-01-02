import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, SIZES } from "../theme";
import { AlertNotificationRoot } from "react-native-alert-notification";
import GlobalScreens from "./GlobalScreens";
import JobSeekerScreens from "./JobSeekerScreens";
import AuthStack from "./AuthStack";
import AuthScreens from "./AuthScreens";

const Stack = createStackNavigator();

const index = () => {
  // PUSH NOTIFICATION CONFIGURATION
  // ExpoPushNotificationConfig()

  return (
    <AlertNotificationRoot>
      <Stack.Navigator
        initialRouteName="OnboardingScreen"
        screenOptions={customScreenOptions}
      >
        {AuthScreens()}
        {GlobalScreens()}
        {JobSeekerScreens()}
        {/* {EmployerScreens()} */}
      </Stack.Navigator>
    </AlertNotificationRoot>
  );
};

export default index;

const customScreenOptions = {
  // headerTitleStyle: { ...customHeaderTitleStyle },
  headerBackTitle: " ",
  headerTintColor: COLORS.primary,
  headerStyle: {
    backgroundColor: COLORS.lightGray,
  },
};

export interface StackProps {
  customHeaderTitleStyle: {};
}

// export default function RootNavigation() {
//   const [user] = useAuthState(auth);

//   return user && user.emailVerified ? (
//     <MainStack customHeaderTitleStyle={customHeaderTitleStyle} />
//   ) : (
//     <AuthStack customHeaderTitleStyle={customHeaderTitleStyle} />
//   );
// }

const customHeaderTitleStyle = {
  fontFamily: "space-grotesk-medium",
  // fontWeight: 'bold',
  fontSize: SIZES.md,
  color: COLORS.black,
};

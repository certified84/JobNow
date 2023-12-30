import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../theme';
import { AlertNotificationRoot } from "react-native-alert-notification";
import GlobalScreens from './GlobalScreens';
import JobSeekerScreens from './JobSeekerScreens';


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
  headerBackTitle: ' ',
  headerTintColor: COLORS.primary,
  headerStyle: {
    backgroundColor: COLORS.lightGray,
  },
};

import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import {
  CompanyProfileScreen,
  EmployerDashboard,
  JobDescriptionScreen,
  PostJobScreen,
} from "../screens";

const Stack = createStackNavigator();

const EmployerScreens = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="CompanyProfileScreen"
        component={CompanyProfileScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="EmployerDashboard"
        component={EmployerDashboard}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="PostJobScreen"
        component={PostJobScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="JobDescriptionScreen"
        component={JobDescriptionScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export default EmployerScreens;

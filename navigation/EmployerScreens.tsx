import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import {
  ApplicationDetailScreen,
  CompanyProfileScreen,
  EmployerDashboard,
  JobDescriptionScreen,
  PostJobScreen,
  ResumeDetailScreen,
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
      <Stack.Screen
        name="ApplicationDetailScreen"
        component={ApplicationDetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ResumeDetailScreen"
        component={ResumeDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export default EmployerScreens;

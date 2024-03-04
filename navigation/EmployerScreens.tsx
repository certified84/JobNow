import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import {
  CompanyProfileScreen,
  EmployerDashboard,
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
    </Stack.Group>
  );
};

export default EmployerScreens;

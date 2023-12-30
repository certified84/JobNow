import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import { OnboardingScreen } from "../screens";

const Stack = createStackNavigator();

const GlobalScreens = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Group>
  );
};

export default GlobalScreens;

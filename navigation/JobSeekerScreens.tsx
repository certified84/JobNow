import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import { ExpertiseSelectionScreen, OnboardingScreen } from "../screens";

const Stack = createStackNavigator();

const JobSeekerScreens = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="ExpertiseSelectionScreen"
        component={ExpertiseSelectionScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export default JobSeekerScreens;

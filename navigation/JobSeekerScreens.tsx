import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import { ExpertiseSelectionScreen, JobSeekerHomeScreen, OnboardingScreen } from "../screens";

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
      <Stack.Screen
        name="JobSeekerHomeScreen"
        component={JobSeekerHomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export default JobSeekerScreens;

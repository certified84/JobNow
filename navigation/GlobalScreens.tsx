import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import { FAQScreen, ProfileScreen, NotificationsScreen, OnboardingContinueScreen, OnboardingScreen } from "../screens";

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
      <Stack.Screen
        name="OnboardingContinueScreen"
        component={OnboardingContinueScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FAQScreen"
        component={FAQScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export default GlobalScreens;

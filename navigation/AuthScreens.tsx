import { createStackNavigator } from "@react-navigation/stack";
import { COLORS, TYPOGRAPHY, SIZES } from "../theme";
import { EmployerSignupScreen, ForgotPasswordScreen, LoginScreen, SignupScreen } from "../screens";

const Stack = createStackNavigator();

const AuthScreens = () => {
  return (
    <Stack.Group>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EmployerSignupScreen"
        component={EmployerSignupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Group>
  );
};

export default AuthScreens;

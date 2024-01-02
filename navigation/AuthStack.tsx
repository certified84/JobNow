import { LogBox, View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  // AnimatedSplashScreen,
  OnboardingScreen,
  ForgotPasswordScreen,
  LoginScreen,
  SignupScreen,
} from "../screens";
import { COLORS } from "../theme";
import { StackProps } from ".";

const Stack = createStackNavigator();

const AuthStack: React.FC<StackProps> = ({ customHeaderTitleStyle }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerTitleStyle: { ...customHeaderTitleStyle },
          headerBackTitle: " ",
          headerTintColor: COLORS.black,
          title: " ",
          headerStyle: { backgroundColor: COLORS.white, height: 120 },
        }}
      >
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
          }}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;

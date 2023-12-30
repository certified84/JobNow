export type StackParamList = {
  ExpertiseSelectionScreen: {};
};

export type StackNavigation = StackNavigationProp<StackParamList>;

import { RouteProp, NavigationProp } from '@react-navigation/native';

type StackParamList = {
  ExpertiseSelectionScreen: undefined; // Add other screens here
};

type ScreenRouteProp = RouteProp<StackParamList, 'ExpertiseSelectionScreen'>;
type NavigationProp = NavigationProp<StackParamList, 'ExpertiseSelectionScreen'>;

type Props = {
  route: ScreenRouteProp;
  navigation: NavigationProp;
};

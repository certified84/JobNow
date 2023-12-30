export type StackNavigation = StackNavigationProp<StackParamList>;

import { RouteProp, NavigationProp } from '@react-navigation/native';

type StackParamList = {
  ExpertiseSelectionScreen: {};
  HomeScreen: {};
  NotificationsScreen: {};
};

type ScreenRouteProp = RouteProp<StackParamList, 'ExpertiseSelectionScreen'>;
type NavigationProp = NavigationProp<StackParamList, 'ExpertiseSelectionScreen'>;

type Props = {
  route: ScreenRouteProp;
  navigation: NavigationProp;
};

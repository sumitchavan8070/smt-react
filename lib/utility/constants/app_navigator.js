import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Alert } from 'react-native';

const Stack = createNativeStackNavigator();

class AppNavigator {
  static currentRoute = null;

  static navigatorRef = React.createRef();

  static push(routeName, params) {
    this._logRouteChange(routeName, params);
    this._navigateSafely(() => {
      this.navigatorRef.current?.navigate(routeName, params);
      this.currentRoute = routeName;
    });
  }

  static pop() {
    this._navigateSafely(() => {
      this.navigatorRef.current?.goBack();
      this.currentRoute = null;
    });
  }

  static popUntil(routeName) {
    this._navigateSafely(() => {
      while (this.navigatorRef.current?.canGoBack()) {
        this.navigatorRef.current?.goBack();
      }
      this.push(routeName);
    });
  }

  static pushAndRemoveUntil(routeName, predicate, params) {
    this._logRouteChange(routeName, params);
    this._navigateSafely(() => {
      this.navigatorRef.current?.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      });
      this.currentRoute = routeName;
    });
  }

  static pushReplacement(routeName, params) {
    this._logRouteChange(routeName, params);
    this._navigateSafely(() => {
      this.navigatorRef.current?.reset({
        index: 0,
        routes: [{ name: routeName, params }],
      });
      this.currentRoute = routeName;
    });
  }

  static _logRouteChange(routeName, params) {
    console.log(`Navigating to route: ${routeName} with params:`, params);
  }

  static _navigateSafely(navigationAction) {
    try {
      navigationAction();
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', 'An error occurred during navigation.');
    }
  }
}

export default AppNavigator;

// Usage in your App component
export const App = () => {
  return (
    <NavigationContainer ref={AppNavigator.navigatorRef}>
      <Stack.Navigator>
        {/* Define your screens here */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        {/* Add more screens as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

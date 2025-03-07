import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DashBoardScreen from './screens/dashBoard'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/registerScreen'
import * as firebase from "firebase";
import { firebaseConfig } from "./config";
import  './polyfills'


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="DashboardScreen" component={DashBoardScreen} />

    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
    <StackNav/>
    </NavigationContainer>
  );
}

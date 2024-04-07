import { createStackNavigator } from "@react-navigation/stack";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { styles } from "../theme/styles";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

interface Routes {
  name: string;
  screen: () => JSX.Element;
}

function MyStack() {
  // Usuario logueado o no
  const [isAuth, setIsAuth] = useState(false);

  // Pantalla de carga
  const [isLoading, setIsLoading] = useState(false);

  // Validar estado
  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuth(true);
      }
      setIsLoading(false);
    });
  }, []);

  // Rutas usuario no logeado
  const noAuthRoutes: Routes[] = [
    {
      name: "Welcome",
      screen: WelcomeScreen,
    },
    {
      name: "Login",
      screen: LoginScreen,
    },
    {
      name: "Register",
      screen: RegisterScreen,
    },
  ];

  // Rutas usuario logeado
  const authRoutes: Routes[] = [
    {
      name: "Profile",
      screen: ProfileScreen,
    },
  ];

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={35} />
        </View>
      ) : (
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          {!isAuth
            ? noAuthRoutes.map((item, index) => <Stack.Screen key={index} name={item.name} component={item.screen} />)
            : authRoutes.map((item, index) => <Stack.Screen key={index} name={item.name} component={item.screen} />)}
        </Stack.Navigator>
      )}
    </>
  );
}

function MyTabs() {
  // Rutas usuario logeado
  const authRoutes: Routes[] = [
    {
      name: "Profile",
      screen: ProfileScreen,
    },
  ];

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      {authRoutes.map((item, index) => (
        <Tab.Screen key={index} name={item.name} component={item.screen} />
      ))}
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

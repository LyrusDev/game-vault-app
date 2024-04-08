import { createStackNavigator } from "@react-navigation/stack";
import { CommonActions, createNavigationContainerRef, NavigationContainer, useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";
import { View } from "react-native";
import { ActivityIndicator, Icon } from "react-native-paper";
import { styles } from "../theme/styles";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GameNavigator from "../screens/HomeScreen/HomeNavigator";
import { set } from "firebase/database";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const navigationRef = createNavigationContainerRef();

interface Routes {
  name: string;
  label?: string;
  icon?: string;
  screen: () => JSX.Element;
}

function MyStack() {
  const navigation = useNavigation();
  // Usuario logueado o no
  const [isAuth, setIsAuth] = useState(false);

  // Pantalla de carga
  const [isLoading, setIsLoading] = useState(false);

  const [firstRoute, setFirstRoute] = useState("Welcome" as string);
  
  // Validar estado
  useEffect(() => {
    setIsLoading(true);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Usuario logeado");
        setFirstRoute("Tabs");
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

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={35} />
        </View>
      ) : (
        <Stack.Navigator initialRouteName={firstRoute} screenOptions={{ headerShown: false }}>
          {noAuthRoutes.map((item, index) => <Stack.Screen key={index} name={item.name} component={item.screen}/>)}
          {isAuth ? <Stack.Screen name="Tabs" component={AuthRoutes} />: null }
        </Stack.Navigator>
      )}
    </>
  );
}

function AuthRoutes() {
  const authRoutes: Routes[] = [
    {
      name: "Home",
      label: 'Inicio',
      icon: 'home',
      screen: GameNavigator,
    },
    {
      name: "Profile",
      label: 'Perfil',
      icon: 'account',
      screen: ProfileScreen,
    }
  ];

  return (
    <Tab.Navigator screenOptions={{ headerShown: false ,         tabBarStyle: { 
      backgroundColor: '#1C293A',
      borderTopColor: '#213651',
    },
    tabBarActiveTintColor: '#3C90EF',
    tabBarInactiveTintColor: 'gray',
   }}  >
      {authRoutes.map((item, index) => (
        <Tab.Screen key={index} name={item.name} component={item.screen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon source={item.icon} color={color} size={30}/>
          ),
        }}
 />
      ))}
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <MyStack />
    </NavigationContainer>
  );
}

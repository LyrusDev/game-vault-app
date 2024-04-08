import { createStackNavigator } from "@react-navigation/stack";
import GameScreen from "./GameScreen";
import GameDetailScreen from "./components/GameDetail";

const Stack = createStackNavigator();

interface Routes {
  name: string;
  label?: string;
  icon?: string;
  screen: () => JSX.Element;
}

const GameNavigator = () => {
  const gameRoutes: Routes[] = [
    {
      name: "Game",
      screen: GameScreen,
    },
    {
      name: "GameDetail",
      screen: GameDetailScreen,
    },
  ];

  return (

        <Stack.Navigator initialRouteName="Game" screenOptions={{ headerShown: false }}>
          {gameRoutes.map((item, index) => <Stack.Screen key={index} name={item.name} component={item.screen}/>)}
        </Stack.Navigator>
  );
}

export default GameNavigator;
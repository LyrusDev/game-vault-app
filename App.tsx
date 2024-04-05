import { StatusBar } from "expo-status-bar";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { PaperProvider } from "react-native-paper";
import RegisterScreen from "./src/screens/RegisterScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <LoginScreen />
    </PaperProvider>
  );
}

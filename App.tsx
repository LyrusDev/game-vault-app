import { StatusBar } from "expo-status-bar";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <WelcomeScreen />
    </PaperProvider>
  );
}

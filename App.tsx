import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

import "react-native-gesture-handler";
import MainNavigator from "./src/browser/MainNavigator";

export default function App() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <MainNavigator />
    </PaperProvider>
  );
}

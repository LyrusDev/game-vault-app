import { ImageBackground, View } from "react-native";
import React from "react";
import { styles } from "../theme/styles";
import { Button, Text } from "react-native-paper";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require("../../assets/bg-welcome.jpeg")} style={styles.imageBackground}>
      <View style={styles.containerWelcome}>
        <Text style={styles.titleWelcome}>GAME VAULT</Text>

        <Text style={styles.descriptionWelcome}>Un lugar en el que puedes encontrar tus videojuegos favoritos</Text>

        <Button mode="contained-tonal" style={styles.btnWelcome} onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Login" }))}>
          Empezar
        </Button>
      </View>
    </ImageBackground>
  );
}

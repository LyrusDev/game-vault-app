import { View } from "react-native";
import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.titleForm}>INICIAR SESIÓN</Text>

        <Text style={styles.subtitleForm}>Correo electrónico</Text>
        <TextInput mode="outlined" outlineColor="#fff" style={styles.inputForm} />
        <Text style={styles.subtitleForm}>Contraseña</Text>
        <TextInput mode="outlined" outlineColor="#fff" style={styles.inputForm} />

        <Button mode="elevated" textColor="#333" style={styles.btnForm}>
          Ingresar
        </Button>

        <View style={styles.containerNavForm}>
          <Text style={styles.textForm}>¿No tienes una cuenta?</Text>
          <Text style={styles.textNavForm}>Crear cuenta</Text>
        </View>
      </View>
    </View>
  );
}

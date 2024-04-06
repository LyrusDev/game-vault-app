import { View } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";

import { CommonActions, useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.titleForm}>CREA TU CUENTA</Text>

        <Text style={styles.subtitleForm}>Correo electrónico</Text>
        <TextInput mode="outlined" outlineColor="#fff" style={styles.inputForm} />
        <Text style={styles.subtitleForm}>Contraseña</Text>
        <TextInput mode="outlined" outlineColor="#fff" style={styles.inputForm} />

        <Button mode="elevated" textColor="#333" style={styles.btnForm}>
          Crear cuenta
        </Button>

        <View style={styles.containerNavForm}>
          <Text style={styles.textForm}>¿Ya tienes una cuenta?</Text>
          <Text style={styles.textNavForm} onPress={() => navigation.dispatch(CommonActions.goBack())}>
            Inicia sesión
          </Text>
        </View>
      </View>
    </View>
  );
}

import { View } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";

import { CommonActions, useNavigation } from "@react-navigation/native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebaseConfig";

interface RegisterData {
  email: string;
  password: string;
}

interface HasErrors {
  visible: boolean;
  text: string;
}

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const [emailHasErrors, setEmailHasErrors] = useState<HasErrors>({
    visible: false,
    text: "",
  });

  const [passwordHasErrors, setPasswordHasErrors] = useState<HasErrors>({
    visible: false,
    text: "",
  });

  const handlerSetRegisterData = (key: string, value: string) => {
    setRegisterData({
      ...registerData,
      [key]: value,
    });
  };

  const handlerRegisterData = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, registerData.email, registerData.email);

      console.log(response);
    } catch (error: any) {
      const errorCode = error.code;
      console.log("Error: " + error);
      
      switch (errorCode) {
        case "auth/invalid-email":
          setEmailHasErrors({
            visible: true,
            text: "El correo no es valido",
          });
        case registerData.password.length < 6:
          setPasswordHasErrors({
            visible: true,
            text: "La contraseña debe ser mayor a 6 caracteres",
          });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.titleForm}>CREA TU CUENTA</Text>

        <Text style={styles.subtitleForm}>Correo electrónico</Text>
        <TextInput
          mode="outlined"
          outlineColor="#fff"
          textColor="#fff"
          style={styles.inputForm}
          onChangeText={(value) => handlerSetRegisterData("email", value)}
          value={registerData.email}
        />
        <HelperText type="error" visible={emailHasErrors.visible}>
          {emailHasErrors.text}
        </HelperText>
        <Text style={styles.subtitleForm}>Contraseña</Text>
        <TextInput
          mode="outlined"
          outlineColor="#fff"
          textColor="#fff"
          style={styles.inputForm}
          secureTextEntry={showPassword}
          onChangeText={(value) => handlerSetRegisterData("password", value)}
          value={registerData.password}
          right={<TextInput.Icon icon="eye" color="#fff" onPress={() => setShowPassword(!showPassword)} />}
        />
        <HelperText type="error" visible={passwordHasErrors.visible}>
          {passwordHasErrors.text}
        </HelperText>

        <Button mode="elevated" textColor="#333" style={styles.btnForm} onPress={() => handlerRegisterData()}>
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

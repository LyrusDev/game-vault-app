import { View } from "react-native";
import React, { useState } from "react";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import { styles } from "../theme/styles";

import { CommonActions, useNavigation } from "@react-navigation/native";
import { auth } from "../configs/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

interface LoginData {
  email: string;
  password: string;
}

interface HasErrors {
  visible: boolean;
  text: string;
}

export default function LoginScreen() {
  const navigation = useNavigation();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(true);

  const [emailHasErrors, setEmailHasErrors] = useState<HasErrors>({
    visible: false,
    text: "El correo no es valido",
  });

  const [passwordHasErrors, setPasswordHasErrors] = useState<HasErrors>({
    visible: false,
    text: "La contraseña no es valida",
  });

  function emailHasErrorVisible(visible: boolean) {
    setEmailHasErrors({
      ...emailHasErrors,
      visible: visible,
    });
  }

  function passwordHasErrorVisible(visible: boolean) {
    setPasswordHasErrors({
      ...passwordHasErrors,
      visible: visible,
    });
  }

  const handlerSetLoginData = (key: string, value: string) => {
    setLoginData({
      ...loginData,
      [key]: value,
    });
  };

  const handlerLogin = async () => {
    if (!loginData.email) {
      emailHasErrorVisible(true);
    } else {
      emailHasErrorVisible(false);
    }

    if (!loginData.password) {
      passwordHasErrorVisible(true);
      return;
    } else {
      passwordHasErrorVisible(false);
    }

    try {
      const response = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

      // console.log(response);
      navigation.dispatch(CommonActions.navigate({ name: "Tabs" }));
    } catch (error: any) {
      console.log("Error: " + error);
      const errorCode = error.code;
      
      switch (errorCode) {
        case "auth/invalid-credential":
          emailHasErrorVisible(true);
          passwordHasErrorVisible(true);
      }
    }

    // console.log(loginData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Text style={styles.titleForm}>INICIAR SESIÓN</Text>

        <Text style={styles.subtitleForm}>Correo electrónico</Text>
        <TextInput
          mode="outlined"
          outlineColor="#fff"
          textColor="#fff"
          style={styles.inputForm}
          onChangeText={(value) => handlerSetLoginData("email", value)}
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
          onChangeText={(value) => handlerSetLoginData("password", value)}
          right={<TextInput.Icon icon="eye" color="#fff" onPress={() => setShowPassword(!showPassword)} />}
        />
        <HelperText type="error" visible={passwordHasErrors.visible}>
          {passwordHasErrors.text}
        </HelperText>

        <Button mode="elevated" textColor="#333" style={styles.btnForm} onPress={handlerLogin}>
          Ingresar
        </Button>

        <View style={styles.containerNavForm}>
          <Text style={styles.textForm}>¿No tienes una cuenta?</Text>
          <Text style={styles.textNavForm} onPress={() => navigation.dispatch(CommonActions.navigate({ name: "Register" }))}>
            Crear cuenta
          </Text>
        </View>
      </View>
    </View>
  );
}

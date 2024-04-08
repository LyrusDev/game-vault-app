import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Avatar, Button, Divider, IconButton, Modal, Portal, Text, TextInput } from "react-native-paper";

import firebase, { updateProfile } from "firebase/auth";

interface UserData {
  name: string;
}

export default function ProfileScreen() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState<UserData>({ name: "" });
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

  const [showModalProfile, setShowModalProfile] = useState(false);

  useEffect(() => {
    setUserAuth(auth.currentUser);

    setUserData({ name: auth.currentUser?.displayName ?? "" });
  }, []);

  const handlerUpdateProfileName = (key: string, value: string) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handlerUpdateProfile = async () => {
    await updateProfile(userAuth!, { displayName: userData.name });

    setShowModalProfile(false);
  };

  // logout
  const logout = () => {
    // auth.signOut();

    // navigation.navigate("Login");
    console.log("logout");
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerRow}>
          <Avatar.Image size={150} source={require("../../assets/avatar.png")} />

          <View style={{flex: 1, width: "100%"}}>
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>{userData.name}</Text>
            <Button mode="contained" style={styles.btnEdit} onPress={() => setShowModalProfile(true)} >
              Editar
            </Button>
          </View>
        </View>
      </View>

      <Portal>
        <Modal visible={showModalProfile} onDismiss={() => setShowModalProfile(false)} contentContainerStyle={styles.modalProfile}>
          <View style={styles.headerModalProfile}>
            <Text variant="titleMedium">Mi Perfil</Text>
            <IconButton icon="close" onPress={() => setShowModalProfile(false)} />
          </View>

          <Divider style={{ borderWidth: 0.5 }} />

          <View style={styles.containerForm}>
            <TextInput mode="outlined" label="Nombre" value={userData.name} onChangeText={(value) => handlerUpdateProfileName("name", value)} />
            <TextInput mode="outlined" label="Correo" value={userAuth?.email!} disabled />
            <Button mode="contained" onPress={() => handlerUpdateProfile()}>
              Actualizar
            </Button>
          </View>
        </Modal>
      </Portal>
    
      <View style={styles.containerDescription}>
        <Text style={styles.description}>Futuras actualizaciones!</Text>
      </View>

      <Button style={styles.btnLogout} mode="contained" onPress={logout}>
        <Text style={styles.txtBtnLogout}>Cerrar sesión</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#33333D",
  },

  containerHeader: {
    width: "100%",
    height: 270,
    backgroundColor: "#202126",
    justifyContent: "center",
  },

  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
    marginHorizontal: 20,
  },

  btnEdit: {
    marginTop: 10,
    borderRadius: 0,
    backgroundColor: "#5757575E",
    paddingVertical: 3,
    width: "60%",
  },

  modalProfile: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 30,
    margin: 40,
    borderRadius: 10,
  },

  headerModalProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  containerForm: {
    marginVertical: 20,
    gap: 10,
  },

  containerDescription: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  description: {
    color: "#fff",
    fontSize: 25,
  },

  btnLogout: {
    width: "100%",
    borderRadius: 0,
    bottom: 0,
    paddingVertical: 15,
    backgroundColor: "#202126",
  },

  txtBtnLogout: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#fff",
  },
});

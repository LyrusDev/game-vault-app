import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../configs/firebaseConfig";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

export default function ProfileScreen() {
  const navigation = useNavigation();

  // logout
  const logout = () => {
    auth.signOut();

    // redirect to welcome screen
    navigation.dispatch(CommonActions.navigate({ name: "Welcome" }));
  };

  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>

      <Button mode="contained" onPress={logout}>
        Logout
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

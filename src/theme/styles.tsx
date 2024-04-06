import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  // Welcome Screen
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },

  containerWelcome: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  titleWelcome: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 55,
  },

  descriptionWelcome: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 30,
  },

  btnWelcome: {
    width: "60%",
    paddingVertical: 5,
  },

  // Register y Login Screen
  container: {
    flex: 1,
    backgroundColor: '#404040',
    alignItems: "center",
    justifyContent: "center",
  },

  containerForm: {
    backgroundColor: "#111111",
    width: "80%",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 30,
  },

  titleForm: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
  },

  subtitleForm: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
  },

  inputForm: {
    backgroundColor: "#404040",
    marginTop: 5,
  },

  btnForm: {
    width: "100%",
    paddingVertical: 5,
    marginTop: 30,
    borderRadius: 10,
  },

  containerNavForm: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
},

  textForm: {
    color: "#fff",
    fontWeight: "bold",
  },

  textNavForm: {
    color: "#fff",
    textDecorationLine: "underline",
  }

});

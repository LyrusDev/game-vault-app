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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },

    titleWelcome: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 55,
    },

    descriptionWelcome: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        marginBottom: 30,
    },

    btnWelcome: {
        width: '60%',
        paddingVertical: 5,
    }
})
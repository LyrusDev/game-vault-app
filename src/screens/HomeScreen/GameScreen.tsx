import { FlatList, View } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Text } from "react-native-paper";
import GameCard from "./components/GameCard";
import Constants from 'expo-constants';
import NewGame from "./components/NewGame";
import { GameInfo } from "./models/HomeModel";
import { onValue, ref } from "firebase/database";
import { dbRealTime } from "../../configs/firebaseConfig";


const GameScreen = () => {
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  const [games, setGames] = useState<GameInfo[]>([])

  useEffect(() => {
    getAllGames()
  }, [])

  const getAllGames = () => {
    const dbRef = ref(dbRealTime, 'games')
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const getKeys = Object.keys(data)
      const listGames: GameInfo[] = []
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key}
        listGames.push(value)
      })
      setGames(listGames)
    })
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>GAME VAULT</Text>
          <FlatList
            data={games}
            style={styles.flatList}
            renderItem={({ item }) => <GameCard game={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
            keyExtractor={item => item.id.toString()}
          />
                <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowNewGameModal(true)}
      />
      <NewGame visible={showNewGameModal} setVisible={setShowNewGameModal} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#131D2A",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 55,
    alignSelf: "center",
    paddingVertical: 15,
  },
  flatList: {
     flex: 1,
  },
  btnWelcome: {
    width: "60%",
    paddingVertical: 5,
  },
  fab: {
    position: 'absolute',
    backgroundColor: "#3C90EF",
    margin: 16,
    right: 10,
    bottom: 10,
  },
});

export default GameScreen
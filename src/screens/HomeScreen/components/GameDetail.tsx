import { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image } from 'react-native'
import { Button, Checkbox, Icon, MD3Colors, Text, TextInput } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ref, remove, update } from 'firebase/database'
import { dbRealTime } from '../../../configs/firebaseConfig'
import { GameInfo, initGameForm, OS } from '../models/HomeModel'
import Constants from 'expo-constants';

const GameDetailScreen = () => {

  const navigation=useNavigation()
  const route = useRoute()
  //@ts-ignore
  const { game } = route.params
  const [ gameForm, setGameForm ] = useState<GameInfo>(initGameForm)

  useEffect(() => {
    setGameForm(game ?? initGameForm)
  }, [])

  const handleGameForm = (key: string, value: string) => {
    setGameForm({ ...gameForm, [key]: value })
  }

  const handleGameFormOS = (value: OS) => {
    if(gameForm.os.includes(value)){
      const newArray = gameForm.os.filter(osValue => osValue !== value);
      return setGameForm({...gameForm, os: newArray});
    }
    setGameForm({...gameForm, os: [...gameForm.os, value] });
  }

  const checkStatus = (os: OS) => {
    return gameForm.os.includes(os) ? 'checked' : 'unchecked'
  }

  const handlerUpdateLetter = async () => {
    const dbRef = ref(dbRealTime, 'games/' + gameForm.id)
    await update(dbRef, gameForm)
    navigation.goBack()
  }

  const handlerDeleteLetter = async ()=>{
    const dbRef = ref(dbRealTime, 'games/' + gameForm.id)
    await remove(dbRef)
    navigation.goBack()
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View>
        <Text style={styles.dateLabel}>{gameForm?.date}</Text>
      </View>
      <Text style={styles.label}>Nombre:</Text>
        <TextInput
          value={gameForm?.name}
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('name', value)}
        />
        <Text style={styles.label}>Imagen(URL):</Text>
        <Image source={{uri:game.img}} style={styles.image}/>
        <TextInput
          value={gameForm?.img}
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('img', value)}
        />
        <Text style={styles.label}>Precio:</Text>
        <TextInput
          value={gameForm?.price.toString()}
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('price', value)}
        />
        <Text style={styles.label}>Descuento:</Text>
        <TextInput
          value={gameForm?.discount.toString()}
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('discount', value)}
        />
        <Text style={styles.label}>Sistemas Operativos:</Text>
        <View style={styles.osContainer}>
          <View style={styles.checkBoxContainer}>
            <Icon source={OS.microsoft} color={MD3Colors.neutralVariant99} size={20}/>
            <Checkbox
              status={checkStatus(OS.microsoft)}
              color='#3C90EF'
              onPress={() => {handleGameFormOS(OS.microsoft)}}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <Icon source={OS.apple} color={MD3Colors.neutralVariant99} size={20}/>
            <Checkbox
              status={checkStatus(OS.apple)}
              color='#3C90EF'
              onPress={() => {handleGameFormOS(OS.apple)}}
            />
          </View>
          <View style={styles.checkBoxContainer}>
            <Icon source={OS.linux} color={MD3Colors.neutralVariant99} size={20}/>
            <Checkbox
              status={checkStatus(OS.linux)}
              color='#3C90EF'
              onPress={() => {handleGameFormOS(OS.linux)}}
            />
          </View>
        </View>
      <Button mode='contained' style={styles.buttonUpdate} icon='update' onPress={handlerUpdateLetter}>Actualizar</Button>
      <Button mode='contained' style={styles.buttonDelete} icon='trash-can' onPress={() => handlerDeleteLetter()}>Eliminar</Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer:{
    paddingTop: Constants.statusBarHeight + 8,
    flex:1,
    paddingHorizontal:20,
    backgroundColor:'#131D2A',
    gap:20
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 6,
    alignSelf: 'center',
    marginBottom: 10,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 6,
  },
  dateLabel: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '500',
    marginVertical: 10,
    alignSelf: 'center',
  },
  osContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: '#1C293A',
  },
  buttonUpdate: {
    backgroundColor: '#3C90EF',
    marginTop: 15,
    borderRadius: 10,
  },
  buttonDelete: {
    backgroundColor: '#FF0000',
    marginTop: 15,
    borderRadius: 10,
  }
});

export default GameDetailScreen
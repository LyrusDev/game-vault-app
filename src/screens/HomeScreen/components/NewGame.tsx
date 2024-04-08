import React, { useState } from 'react'
import { Button, Checkbox, Icon, IconButton, MD3Colors, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { View } from 'react-native'
import { push, ref, set } from 'firebase/database'
import { StyleSheet } from "react-native";
import { dbRealTime } from '../../../configs/firebaseConfig'
import { GameInfo, initGameForm, OS } from '../models/HomeModel';
import uuid from 'react-native-uuid';

interface Props {
  visible: boolean,
  setVisible: Function
}

const NewGame = ({ visible, setVisible }: Props) => {
  const [gameForm, setGameForm] = useState<GameInfo>(initGameForm)

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

  const handleSaveGame = async () => {
    if (!gameForm.name || !gameForm.img || !gameForm.price || !gameForm.discount || !gameForm.os.length) {
      return
    }
    const dbRef = ref(dbRealTime, 'games')
    const saveGame = push(dbRef)
    try{
      const newGameForm = {...gameForm, id: uuid.v4(), os: Array.from(gameForm.os)}
      await set(saveGame, newGameForm)

      setGameForm(initGameForm)
    }catch(e){
      console.log(e); 
    }
    setVisible(false)
  }

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modal} onDismiss={()=>setVisible(false)}>
        <View style={styles.headerModal}>
          <Text variant='headlineMedium' style={styles.title}>NUEVO JUEGO</Text>
          <IconButton icon='close' onPress={() => setVisible(false)} />
        </View>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('name', value)}
        />
        <Text style={styles.label}>Imagen(URL):</Text>
        <TextInput
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('img', value)}
        />
        <Text style={styles.label}>Precio:</Text>
        <TextInput
          contentStyle={styles.textInput}
          mode='outlined'
          cursorColor='#3C90EF'
          textColor='#A9A9A9'
          dense={true}
          onChangeText={(value) => handleGameForm('price', value)}
        />
        <Text style={styles.label}>Descuento:</Text>
        <TextInput
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
        <Button style={styles.button} mode='contained' onPress={() => handleSaveGame()}>Guardar</Button>
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal:{
    paddingHorizontal:20,
    paddingVertical:20,
    backgroundColor:'#131D2A',
    marginHorizontal:20,
    borderRadius: 10,
  },
  headerModal:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
    alignSelf: "center",
    paddingVertical: 15,
  },
  label: {
    color: "#fff",
    fontSize: 16,
    fontWeight: '400',
    marginVertical: 6,
  },
  textInput: {
    backgroundColor: '#1C293A',
  },
  osContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3C90EF',
    marginTop: 15,
    borderRadius: 10,
  }
});

export default NewGame
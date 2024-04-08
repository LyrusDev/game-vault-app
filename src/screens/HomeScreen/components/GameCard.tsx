import React from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { Text, Icon, MD3Colors } from 'react-native-paper'
import { StyleSheet } from "react-native";
import { CommonActions, useNavigation } from '@react-navigation/native'
import { GameInfo, OS } from '../models/HomeModel'


interface Props{
  game: GameInfo,
}

const GameCard = ({game}:Props) => {

  const navigation=useNavigation()

  const realPrice = game.price - (game.price * (game.discount / 100))
  
  const goToDetail = () => {
    navigation.dispatch(CommonActions.navigate({name:'GameDetail', params:{game}}))
  }

  return (
    <TouchableOpacity style={styles.contentLetter} onPress={goToDetail}>
        <View>
          <Image source={{uri:game.img}} style={styles.image}/>
          <Text style={styles.dateFont}>{game?.date}</Text>
        </View>
        <View style={styles.details}>
          <View style={{ flex: 1 }}>
          <Text style={styles.titleFont}>{game.name}</Text>
            <View style={styles.icons}>
              {game.os.includes(OS.microsoft) && <Icon source={OS.microsoft} color={MD3Colors.neutralVariant99} size={25} />}
              {game.os.includes(OS.apple) && <Icon source={OS.apple} color={MD3Colors.neutralVariant99} size={25} />}
              {game.os.includes(OS.linux) && <Icon source={OS.linux} color={MD3Colors.neutralVariant99} size={25} />}
            </View>
          </View>
            <View style={styles.priceContainer}>
              <View style={styles.discount}>
                <Text style={styles.titleFont}>-{game.discount}%</Text>
              </View>
              <View style={styles.priceDiscountContainer}>
                <Text style={styles.realPrice}>${game.price}</Text>
                <Text style={styles.price}>${realPrice.toFixed(2)}</Text>
              </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}
  const styles = StyleSheet.create({
    contentLetter:{
      backgroundColor:'#213651',
      flexDirection:'row',
      paddingHorizontal:10,
      paddingVertical:10,
      alignItems:'center',
      borderRadius: 6,
    },
    details:{
      flex:1,
      marginLeft:10,
      justifyContent:'space-around',
      marginVertical: 15,
    },
    icons: {
      flex: 1,
      flexDirection:'row',
    },
    priceContainer: {
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
    },
    image: {
      width: 100,
      height: 120,
      borderRadius: 6,
    },
    dateFont:{
      color:'#A9A9A9',
      fontSize:12,
      textAlign:'center',
      marginTop:5,
    },
    titleFont:{
      color:'#D3D3D3',
      fontSize:14,
      fontWeight:'400',
    },
    discount:{
      backgroundColor:'#4B6B23',
      padding:6,
      borderRadius: 6,
      fontWeight:'bold',
    },
    priceDiscountContainer: {
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center',
    },
    price: {
      color:'#A6BC5B',
      fontSize:18,
      fontWeight:'500',
    },
    realPrice: {
      color:'#A9A9A9',
      fontSize:16,
      fontWeight:'400',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
      paddingRight: 5,
    }
});

export default GameCard
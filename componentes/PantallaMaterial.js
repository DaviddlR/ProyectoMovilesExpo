import React from 'react'
import HeadButtons from './src/component/HeadButtons'
import Header from './src/component/Header'
import MaterialesButton from './src/component/MaterialesButton'
import MidButtons from './src/component/MidButtons'
import Constants from 'expo-constants'


const PantallaMaterial = () => {
  return(
    <View style={{ marinTop: Constants.statusBarHeight, flexGrow: 1}}>
      <Header></Header>
      <HeadButtons></HeadButtons>
      <MidButtons></MidButtons>
      <MaterialesButton></MaterialesButton>
    </View>

  )
}
export default PantallaMaterial;
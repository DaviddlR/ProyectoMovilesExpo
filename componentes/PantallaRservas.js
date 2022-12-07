import React from 'react'

import HeadButtons from './HeadButtons'
import Header from './src/component/Header'
import InstallationsButton from './src/component/InstallationsButton'
import MidButtons from './src/component/MidButtons'
import Constants from 'expo-constants'


const PantallaReservas = () => {
  return(
    <View style={{ marinTop: Constants.statusBarHeight, flexGrow: 1}}>
      <Header></Header>
      <HeadButtons></HeadButtons>
      <MidButtons></MidButtons>
      <InstallationsButton></InstallationsButton>
    </View>

  )
}
export default PantallaReservas;
import { Component } from "react"

import React, { useState } from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from "react-native-gesture-handler";

class MainMenu extends Component {
    
    
    render() {

        return(
            <View>
                <Text> Menu principal </Text>

                <TouchableOpacity onPress={this.handleOnPress}>
                    <Text >Quien ha iniciado sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }


    handleOnPress = () => {
        console.log(this.props.route.params)
        //console.log(this.props.navigation.state.params.usuario)
          
      }
}

export default MainMenu
import { Component } from "react"

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  Alert,
} from 'react-native';



class Login extends Component {
    
    constructor(props){
      // Required step: always call the parent class' constructor
      super(props);

      this.state = {
        email:"null",
        password:"null"
      }
      // https://snack.expo.dev/ 
      // this.props.navigation.setOptions({
      //   headerRight: () => (
      //     <Button onPress={() => this.props.navigation.navigate('MainMenu', {'usuario':"david"}) } title="Info"/>
      //   ),
      // });
    }
    
    render() {

        //const [email, setEmail] = useState('');
        //const [password, setPassword] = useState('');
        
        return (
            

            <View style={styles.container}>
                <Image source = {require("../imgs/logo.png")} style={styles.image}/>
        
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => this.setState({email})}
                    />
                </View>
        
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.TextInput}
                    placeholder="Contraseña"
                    placeholderTextColor="#003f5c"
                    onChangeText={(password) => this.setState({password})}
                    />
                </View>
        
                <TouchableOpacity onPress={this.handleOnPress} style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>
            
    
            </View>
    
            
        );
    }


    handleOnPress = () => {
      
      if(validarFormulario(this.state.email, this.state.password)){
        console.log('Login validado')
        this.props.navigation.navigate('MainMenu', {'usuario':this.state.email})
      } else {
        Alert.alert(
          "Error",
          "Email o contraseña no válidos",
          [
            {
              text: "Aceptar",
              //onPress: () => console.log("Ask me later pressed")
            }
          ]
        )
      }
        
    }

    

    
}

function validarFormulario(email, contraseña){

  const customData = require('../archivos/Flogin.json');

  for(var emailJSON in customData){
    if(emailJSON == email){
      if(customData[emailJSON] == contraseña){
        return true;
      }
    }
  }
  //console.log(customData)
  //TODO: Comprobar si email y contraseña son válidos
  return false;
}

export default Login



const styles = StyleSheet.create({
    container: {
    // flex = 1 ????
      backgroundColor: 'light-gray',
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    image: {
      marginBottom: 40,
      //width: 200,
      //resizeMode: 'contain'
    },

    inputView: {
      backgroundColor: "azure",
      borderRadius: 30,
      borderWidth: 2,
      borderColor: 'black',
      width: "70%",
      height: 45,
      marginBottom: 20,
      alignItems: "center",
    },
    
    TextInput: {
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
      flex:1,
      textAlign:"center",
    },

    loginBtn: {
      width: "80%",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      backgroundColor: "#003060",
    },

    loginText: {
      color: 'white'
    }
    
    });
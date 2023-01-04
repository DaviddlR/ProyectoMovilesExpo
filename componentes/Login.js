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

// import dataInstalaciones from '../archivos/reservasInstalacionesRealizadas.json'
// import dataMateriales from '../archivos/reservasMaterialRealizadas.json'

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
                    secureTextEntry={true}
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
        var datosEntrePantallas = conseguirDatos(this.state.email)
        this.props.navigation.navigate('MainMenu', datosEntrePantallas)
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




function conseguirDatos(email){
  console.log("------------------------------")
  // Leemos los ficheros
  let dataInstalaciones = require('../archivos/reservasInstalacionesRealizadas.json');
  let dataMateriales = require('../archivos/reservasMaterialRealizadas.json');

  console.log("instalaciones: ", dataInstalaciones)
  console.log("materiales: ", dataMateriales)

  // Creamos el diccionario
  var diccionario = {}
  diccionario['datosUsuario'] = {}
  diccionario['datosUsuario']['usuario'] = email
  diccionario['datosUsuario']['reservasInstalaciones'] = validarFecha(dataInstalaciones[email])
  diccionario['datosUsuario']['reservasMaterial'] = validarFecha(dataMateriales[email])

  console.log(diccionario)
  // console.log(dataInstalaciones)
  // console.log(dataInstalaciones[email][0])
  // console.log(dataInstalaciones[email][0]['Dia'])

  return diccionario
}

function validarFecha(data){
  let dataAux = data
  //console.log(dataAux)
  for (const i of dataAux){
       //console.log(dataAux[i])
       //console.log(i)
       if (new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() > i['Dia'] ){
           dataAux.splice(i,1)
       } else{
           if (new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() == i['Dia'] && new Date().getHours()+':'+new Date().getMinutes() > i["Hora"].split("-")[1]){
               dataAux.splice(i,1)
           }
       }
  }
  
  //console.log("--", dataAux)
  return dataAux
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
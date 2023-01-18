import { Component } from "react"

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';



class Login extends Component {
    
    // Constructor de la clase
    constructor(props){
      
      super(props);

      this.state = {
        email:"null",
        password:"null"
      }
      
    }
    
    render() {

        
        
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

    // Cuando se pulsa el botón para loguearse, hay que validar el formulario y comprobar que todo es correcto
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
              
            }
          ]
        )
      }
        
    }

    

    
}



// Funcion para conseguir los datos asociados al usuario
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
  //diccionario['datosUsuario']['reservasInstalaciones'] = validarFecha(dataInstalaciones[email])
  diccionario['datosUsuario']['reservasInstalaciones'] = dataInstalaciones[email]
  diccionario['datosUsuario']['reservasMaterial'] = dataMateriales[email]

  console.log(diccionario)
  

  return diccionario
}


// Función para validar los datos introducidos por el usuario
function validarFormulario(email, contraseña){

  const customData = require('../archivos/Flogin.json');

  for(var emailJSON in customData){
    if(emailJSON == email){
      if(customData[emailJSON] == contraseña){
        return true;
      }
    }
  }
  
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
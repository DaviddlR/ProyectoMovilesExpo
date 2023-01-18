import { Component } from "react"

import React  from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { FlatList } from "react-native-gesture-handler";

import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 


// Datos que contendrá el ListView
const dataSource = [
    { id: 1, title: '  Reservar' },
    { id: 2, title: '  Guardias' },
    { id: 999}
    
];


class MainMenu extends Component {

    // Constructor de la clase
    constructor(props) {
        super(props);

        this.state = {
                email:this.props.route.params.usuario,
        }
        
        // Parámetros de la cabecera
        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Login')}}>
                    <Text style={{color:'blue'}}>
                        ...
                        <Entypo name="log-out" size={40} color="white" />
                    </Text>
                </TouchableOpacity>
              
            ),
        });
        
        
    }
    
    
    render() {

        // Función que representa el item de la lista
        const Item = ({ id, title }) => (

            <TouchableOpacity onPress={this.handleOnPress.bind(this, id)} style={styles.item}>
                <Text style={styles.title}>
                    {id == 1? <AntDesign name="form" size={35} color="black" />: null }
                    {id == 2? <MaterialIcons name="local-police" size={35} color="black" />: null }
                    <Text numberOfLines={1}></Text>
                    {title}
                </Text>
            </TouchableOpacity>
        );

        // Función para renderizar el item
        const renderItem = ({ item }) => (
            <Item id={item.id} title={item.title} />
        );

        // Separador establecido
        const separatorItem = () => {
            return (
                <View style={styles.separator} />
            )
        }

        return(
            <View>
                <FlatList 
                    data={dataSource}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={separatorItem}
                />
            </View>
        );
    }

    // Cuando se pulsa una opción, se llama a esta función
    handleOnPress(idPantalla) {
        
        if(idPantalla == 1){
            console.log("Navegación hacia reservar")
            this.props.navigation.navigate('Instalaciones', this.props.route.params)
        }

        if(idPantalla == 2){
            console.log("Navegación hacia guardias")
            this.props.navigation.navigate('Guardias', this.props.route.params)
        }
          
    }
}

export default MainMenu

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: 'light-gray',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },

    separator:{
        //width: 300,
        height: 2,
        backgroundColor: '#d1d1d1'
    }
  });
import { Component } from "react"

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { FlatList } from "react-native-gesture-handler";


// Datos que contendrá el ListView
const dataSource = [
    { id: 1, title: 'Reservar' },
    
];


class MainMenu extends Component {

    constructor(props) {
        super(props);

        
        //dataSource.push({id:2, title:this.props.route.params.usuario});
        
    }
    
    
    render() {

        const Item = ({ id, title }) => (

            
            <TouchableOpacity onPress={this.handleOnPress.bind(this, id)} style={styles.item}>
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>

            // <View style={styles.item}>
            //   <Text style={styles.title}>{title}</Text>
            // </View>
        );

        const renderItem = ({ item }) => (
            <Item id={item.id} title={item.title} />
        );


        return(
            <View>
                <FlatList 
                    data={dataSource}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />

                
                {/* <Text> Menu principal </Text>  */}

                {/* <TouchableOpacity onPress={this.handleOnPress.bind(this, "a")}>
                    <Text >Quien ha iniciado sesión</Text>
                </TouchableOpacity>  */}
            </View>
        );
    }


    handleOnPress(parametro) {
        console.log(parametro)
        if(parametro == 1){
            console.log("Navegación hacia reservar")
            //this.props.navigation.navigate('PantallaReservas.js', {'usuario':this.state.email})
        }
        
        
        //console.log(this.props.route.params.usuario)
          
    }
}

export default MainMenu

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: 'gray',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
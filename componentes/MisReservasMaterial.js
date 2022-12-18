/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import  { Component } from 'react';
import { Button} from 'react-native';
import { FlatList } from "react-native-gesture-handler";

const dataSource = require('../archivos/reservasMaterialRealizadas.json');

class MisReservasMaterial extends Component {
    constructor(props) {
        super(props);

        this.state = {
        // data: dataSource[this.props.route.params.usuario]
           data: this.validarFecha(dataSource['mperez@gmail.com']),
        };
    }

    validarFecha(data){
       let dataAux = data
       console.log(dataAux)
       for (i in dataAux){
            console.log(dataAux[i])
            if (new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() > dataAux[i]['Dia'] ){
                dataAux.splice(i,1)
            } else{
                if (new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() == dataAux[i]['Dia'] && new Date().getHours()+':'+new Date().getMinutes() > dataAux[i]["Hora"].split("-")[1]){
                    dataAux.splice(i,1)
                }
            }
       }
       console.log(dataAux)
       return dataAux
    }


    render() {
        const Item = ({ id, Material, Hora, Dia, Cantidad }) => (

            <View style={styles.item}>
                <Text style={styles.title}>{Material}</Text>
                <Text style={styles.subtitle}> Dia: {Dia}</Text>
                <Text style={styles.subtitle}> Hora: {Hora}</Text>
                <Text style={styles.subtitle}> Unidades: {Cantidad}</Text>

                <TouchableOpacity
                              style={styles.cancelButton}
                              onPress={() =>
                                Alert.alert("Alerta","¿Quiene cancelar la reserva de "+ Material+" el día "+ Dia+ ", a la hora "+ Hora+ "?",[
                                    {text: 'Cancelar',onPress: () => console.log("Cancel Pressed"),style: "cancel"},
                                    {text:'OK',onPress: () => this.setState({data: this.state.data.filter(item => item.id !== id)})}
                                ]
                              )}>
                              <Text> Cancelar </Text>
                            </TouchableOpacity>
            </View>
        );

        const renderItem = ({ item }) => (
            <Item id={item.id} Material={item.Material} Dia={item.Dia} Hora={item.Hora} Cantidad ={item.Cantidad}/>

        );

        const ItemSeparatorView = () => {
            return (
              // Flat List Item Separator
              <View
                style={styles.itemSeparator}
              />
            );
          };

        return(
            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={ItemSeparatorView}

                />
            </View>
        );
    }
}



export default MisReservasMaterial

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: 'white',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    itemSeparator: {
      height: 0.5,
      width: '100%',
      backgroundColor: '#C8C8C8',
    },
    title: {
      fontSize: 32,
    },
    subtitle: {
      fontSize: 17,
    },
    cancelButton: {
     position: 'absolute',
     backgroundColor: 'red',
     right: '5%',
     top: '60%' }
  });



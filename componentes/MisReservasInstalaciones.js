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

const dataSource = require('../archivos/reservasInstalacionesRealizadas.json');

class MisReservasInstalaciones extends Component {
    constructor(props) {
        super(props);

        this.state = {
           //data: this.validarFecha(dataSource[this.props.route.params.usuario]),
           data: this.validarFecha(dataSource['mperez@gmail.com']),
        };
    }

    validarFecha(data){
       let dataAux = data
       for (const i of dataAux){
            console.log(dataAux[i])
            if (new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() > i['Dia'] ){
                dataAux.splice(i,1)
            } else{
                if (new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() == i['Dia'] && new Date().getHours()+':'+new Date().getMinutes() > i["Hora"].split("-")[1]){
                    dataAux.splice(i,1)
                }
            }
       }
        console.log(dataAux)
        return dataAux
    }

    render() {
        const Item = ({ id, Lugar, Hora, Dia }) => (
                //validarFecha(id, Lugar, Hora, Dia),
                console.log( new Date().getDate()+'/'+(new Date().getMonth()+1)+'/'+new Date().getFullYear() < Dia ),
                <View style={styles.item}>
                    <Text style={styles.title}>{Lugar}</Text>
                    <Text style={styles.subtitle}> Dia: {Dia}</Text>
                    <Text style={styles.subtitle}> Hora: {Hora}</Text>

                    <TouchableOpacity
                                  style={styles.cancelButton}
                                  onPress={() =>
                                    Alert.alert("Alerta","¿Quiene cancelar la reserva de "+ Lugar+" el día "+ Dia+ ", a la hora "+ Hora+ "?",[
                                        {text: 'Cancelar',onPress: () => console.log("Cancel Pressed"),style: "cancel"},
                                        {text:'OK',onPress: () => this.setState({data: this.state.data.filter(item => item.id !== id)})}
                                    ]
                                  )}>
                                  <Text style={styles.colorCancel}> Cancelar </Text>
                                </TouchableOpacity>
                </View>

        );

        const renderItem = ({ item }) => (
            <Item id={item.id} Lugar={item.Lugar} Dia={item.Dia} Hora={item.Hora} />

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



export default MisReservasInstalaciones

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
     top: '60%' },
    colorCancel:{
     color: 'white',
     fontSize: 17,
    }

  });



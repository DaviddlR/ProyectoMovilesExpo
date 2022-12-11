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
        // data: dataSource[this.props.route.params.usuario]
            data: dataSource['mperez@gmail.com'],
        };
    }


    render() {
        const Item = ({ id, Lugar, Hora, Dia }) => (

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
                              <Text> Cancelar </Text>
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
     top: '60%' }
  });



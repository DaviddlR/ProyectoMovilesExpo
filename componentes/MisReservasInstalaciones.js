/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';


import DropDownMenu from './DropDownMenu'


import  { Component } from 'react';

import { FlatList } from "react-native-gesture-handler";

class MisReservasInstalaciones extends Component {
    constructor(props) {
        super(props);
        this.state = {
           //data: this.validarFecha(dataSource[this.props.route.params.usuario]),
           data: this.validarFecha(this.props.route.params.datosUsuario['reservasInstalaciones'])
        };
    }

    validarFecha(data){
      let dataAux = data
        for (let i = dataAux.length-1; i>=0; i--){
             var currentDate = new Date()
             let stringDia= ""
             let stringMes = ""
             if (dataAux[i]["Dia"].split('/')[1].length == 1){
              stringMes = "-0"+dataAux[i]["Dia"].split('/')[1];
            } else {
              stringMes = "-"+dataAux[i]["Dia"].split('/')[1]
            }


            if (dataAux[i]["Dia"].split('/')[0].length == 1){
              stringDia = "-0"+dataAux[i]["Dia"].split('/')[0];
            } else {
              stringDia = "-"+dataAux[i]["Dia"].split('/')[0]
            }

             var reservaDate = new Date(stringDate =""+dataAux[i]["Dia"].split('/')[2]+ stringMes + stringDia +"T"+dataAux[i]["Hora"].split('-')[1]+":00.000Z")
             if (reservaDate < currentDate){
              dataAux.splice(i,1)
             }

        }
        return dataAux
    }

    render() {
        const Item = ({ id, Lugar, Hora, Dia }) => (
        //validarFecha(id, Lugar, Hora, Dia),
        
        <View style={styles.item}>
            <Text style={styles.title}>{Lugar}</Text>
            <Text style={styles.subtitle}> Dia: {Dia}</Text>
            <Text style={styles.subtitle}> Hora: {Hora}</Text>

            <TouchableOpacity
                          style={styles.cancelButton}
                          onPress={() =>
                            Alert.alert("Alerta","¿Quiene cancelar la reserva de "+ Lugar+" el día "+ Dia+ ", a la hora "+ Hora+ "?",[
                                {text: 'Cancelar',onPress: () => console.log("Cancel Pressed"),style: "cancel"},
                                {text:'OK',onPress: () => {
                                  this.setState({data: this.state.data.filter(item => item.id !== id)})
                                  this.props.route.params.datosUsuario['reservasInstalaciones'] = this.props.route.params.datosUsuario['reservasInstalaciones'].filter(item => item.id !== id)
                                }
                                }
                                
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
                <View style ={styles.row}>
                    <TouchableOpacity style={styles.headButtonNoSeleccionado}
                    onPress={() => this.props.navigation.navigate('Instalaciones',
                    this.props.route.params
                    )}
                            >
                      <Text style ={styles.headText}>Reservar</Text>
                    </TouchableOpacity>
                    <View style={styles.headButtonSeleccionado}
                            >
                      <Text style ={styles.headText}>Mis reservas</Text>
                    </View>
                </View>


                <View style ={styles.row}>
                    <View style={styles.midButton} >
                        <Text style ={styles.midText}>Reservas</Text>
                    </View>
                    <View style={styles.midButton}
                                >
                        <Text style ={styles.midText}>Instalaciones</Text>
                    </View>

                    <DropDownMenu params={this.props.route.params} misReservas={true}/>
                </View>


            <View>
                <FlatList
                    data={this.state.data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={ItemSeparatorView}

                />
            </View>
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
    },

    row:{
      flexDirection: 'row'
    },

    midButton: {
      flex: 1,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#DDF4FF',
      borderwidth: 4,
      borderColor: 'black',
    },

    midText: {
      color: 'black',
      fontSize: 16
    },

    headText: {
      color: 'white',
      fontSize: 20
    },

    headButtonSeleccionado: {
      flex: 1,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#02366B',
      borderBottomWidth: 5,
      borderColor: '#68BBE3'
    },
    
    headButtonNoSeleccionado: {
      flex: 1,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#02366B',
      borderBottomWidth: 5,
      borderColor: '#02366B'
    },

  });



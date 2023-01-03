/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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
import DropDownMenu from './DropDownMenu'



import  { Component } from 'react';
import { Button} from 'react-native';
import { FlatList } from "react-native-gesture-handler";

const dataSource = require('../archivos/reservasMaterialRealizadas.json');

class MisReservasMaterial extends Component {
    constructor(props) {
        super(props);

        this.state = {
          data: this.props.route.params.datosUsuario['reservasMaterial']
        };
    }

    validarFecha(data){
       let dataAux = data
       console.log(dataAux)
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
                          {text:'OK',onPress: () => {
                            this.setState({data: this.state.data.filter(item => item.id !== id)})
                            console.log("Cancelando...")
                          }
                            
                          }
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
                <View style ={styles.row}>
                   <TouchableOpacity style={styles.rButton}
                   onPress={() => this.props.navigation.navigate('Materiales',
                   this.props.route.params
                    )}
                           >
                      <Text style ={styles.rText}>Reservar</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.rButton}
                           >
                      <Text style ={styles.rText}>Mis reservas</Text>
                   </TouchableOpacity>
                </View>


                <View style ={styles.row}>
                   <TouchableOpacity style={styles.midButton} >
                       <Text style ={styles.midText}>Reservas</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.midButton}
                               >
                       <Text style ={styles.midText}>Materiales</Text>
                   </TouchableOpacity>
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
     top: '60%' },
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

      rText: {
        color: 'white',
        fontSize: 20
      },

      rButton: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02366B'
      }
  });



import { Component } from "react"

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

import { FlatList } from "react-native-gesture-handler";

const dataSource = require('../archivos/Fguardias.json');

class Guardias extends Component {
    
    constructor(props){
      // Required step: always call the parent class' constructor
      super(props);

      this.state = {

        dataGuardias: this.determinarGuardias()
      }
      
    }

    // Función para conseguir las guardias asociadas al usuario
    determinarGuardias(){

        var nombreUsuario = this.props.route.params.datosUsuario.usuario

        let dataAux = dataSource[nombreUsuario]
        
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

        const Item = ({ id, Clase, Hora, Dia }) => (
            //validarFecha(id, Lugar, Hora, Dia),
            
            <View style={styles.item}>
                <Text style={styles.title}>{Clase}</Text>
                <Text style={styles.subtitle}> Dia: {Dia}</Text>
                <Text style={styles.subtitle}> Hora: {Hora}</Text>
    
                
            </View>
    
            );

        const renderItem = ({ item }) => (
            <Item id={item.id} Clase={item.Clase} Dia={item.Dia} Hora={item.Hora} />
            

        );

        const ItemSeparatorView = () => {
            return (
                // Flat List Item Separator
                <View
                style={styles.itemSeparator}
                />
            );
        };
        
        return (
            
            <View>
                <Text style={styles.recursoName}>Mis guardias</Text>

                <View>
                    <FlatList
                        data={this.state.dataGuardias}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={ItemSeparatorView}

                    />
                </View>
            </View>

            
            
        );
    }


        
}


export default Guardias



const styles = StyleSheet.create({

    recursoName: {
        textAlign: "center",
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#DDF4FF',
    },


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
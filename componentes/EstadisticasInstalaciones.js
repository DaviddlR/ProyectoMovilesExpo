

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import  { Component } from 'react';
import { FlatList } from "react-native-gesture-handler";

const dataSource = require('../archivos/reservasInstalacionesRealizadas.json');
import {ImagesUser} from '../archivos/userImages.js';

class MisReservasInstalaciones extends Component {
    constructor(props) {
        super(props);


        this.state = {
           data: this.contarReservas(dataSource, this.props.route.params.nombreRecurso),
           
        };
    }

    // Función para contar las reservas asociadas al usuario
    contarReservas(data, instalacion) {
           let dataReturn = []
           let cont = 0
           for (i in data){
            cont += 1
            let contarHoraReservas = 0
            for (j in data[i]){
                if (data[i][j]["Lugar"] == instalacion){
                    contarHoraReservas += Number(data[i][j]["Hora"].split("-")[1].split(":")[0])-Number(data[i][j]["Hora"].split("-")[0].split(":")[0])
                }
            }
            dataReturn.push({id:cont, user: i, numHoras:contarHoraReservas})
           }

           return dataReturn
        }

    render() {
        const Item = ({ id, user, numHoras }) => (
                <View style={styles.item}>
                    <Image style={styles.imgUser}
                              source={ImagesUser[user]}
                    />
                    <View style={styles.textView}>
                        <Text style={styles.title}>{user.split('@')[0]}</Text>
                        <Text style={styles.subtitle}> Número Horas: {numHoras}</Text>
                    </View>
                </View>

        );

        const renderItem = ({ item }) => (
            <Item id={item.id} user={item.user} numHoras={item.numHoras} />

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
                <Text style={styles.recursoName}>Estadísticas {this.props.route.params.nombreRecurso}</Text>
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
      flexDirection: 'row'
    },
    recursoName: {
        textAlign: "center",
        fontSize: 26,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#DDF4FF',
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
    imgUser: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        left: 0,
    },
    textView:{
        marginHorizontal: 16,
        flexDirection: 'column'
    }

  });



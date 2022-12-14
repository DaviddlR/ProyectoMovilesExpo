import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Constants from 'expo-constants'
//import Head from './Component/Head'
//import ReservasButton from './Component/ReservasButton'

const data = [
    { id: 1, title: 'Biblioteca' },
    { id: 2, title: 'Sala de Ordenadores' },
    { id: 3, title: 'Gimnasio'  },
    { id: 4, title: 'Pista Exterior 1' },
    { id: 5, title: 'Pista Exterior 2' },
];

const Materiales =({navigation}) => {

    const Item = ({ title }) => (
          <TouchableOpacity style={styles.instalacionsButton}
                               onPress={() => navigation.navigate('ReservasRecurso', Item)} 
                                >
                   <Text style={styles.instalacionsText}>{title}</Text>               
          </TouchableOpacity>  
      );

   
    return(
        <View>
            <View style={{ marginTop: Constants.statusBarHeight, flexGrow: 1}}>
              <View style={styles.headLabelContainer}>
              <TouchableOpacity 
                onPress={() => {navigation.goBack()
                }}
                >
                <Text>
                  <AntDesign name='arrowleft' style={styles.Arrow} />
                </Text>
              </TouchableOpacity>

              <Text style={styles.AppName}>App</Text>
              </View>
          </View>


            <View style ={styles.row}>
               <TouchableOpacity style={styles.rButton}
                       >
                  <Text style ={styles.rText}>Reservas</Text>
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
                           //onPress={() => navigation.toggleDrawer()}
                           >
                   <Text style ={styles.midText}>Instalaciones</Text>
               </TouchableOpacity>
           </View>
          

            <FlatList 
                data={data}
                renderItem={({ item }) => {
                    console.log('Item: ', item)
                      return (
                    <Item 
                       id={item.id} title={item.title} 
                       
                       />
                     ) 
                         }}

                keyExtractor={item => item.id}
                
            />
        </View>
    );


}
      
const styles = StyleSheet.create({
instalacionsButton: {
  flex: 1,
  height: 100,
  alignItems: 'baseline',
  justifyContent: 'center',
  backgroundColor: 'white',
  padding: 10,
  marginBottom: 2
},

instalacionsText: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 30,
  marginLeft: 20
},

labelContainer:{
  height: 60,
  backgroundColor: '#003060',
  padding: 10,
  flexDirection: 'row'
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
},
AppName: {
  textAlign: "center",
  marginBottom: 10,
  fontSize: 26,
  color: 'white',
  fontWeight: 'bold',
  left: 140
},
Arrow: {
    color: 'white',
     fontSize: 40
},
headLabelContainer:{
    height: 60,
    backgroundColor: '#003060',
    padding: 10,
    flexDirection: 'row'
}
})
export default Materiales 
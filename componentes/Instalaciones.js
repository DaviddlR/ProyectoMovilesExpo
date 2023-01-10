import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import data from '../archivos/Instalaciones.json'
import DropDownMenu from './DropDownMenu'


const Instalaciones =({navigation}) => {

    const Item = ({ title, image }) => (
          // TODO: Cambiar usuario
          <TouchableOpacity style={styles.instalacionsButton}
          onPress={() => navigation.navigate('ReservasRecurso',
          {'usuario':'DAVID', 'nombreRecurso':title} 
          )} >
              <Image source={{image}} />
              <Text style={styles.instalacionsText}>{title}</Text>    

          </TouchableOpacity>  
      );

   
    return(
        <View>
            <View style ={styles.row}>
               <View style={styles.headButton}
                       >
                  <Text style ={styles.headText}>Reservas</Text>
               </View>
               <TouchableOpacity style={styles.headButton}
                       >
                  <Text style ={styles.headText}>Mis reservas</Text>
               </TouchableOpacity>
            </View>


            <View style ={styles.row}>
               <View style={styles.midButton} 
                        
               >
                   <Text style ={styles.midText}>Reservar</Text>
                   <View style={styles.midButton} 
                        
               >
                   <Text style ={styles.midText}>Materiales</Text>
               </View>
               </View>
               
               
               <DropDownMenu />

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
                    }
                }

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

headText: {
  color: 'white',
  fontSize: 20
},

headButton: {
  flex: 1,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#02366B'
}
})
export default Instalaciones 

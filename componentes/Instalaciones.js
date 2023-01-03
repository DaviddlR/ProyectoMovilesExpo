import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList, Image} from 'react-native';
import data from '../archivos/Instalaciones.json'
import DropDownMenu from './DropDownMenu'


const Instalaciones =({navigation, route}) => {
    console.log(route)
    //const user = route.params.datosUsuario['usuario']
    const Item = ({ title, image }) => (

          <TouchableOpacity style={styles.instalacionsButton}
          onPress={() => 
              
              //navigation.navigate('ReservarRecurso', {'usuario':route.params.datosUsuario['usuario'], 'nombreRecurso':title, 'instalacion': true})} >
              //navigation.navigate('ReservarRecurso', añadirParametros(title, true))} >
              navigation.navigate('ReservarRecurso', {'datosUsuario':{'usuario' : route.params.datosUsuario['usuario'], 'reservasInstalaciones' : route.params.datosUsuario['reservasInstalaciones'], 'reservasMaterial' : route.params.datosUsuario['reservasMaterial']}, 'nombreRecurso':title, 'instalacion': true})} >
              <Image source={{image}} />
              <Text style={styles.instalacionsText}>{title}</Text>    

          </TouchableOpacity>  
    );
   
    return(
        <View>
            <View style ={styles.row}>
               <TouchableOpacity style={styles.rButton}
                       >
                  <Text style ={styles.rText}>Reservar</Text>
               </TouchableOpacity>

               <TouchableOpacity style={styles.rButton}
               onPress={() => navigation.navigate('MisReservasInstalaciones',
                         //{'usuario':route.params.datosUsuario['usuario']}
                         route.params
                         )}
                       >
                  <Text style ={styles.rText}>Mis reservas</Text>
               </TouchableOpacity>
            </View>


            <View style ={styles.row}>
               <TouchableOpacity style={styles.midButton} 
                        
               >
                   <Text style ={styles.midText}>Reservar</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.midButton}
                           >
                   <Text style ={styles.midText}>Instalaciones</Text>
               </TouchableOpacity>

               <DropDownMenu params={route.params} misReservas={false} />

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
export default Instalaciones 
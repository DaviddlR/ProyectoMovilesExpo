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
               <View style={styles.headButtonSeleccionado}
                       >
                  <Text style ={styles.headText}>Reservar</Text>

               </View>

               <TouchableOpacity style={styles.headButtonNoSeleccionado}
               onPress={() => navigation.navigate('MisReservasInstalaciones',
                         //{'usuario':route.params.datosUsuario['usuario']}
                         route.params
                         )}
                       >
                  <Text style ={styles.headText}>Mis reservas</Text>
               </TouchableOpacity>
            </View>


            <View style ={styles.row}>
               <View style={styles.midButton} 
                        
               >
                   <Text style ={styles.midText}>Reservar</Text>
               </View>
               <View style={styles.midButton}
                           >
                   <Text style ={styles.midText}>Instalaciones</Text>
               </View>

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

miniBarra: {
  flex: 0.1,
  paddingTop: 1,
  height: 50,
  backgroundColor: 'red'
}
})
export default Instalaciones 
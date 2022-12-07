import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'


const MidButtons = () => {
    
      return(
        <View style ={styles.container}>
            <TouchableOpacity style={styles.button}
                                onPress={() => this.props.navigation.navigate('Reservas')}>
                <Text style ={styles.text}>Reservas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}
                                onPress={() => this.props.navigation.navigate('Instalaciones')}>
                <Text style ={styles.text}>Instalaciones</Text>
            </TouchableOpacity>
        </View>
      )
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'row',
        height: 1,
        backgroundColor: '#68BBE3'
        
    },
    button: {
        flex: 1,
        height: 30,
        alignItems: 'left',
        justifyContent: 'center',
        backgroundColor: '#68BBE3'
    }, 
    text: { 
       color: 'white',
       alignItems: 'center',
       fontSize: 15
    }
})    

export default MidButtons
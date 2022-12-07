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
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#68BBE3'
    }, 
    text: { 
       color: 'black',
       fontSize: 15
    }
})    

export default MidButtons

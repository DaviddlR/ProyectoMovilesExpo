import React from 'react';
import {Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'

const MaterialesButton = () => {
        return(
            <ScrollView>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Ordenadores')}
                                   >
                    <Text style={styles.text}>Ordenadores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Aros')}
                                   >
                    <Text style={styles.text}>Aros</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} 
                                  onPress={() => this.props.navigation.navigate('Conos')}
                                   >
                    <Text style={styles.text}>Conos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Voleibol')}
                                   >
                    <Text style={styles.text}>Voleibol</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Fútbol')}
                                   >
                    <Text style={styles.text}>Fútbol</Text>
                </TouchableOpacity>
            </ScrollView>
        )
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        height: 50,
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 20,
        
    },
   
    text: {
       color: 'black',
       fontWeight: 'bold',
       fontSize: 25,
       
     }
})
export default MaterialesButton
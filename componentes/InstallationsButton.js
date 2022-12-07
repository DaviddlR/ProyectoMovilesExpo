import React from 'react';
import {Text, TouchableOpacity, ScrollView, StyleSheet} from 'react-native'

const InstallationsButton = () => {
    
        return(
            <ScrollView ItemSeparatorComponent={() => <Text> </Text>} style={styles.container}>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Bibliotica')}
                                    >
                    <Text style={styles.text}>Bibliotica</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                    onPress={() => this.props.navigation.navigate('Sala de Ordenadores')}
                                    >
                    <Text style={styles.text}>Sala de Ordenadores</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Gimnasio')}
                                   >
                    <Text style={styles.text}>Gimnasio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Pista Exterior 1')}
                                   >
                    <Text style={styles.text}>Pista Exterior 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                                   onPress={() => this.props.navigation.navigate('Pisa Exterior 2')}
                                    >
                    <Text style={styles.text}>Pisa Exterior 2</Text>
                </TouchableOpacity>
            </ScrollView>
        )

    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        height: 30,
        
    },
    button: {
        flex: 1,
        height: 20,
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
 
export default InstallationsButton
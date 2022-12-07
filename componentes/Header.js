import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'

const Header = () => {
    
      return(
         <View style={styles.container}>
          <View style={styles.AppContainer}>
             <Text style={styles.AppText}>App</Text> 
           </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>AAA</Text>
            </TouchableOpacity>
            
        </View>
      )
    
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 30
    },
    AppContainer:{
        flex: 1,
        height: 30,
        backgroundColor: '#003060',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: { 
        height: 30,
        alignItems: 'baseline',
        justifyContent: 'center',
        backgroundColor: '#003060',
        padding: 10
    }, 
    AppText: { 
       color: 'white',
       fontSize: 25,
       fontWight: 'bold',
       alignItems: 'center',
       justifyContent: 'center'
    },
    text: { 
       color: 'white',
       fontSize: 15,
       justifyContent: 'center',
       
       
       }
})    

export default Header
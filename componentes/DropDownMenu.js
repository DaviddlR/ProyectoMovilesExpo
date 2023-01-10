import React, { useState, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Animated, Easing} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
const DropDownMenu = () => {
    const navigation = useNavigation();

    const [visible, setVisible] = useState(false);
    const options = [{ id: 1,
                       title: 'Instalaciones',
                       
                    },
                     {   id: 2,
                        title: 'Materiales',
                       
                    },
                    ];
    
    
    function comprobarBotonDropDown (options){
        console.log(options)
        if(options == 1){
                console.log("Navegacion a instalaciones")
                navigation.navigate('Instalaciones')
                
                }
                
        else if(options == 2){
                console.log("Navegacion a materiales")
                navigation.navigate('Materiales')
                
            }
    }

                        
    const scale = useRef(new Animated.Value(0)).current;
    function resizeBox(to){
        to == 1 && setVisible(true);
        Animated.timing(scale,{
            toValue:to,
            useNativeDriver:true,
            duration:200,
            easing:Easing.linear
        }).start(()=> (to == 0 ? setVisible(false) : null));
    }


    return (
        
        <>
        
            <TouchableOpacity style={styles.icon}
                              onPress={() => resizeBox(1)}>
                <Text> 
                   <AntDesign name="down" size={12} color="black" 
                                          style={{ backgroundColor: '#DDF4FF'
                                                   }} />
                </Text>
            </TouchableOpacity>
        
            <Modal transparent visible={visible}>
                <SafeAreaView style={{flex:1}}
                               onTouchStart={() => resizeBox(0)}
                               >
                    <Animated.View style={styles.popup}>
                       {options.map((opcion, i)=>(
                            <TouchableOpacity style={[styles.popupButton,{borderBottomWidth: i == options.length - 1 ? 0 : 1}]}
                                        key={i}
                                        onPress={() =>{
                                            // Comprobamos a dónde quiere ir el usuario
                                            comprobarBotonDropDown(opcion.id);
                                        }}
                                        
                                        >
                                <Text style={styles.popupText}>{opcion.title}</Text>
                            </TouchableOpacity>
                       ))}
                    </Animated.View>
                          
                </SafeAreaView>

            </Modal>
            
        </>
                       )
        
}


const styles = StyleSheet.create({
    popup:{
        borferRaduis:8,
        borderColor: "#333",
        borderWidth:1,
        backgroundcolor:"white",
        postition: 'absolute',
        top: 120,
        left: 200,
        height: 120,
        justifyContent: 'center'
    },
    popupButton: {
        flex:1,
        height: 30,
        justifyContent: 'center',  
        backgroundColor: 'white',
        paddingHorizontal: 10,
        
    },
    popupText:{
        color: 'black',
        fontSize: 16
    },
    icon: {
        height: 30,
        width: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#DDF4FF'
      },
      
})
export default DropDownMenu

import React, { useState, useRef } from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Animated, Easing} from 'react-native';

const DropDownMenu = () => {
    const [visible, setVisible] = useState(false);
    const options = [{ id: 1,
                       title: 'Instalaciones',
                       
                    },
                     {   id: 2,
                        title: 'Materiales',
                       
                    },
                    ];
    {/*
        handleOnPress (options)  
            {
                if(options.id == 1)
                    {
                        console.log(this.props)           
                        this.props.navigation.navigate('Instalaciones.js')
                     }
                        
                else(options.id == 2)
                    {
                        console.log(this.props)
                        this.props.navigation.navigate('Materiales.js')
                     }
            }
    */}
                        
    const scale = useRef(new Animated.Value(0)).current;
    function resizeBox(to){
        to == 1 && setVisible(true);
        Animated.timing(scale,{
            toValue:to,
            useNativeDriver:true,
            duration:200,
            easing:Easing.linear
        }).start(()=> to == 0 && setVisible(false));
    }
    return (
        
        <>
        
            <TouchableOpacity onPress={() => resizeBox(1)}>
                <Text>icon</Text>
            </TouchableOpacity>
        
            <Modal transparent visible={visible}>
                <SafeAreaView style={{flex:1}}
                               onTouchStart={() => resizeBox(0)}
                               >
                    <Animated.View style={styles.popup}>
                       {options.map((op, i)=>(
                            <TouchableOpacity style={[styles.popupButton,{borderBottomWidth: i == options.length - 1 ? 0 : 1}]}
                                        key={i}
                                        onPress={this.handleOnPress.bind(this, id)}
                                        
                                        >
                                <Text style={styles.popupText}>{op.title}</Text>
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
    }
})
export default DropDownMenu
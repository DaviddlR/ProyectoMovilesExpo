/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import { Component } from "react"
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
 } from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';

// Pantallas
import Login from './componentes/Login'
import MainMenu from './componentes/MainMenu'

import Guardias from './componentes/Guardias'

import Instalaciones from './componentes/Instalaciones'
import Materiales from './componentes/Materiales'
import ReservarRecurso from './componentes/ReservarRecurso'

import MisReservasInstalaciones from './componentes/MisReservasInstalaciones'
import MisReservasMaterial from './componentes/MisReservasMaterial'
import EstadisticasInstalaciones from './componentes/EstadisticasInstalaciones'
import EstadisticasMaterial from './componentes/EstadisticasMaterial'



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';



const Stack = createStackNavigator();


 export default class App extends Component {


    render() {
     return (

      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login'
        
        screenOptions={{
          title: "APP",
          headerTitleAlign: 'center',
          
          headerStyle: {
            backgroundColor: '#003060',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          // NO FUNCIONA -> status bar
          
        }}
        
        >

            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  headerTitle:"Inicio de sesión",
                }}
              />

              <Stack.Screen
                name="MainMenu"
                component={MainMenu}
                options={{
                  headerLeft: () => (
                    <TouchableOpacity
                      title="Exit"
                      color="#fff"
                    />
                  ),
                }}
              />

              <Stack.Screen
                name = "Guardias"
                component = {Guardias}
              />

              <Stack.Screen
                  name="Instalaciones"
                  component={Instalaciones}
                />

              <Stack.Screen
                name="Materiales"
                component={Materiales}
              />

              <Stack.Screen
                name="MisReservasInstalaciones"
                component={MisReservasInstalaciones}
              />

              <Stack.Screen
                  name="MisReservasMaterial"
                  component={MisReservasMaterial}
                />

              <Stack.Screen
                  name="ReservarRecurso"
                  component={ReservarRecurso}
                  options={{
                    headerRight: () => (
                      <TouchableOpacity
                        title="Estadisticas"
                        color="#fff"
                      />
                    ),
                  }}
                />

              <Stack.Screen
                name="EstadisticasMaterial"
                component={EstadisticasMaterial}
              />

               <Stack.Screen
                 name="EstadisticasInstalaciones"
                 component={EstadisticasInstalaciones}
               />

        </Stack.Navigator>

      </NavigationContainer>

     );


    }
  }


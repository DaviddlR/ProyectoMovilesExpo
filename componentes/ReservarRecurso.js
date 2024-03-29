import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert} from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

import { Ionicons } from '@expo/vector-icons';

const dataReservas = require('../archivos/reservasMaterialRealizadas.json');
const dataMaxMaterial = require('../archivos/Materiales.json');

const dataReservasInstalaciones = require('../archivos/reservasInstalacionesRealizadas.json')

// Función para reservar recurso (Pantalla 4)
export default function ReservarRecurso({route, navigation}){

  // Establecemos las variables globales
  var maxValueMaterial = !route.params.instalacion ? dataMaxMaterial.filter(item => item.title == route.params.nombreRecurso )[0]["cantidadMax"] : 0
  const title = route.params.nombreRecurso;

  const [time, setTime] = useState("hora_no_inicializada")
  const [day, setDay] = useState("fecha_no_inicializada");
  const [value, setValue] = useState(1);
  const [maxValue, setMaxValue] = useState(maxValueMaterial)
  const [maxValueAct, setMaxValueAct] = useState(maxValue)

  const [selected, setSelected] = useState(null);


  const[globalMarkedDates, setGlobalMarkedDates] = useState({})

  getSelectedDayEvents = date => {
    let markedDates = {};
    markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    setGlobalMarkedDates(markedDates)
  };

  // Configuración del calendario
  const [timeSlots, setTimeSlots] = React.useState([]);

  const createTimeSlots = (fromTime, toTime) => {
    let startTime = moment(fromTime, 'HH:mm')
    let endTime = moment(toTime, 'HH:mm')
    if (endTime.isBefore(startTime)){
      endTime.add(1, 'day');
    }
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format('HH:mm'));
      startTime.add(60, 'minutes');
    }
    return arr;
  };

  var botonDesactivado = false

  React.useEffect(() => {
    setTimeSlots(createTimeSlots('09:00', '14:00'));

    // Configuramos las opciones del header
    if (route.params.instalacion) {
      navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={()=>{
              
              navigation.navigate('EstadisticasInstalaciones', route.params)
            }}>
                <Text style={{color:'blue'}}>
                    ...
                    <Ionicons name="stats-chart" size={40} color="white" />
                </Text>
            </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={()=>{
              
              navigation.navigate('EstadisticasMaterial', route.params)
            }}>
                <Text style={{color:'blue'}}>
                    ...
                    <Ionicons name="stats-chart" size={40} color="white" />
                </Text>
            </TouchableOpacity>
        ),
      });
    }
  }, []);

    return(
      <View >
          <Text style={styles.recursoName}>Reservar {title}</Text>
              <Calendar style={[styles.calendar]}
              

                testId="dateTimePicker"
                value={new Date()}
                mode={day}
                display='defualt'
                dateFormat="dayofweek day month"
                onDayPress={day =>{
                  
                  stringMes = ""
                  stringDia = ""
                  
                  if (day['month'] < 10){
                    stringMes = "-0"+day['month'];
                  } else {
                    stringMes = "-"+day['month']
                  }
                  if (day['day'] < 10){
                    stringDia = "-0"+day['day'];
                  } else {
                    stringDia = "-"+day['day']
                  }
                  var currentDate = new Date()
                  var reservaDate = new Date(""+day['year']+ stringMes + stringDia +"T"+"00:00:00.000Z")
                  if (reservaDate < currentDate){
                    alertar("Fecha seleccionada Incorrecta", "La fecha seleccionada no puede ser anterior a la fecha actual")
                  } else {
                      
                      
                      setTime("hora_no_inicializada")
                      setMaxValueAct(maxValue)
                      setDay(day['day'] + "/" + day['month'] + "/" + day['year'])
                      getSelectedDayEvents(day.dateString);
                  }
                }
                }
                markedDates = {globalMarkedDates}
                
              />
              
              <View style={styles.hourRow}>
                {timeSlots.map((hora) => (
                  // Creamos los botones. Desactivamos aquellos para los que haya reservas
                  <TouchableOpacity disabled={hayReserva(dataReservas, dataReservasInstalaciones, route.params.nombreRecurso, hora)} key={hora}
                          

                      // Pulsa el botón de la hora
                      onPress={() =>{
                        
                        // Comprobamos si ha seleccionado un día
                        if(day == "fecha_no_inicializada"){
                          alertar("Selecciona un día", "Antes de seleccionar la hora, debes escoger un día")

                        } else {
                          setTime(hora)

                          // Ajustamos el estilo del botón
                          setSelected(hora)

                          // Comprobamos si ya hay una reserva para ese día y hora en caso de que sea un material (puede haber materiales libres que aún se pueden reservar)
                          if (!route.params.instalacion){
                            comprobarReservaHoraSeleccionada(dataReservas, route.params.nombreRecurso, hora )
                          }
                        } 

                      }}

                      style={[
                        estilarBoton(),
                        hora === selected && styles.hourSelected
                      ]}
                  >
                    <Text style={styles.hourButtonLabel}>
                      {hora} 
                    </Text>

                  </TouchableOpacity>
                ))}
                  
                  

              </View>

              {!route.params.instalacion &&
              <View style={styles.cantidadRow}>
              <>
                    <View style={styles.cantidadRow}>
                        <TouchableOpacity style = {styles.buttonRes}
                          onPress={() => {if(value > 1){
                            setValue(value - 1)
                            }}
                          }
                        >
                          <Text style={styles.textButton}>  -  </Text>
                        </TouchableOpacity>
                        <TextInput
                          style={styles.cantidadTextInput}
                          value={value.toString()}
                          onChangeText={text => {
                              const numberText = parseInt(text);
                              if (numberText >= 1 && numberText <= maxValueAct) {
                                
                                setValue(numberText);
                              }
                            }}
                          keyboardType='numeric'
                        />
                        <TouchableOpacity style={styles.buttonSum}
                          onPress={() =>
                            {if (value < maxValueAct){
                                setValue(value + 1)
                            }
                          }}
                        >
                          <Text style={styles.textButton}>  +  </Text>
                        </TouchableOpacity>
                    </View>
                    <Text>   Cantidad máxima: {maxValueAct}</Text>
                    </>
              </View>
              }

              <TouchableOpacity 
                  
                  onPress={() =>{

                    if(time == "hora_no_inicializada" || day == "fecha_no_inicializada"){
                      alertar("Error", "Debes escoger una fecha y hora")
                    } else {
                      Alert.alert("Alerta","Confirmación de reserva del recurso " + route.params.nombreRecurso + " del usuario "+ route.params.datosUsuario['usuario'] +" el día "+ day + ", a la hora "+ time + ".",[
                        {text:'OK',onPress: () =>{
                          if(route.params.instalacion){
                              añadirInstalacion(route.params.nombreRecurso, day, time)
                              navigation.navigate('MisReservasInstalaciones', route.params)
                              //navigation.navigate('MisReservasInstalaciones', {'usuario':route.params.usuario, 'fecha':day,'recurso':route.params.nombreRecurso,'hora':time})
                          } else {
                              añadirMaterial(route.params.nombreRecurso, day, time)
                              navigation.navigate("MisReservasMaterial", route.params)
                              //navigation.navigate('MisReservasMaterial', {'usuario':route.params.usuario, 'fecha':day,'recurso':route.params.nombreRecurso,'hora':time})
                          }
                        }
                          //a = 1
                        },
                        {text: 'Cancelar',onPress: () => console.log("Cancel Pressed")}]
                        )
                    }

                    
                      }}
                        style={styles.reservarButton} >
                <Text style={styles.reservarLabel}>Reservar</Text>
              </TouchableOpacity>
              
    </View>
           
    );

    

    function añadirInstalacion(nombre, dia, hora){
      console.log("Añadiendo instalacion...")
      
      var reservasActuales = route.params.datosUsuario['reservasInstalaciones']
      var numReservas = reservasActuales.length
      console.log(numReservas)

      reservasActuales[numReservas] = {}
      reservasActuales[numReservas]['Dia'] = dia
      reservasActuales[numReservas]['Hora'] = hora+"-"+(Number(hora.split(":")[0])+1)+":"+hora.split(":")[1]
      reservasActuales[numReservas]['Lugar'] = nombre
      reservasActuales[numReservas]['id'] = numReservas+1

      route.params.datosUsuario['reservasInstalaciones'] = reservasActuales

      delete route.params.nombreRecurso
      delete route.params.instalacion
    }

    function añadirMaterial(nombre, dia, hora){
      console.log("Añadiendo material...")

      
      var reservasActuales = route.params.datosUsuario['reservasMaterial']
      var numReservas = reservasActuales.length
      console.log(numReservas)

      reservasActuales[numReservas] = {}
      reservasActuales[numReservas]['Cantidad'] = value  //TODO
      reservasActuales[numReservas]['Dia'] = dia
      reservasActuales[numReservas]['Hora'] = hora+"-"+(Number(hora.split(":")[0])+1)+":"+hora.split(":")[1]
      reservasActuales[numReservas]['Material'] = nombre
      reservasActuales[numReservas]['id'] = numReservas+1

      route.params.datosUsuario['reservasMaterial'] = reservasActuales

      delete route.params.nombreRecurso
      delete route.params.instalacion
    }

    // Función para comprobar el número máximo de materiales que se pueden reservar
    function comprobarReservaHoraSeleccionada(data,nombre,time){
       let cont = 0
       for (let i in data){
        for (let j in data[i]){
            if (data[i][j]["Material"] == nombre && data[i][j]["Hora"].split("-")[0] == time && data[i][j]["Dia"] == day ){
                cont += data[i][j]["Cantidad"]
                //setMaxValue(maxValue - data[i][j]["Cantidad"])
             }
        }
       }
       setMaxValueAct(maxValue - cont)
    }

    // Fución para comprobar si ya hay una reserva para el día y hora seleccionados
    function hayReserva(dataMateriales, dataInstalaciones, nombre, hora){
      

      if(route.params.instalacion){
        
        // Comprobamos instalaciones
        for (let i in dataInstalaciones){
          for (let j in dataInstalaciones[i]){
              if (dataInstalaciones[i][j]["Lugar"] == nombre && dataInstalaciones[i][j]["Dia"] == day && dataInstalaciones[i][j]["Hora"].split("-")[0] == hora ){
                  
                  // Se ha localizado una reserva. Deshabilitamos botón
                  //setBotonDesactivado(false)
                  botonDesactivado = true
                  return true

              }
          }
       }
      } else {
        // Comprobamos materiales
        
        let contador = 0
        for (let i in dataMateriales){
          for (let j in dataMateriales[i]){
              
              if (dataMateriales[i][j]["Material"] == nombre && dataMateriales[i][j]["Dia"] == day && dataMateriales[i][j]["Hora"].split("-")[0] == hora ){
                  // Se ha localizado una reserva
                  // Comprobamos si aún queda alguno disponible
                  contador += dataMateriales[i][j]["Cantidad"]
                  if(contador >= maxValue){
                    botonDesactivado = true
                    return true
                  }
              }
          }
        }
      }

      return false
    }

    // Función para estilar un botón como "activado" o "desactivado"
    function estilarBoton(){
      if(botonDesactivado){
        botonDesactivado = false
        return styles.hourButtonDesactivado
      } else {
        return styles.hourButton
      }
      
    }

    function alertar(titulo, descripcion){
      Alert.alert(
        titulo,
        descripcion,
        [
          {
            text: "Aceptar",
          }
        ]
      )
    }
}  
 


const styles = StyleSheet.create({
  calendar: {
    calendarWidth: 260,
    height: 300,
    marginBottom: 25,
  },

  reservarButton: {
    padding: 16,
    backgroundColor: "#003060",
    alignSelf: "center",
    marginTop: 10,
    textAlign: 'center',
    width: 110,
  },

  reservarLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    textAlign: 'center'
  },
  
  itemLabelContainer:{
    backgroundColor: '#003060',
    padding: 10
 },
  
 recursoName: {
    textAlign: "center",
    fontSize: 26,
    color: 'black',
    fontWeight: 'bold',
    backgroundColor: '#DDF4FF',
  },

  hourRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  hourButton: {
    padding: 16,
    backgroundColor: "#0394DB",
    alignSelf: "flex-start",
    marginRight: 10,
    marginBottom: 25,
    marginLeft: 18,
    textAlign: 'center',
    width: 95
  },

  hourButtonDesactivado: {
    padding: 16,
    backgroundColor: "gray",
    alignSelf: "flex-start",
    marginRight: 10,
    marginBottom: 25,
    marginLeft: 18,
    textAlign: 'center',
    width: 95
  },

  hourSelected: {
    backgroundColor: "#055C9D",
    shadowOpacity: 0,
    borderWidth: 0,
  },

  hourButtonLabel: {
    fontSize: 18,
    fontWeight: "500",
    color: "white",
    textAlign: 'center'
  },

  hourSelectedLabel: {
    color: "white",
  },

  hourLabel: {
    textAlign: "left",
    marginBottom: 10,
    fontSize: 18,
    marginLeft: 20,
    color: 'white'
  },
  buttonSum:{
    backgroundColor: "green",
  },
  buttonRes:{
    backgroundColor: "red",
  },
  textButton:{
    textAlign: 'center',
    color: 'white'
  },
  cantidadTextInput:{
    width: 50,
    textAlign: 'center',

  },
   cantidadRow: {
      flexDirection: "row",
      alignSelf:"center"
   }

});

  
  
 LocaleConfig.locales['fr'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sept', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
 dayNamesShort: ['D.', 'L.', 'M.', 'X.', 'J.', 'V.', 'S.'],
 today: "Este Dia"
};
LocaleConfig.defaultLocale = 'fr';
 



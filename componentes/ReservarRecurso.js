import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';

import { Ionicons } from '@expo/vector-icons';


// Función para reservar recurso (Pantalla 4)
export default function ReservarRecurso({route, navigation}){

  

  // Establecemos las constantes
  const {title} = route.params.nombreRecurso;

  const [time, setTime] = useState()
  const [day, setDay] = useState("datee");
  const [mode, setMode] = useState('day')

  const[globalMarkedDates, setGlobalMarkedDates] = useState({})

  getSelectedDayEvents = date => {
    let markedDates = {};
    markedDates[date] = { selected: true, color: '#00B0BF', textColor: '#FFFFFF' };
    let serviceDate = moment(date);
    serviceDate = serviceDate.format("DD.MM.YYYY");
    setGlobalMarkedDates(markedDates)
  };

  // TODO: Creo que las dos funciones siguientes no sirven para nada
  const onChange = (event, selectedDate) => {
    const currentDay = selectedDate || day;
    setDay(currentDay);

    let tempDate = new Date(currentDay);
    let fDate =tempDate.getDay();
    console.log(fDate)
  }
  
  const showMode = (currentMode) => {
   setMode(currentMode);
  }

  // Configuración del calendario
  const [timeSlots, setTimeSlots] = React.useState([]);
  const createTimeSlots = (fromTime, toTime) => {
    let startTime = moment(fromTime, 'hh:mm')
    let endTime = moment(toTime, 'hh:mm')
    if (endTime.isBefore(startTime)){
      endTime.add(1, 'day');
    }
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format('hh:mm'));
      startTime.add(60, 'minutes');
    }
    return arr;
  };


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
          //<Button onPress={() => this.props.navigation.navigate('MainMenu', {'usuario':"david"}) } title="Info"/>
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
          //<Button onPress={() => this.props.navigation.navigate('MainMenu', {'usuario':"david"}) } title="Info"/>
        ),
      });
    }

    

  }, []);

       return(
        <View >
            <Text style={styles.recursoName}>{title}</Text>
               <Calendar style={[styles.calendar]}
               

                  testId="dateTimePicker"
                  value={new Date()}
                  mode={day}
                  display='defualt'
                  dateFormat="dayofweek day month"
                  onDayPress={day =>{
                    // IMPORTANTE: Es posible que haya que modificar el formato de la fecha
                    console.log(day)
                    setDay(day['day'] + "/" + day['month'] + "/" + day['year']) 
                    getSelectedDayEvents(day.dateString);
                  }
                  }
                  markedDates = {globalMarkedDates}
                  
                />
               
                <View style={styles.hourRow}>
                  {timeSlots.map((time) => (
                    <TouchableOpacity style={styles.hourButton} key={time}
                        //onDateChange={(time) => this.setState({time})}
                        onPress={() =>{ setTime(time) }}
                    >
                      <Text style={styles.hourButtonLabel}>
                        {time} 
                      </Text>

                    </TouchableOpacity>
                  ))}
                    
                    

                </View>

                <TouchableOpacity 
                    
                    onPress={() =>
                      Alert.alert("Alerta","confirmanción de reserva del recurso " + route.params.nombreRecurso + " del usuario "+ route.params.datosUsuario['usuario'] +" el día "+ day + ", a la hora "+ time,[
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
                        )} 
                          style={styles.reservarButton} >
                  <Text style={styles.reservarLabel}>Reservar</Text>
                </TouchableOpacity>
                
      </View>
           
    );

    function añadirInstalacion(nombre, dia, hora){
      console.log("Añadiendo instalacion...")
      
      reservasActuales = route.params.datosUsuario['reservasInstalaciones']
      numReservas = reservasActuales.length
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

      console.log(hora)
      console.log(Number(hora.split(":")[0])+1)
      reservasActuales = route.params.datosUsuario['reservasMaterial']
      numReservas = reservasActuales.length
      console.log(numReservas)

      reservasActuales[numReservas] = {}
      reservasActuales[numReservas]['Cantidad'] = 33  //TODO
      reservasActuales[numReservas]['Dia'] = dia
      reservasActuales[numReservas]['Hora'] = hora+"-"+(Number(hora.split(":")[0])+1)+":"+hora.split(":")[1]
      reservasActuales[numReservas]['Material'] = nombre
      reservasActuales[numReservas]['id'] = numReservas+1

      route.params.datosUsuario['reservasMaterial'] = reservasActuales

      delete route.params.nombreRecurso
      delete route.params.instalacion
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
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
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
 



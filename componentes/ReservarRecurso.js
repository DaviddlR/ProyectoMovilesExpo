import React, {useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Calendar, LocaleConfig} from 'react-native-calendars'
import moment from 'moment'

export default function ReservarRecurso({route}){
  const {title} = route.params;
  //const [time, setTime] = useState(Time)
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
  }, []);

       return(
        <View >
            
               <Calendar style={[styles.calendar]}
                 onDateChange={(date) => this.setState({date})}
                 onDayPress={setDate => {
                  console.log(setDate)
                  ;
                  }}  
                  markedDates={{
                    'setDate': {selected: true, marked: true},
                   // '2022-12-17': {marked: true},
                   // '2022-12-18': {disabled: true}
                  }} 
               />
               
                <View style={styles.hourRow}>
                  {timeSlots.map((item) => (
                    <TouchableOpacity style={styles.hourButton}
                        onDateChange={(Time) => this.setState({Time})}
                        onPress={Time => {
                        console.log(Time)                      
                        }} 
                    >
                      <Text style={styles.hourButtonLabel}>
                        {item} 
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TouchableOpacity 
                    //onPress={this.handleOnPress} 
                    style={styles.reservarButton}>
                  <Text style={styles.reservarLabel}>Reservar</Text>
                </TouchableOpacity>
                <Text style={styles.InstalationsName}>{title}</Text>
      </View>
           
    );
}  
 
handleOnPress = () => {
      
  if(validarFormulario(this.state.date, this.state.time)){
    console.log('reserve')
    this.props.navigation.navigate('MisReservas', 
    {'usuario':this.state.email}, item, date, time)
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
  
 InstalationsName: {
    textAlign: "center",
    fontSize: 20,
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
 



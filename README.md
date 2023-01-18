# README

En este documento se incluye toda la información relacionada con la aplicación desarrollada, incluyendo cuáles son las pantallas creadas y cómo interactuar con las mismas.

## Acceso
A continuación se incluye el enlace al código de la aplicación en Github. Adjuntamos también el enlace al proyecto Jira para la gestión de tareas. El primer Scum Master fue Estrella, el siguiente David y por último Saja.

- Enlace a Github: https://github.com/DaviddlR/ProyectoMovilesExpo.git 
- Enlace a Jira: https://mevr0003.atlassian.net/jira/software/projects/PM/boards/2 

## Equipo de trabajo
El equipo de trabajo está formado por tres personas:
- David de la Rosa de la Rosa (drr00025@red.ujaen.es)
- María Estrella Vallecillo Rodríguez (mevr0003@red.ujaen.es)
- Saja Saad Roomi Alshihmani (ssa00020@red.ujaen.es)

Tal y como se aprecia en el proyecto Jira, los tres miembros del equipo hemos mantenido una carga de trabajo similar.

## Pantallas principales
A continuación se describen las pantallas principales de la aplicación.

### **1. Pantalla "Login"**

La pantalla del login es la primera pantalla que verá cualquier usuario que inicie la aplicación por primera vez.

En ella aparecerán dos campos de texto, "email" y "password" y un botón "ENTRAR". El usuario deberá escribir su email y contraseña asignados para poder entrar a la aplicación. En caso de que las credenciales introducidas por el usuario no concuerden con ningún usuario registrado en la base de datos, aparecerá una ventana emergente indicando que hay un error en los datos. Si las credenciales son correctas, el usuario pasará automáticamente a la siguiente pantalla.

### **2. Pantalla "Menú principal"**
El menú principal será la segunda pantalla que verá el usuario. En ella, aparecerá una lista con las tareas que se puede hacer en la aplicación. Para nuestro caso, únicamente está implementado el bloque de "Reservar". La opción de "Guardias" no estará disponible.

En la esquina superior izquierda aparecerá un botón para cerrar la sesión actual.

### **3. Pantalla "Reservar"**
En esta pantalla se plasma todo lo que el usuario necesita para reservar una instalación o recurso del centro educativo. A modo de lista, se presentarán todas las intalaciones que se pueden reservar. 

En la barra superior, representada con el color azul claro, podrá elegir entre reservar instalaciones (Biblioteca, Sala de ordenadores, Gimnasio...) o materiales (Ordenadores, Aros, Conos...).

La barra superior representada con el color azul oscuro permitirá cambiar de la pantalla "Reservar" a la pantalla "Mis reservas" (pantalla 5 en este documento).

### **4. Pantalla "Reservar recurso"**
A esta pantalla se accede tras pulsar un elemento de la lista de instalaciones o materiales que se pueden reservar.

En el área central aparecerá un calendario para seleccionar el día en el que se quiere hacer la reserva y seis botones que indican las horas que se pueden escoger. Además, en caso de que el recurso seleccionado sea un material, se indicará en la parte inferior el número de unidades disponibles y el número que se desea reservar.

En esta pantalla se han implementado un conjunto de restricciones que es importante resaltar:
- No se puede reservar un recurso sin haber seleccionado un día y una hora.
- No se puede seleccionar una hora sin haber seleccionado previamente un día.
- No se puede seleccionar un día en el calendario anterior al día actual.
- En caso de que otro usuario (o el mismo usuario) haya realizado una reserva para ese mismo día del mismo recurso, los botones de las horas ocupadas aparecerán de color gris, impidiendo ser seleccionados. Si la reserva es de un material, el número máximo de materiales que se pueden reservar puede verse reducido según el número de materiales que haya reservado el otro usuario.

Por otro lado, en la esquina superior derecha aparecerá un botón que representará las estadísticas. Al pulsarlo, llevará al usuario a la pantalla "Estadísticas del recurso" (pantalla 6 en este documento)

### **5. Pantalla "Mis reservas"**
En esta pantalla, el usuario podrá ver las reservas realizadas por él mismo **con fecha posterior al día de hoy**. Se indicará información como el día, la hora, el nombre del recurso a reservar y la cantidad del mismo en caso de ser un material.

Cada reserva tendrá asociada un botón para cancelar en la parte derecha. Pulsar en dicho botón implicará cancelar la reserva.

### **6. Pantalla "Estadísticas del recurso"**
A esta pantalla se accederá tras haber pulsado sobre el botón de estadísticas a la hora de reservar un recurso.

En esta pantalla aparecerán las veces que un profesor ha hecho una reserva del recurso que se iba a reservar. Dichas estadísticas aparecen represetadas como una lista en la que se indica el nombre del profesor y el número de reservas que ha hecho del recurso.






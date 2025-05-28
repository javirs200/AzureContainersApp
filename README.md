## Descripción del Proyecto

Sistema de Cronometro WRC para vehiculos a escala , codigo fuente de mi TFG en ingenieria de Software

### 🏗️ Tecnologias utilizadas

- **REACT**

- **API REST**

- **WEBSOCKETS**

- **Socekt TCP** 

- **JWT**

### 💻 Desarrollo Frontend y Backend

- **Frontend:** Desarrollado en React, proporciona una interfaz de usuario.

- **Backend:** Implementado en JavaScript (Node.js), utiliza Sequelize como base de datos para gestionar la información.

- **Base de Datos:** Se utiliza Sequelize como ORM (object-relational mapping , mapeo relacional de objetos) para interactuar con la base de datos y almacenar la información necesaria.

### 💻 Desarrollo dispositivos conectados

dispone de dos ramas en las que se ha dessarollado el codigo para las estaciones fisiscas de deteccion de los vehiculos

- **RaspberryPiDevelop** para la estacion de partida
- **ESP32Files** para la estacion de meta

### 🔍 Funcionalidades Actuales

- creacion de pruebas o eventos
- incripcion de participantes
- registro de vehiculos
- captura de salida y llegada
- asociacion vehiculo y piloto

### ⌛ Futuras Mejoras , nuevos planes

- version migrada a K8s actualmente usa DockerCompose. 
- Disponer de un container mokup/wrapper hecho con fastApi que pueda reemplazar los dispositivos fisicos durante el dessarrollo

### ⚠️ Fallos conocidos
- calculo de tiempo en raspberry , diferencia de tramas con esp32, debido a la diferencia de precision de los relojes

## 🌐 Acceso a la Aplicación:

- aplicacion desplegable en contenedores docker , actualmente existe una version demo [abierta](http://cronos-timer.westeurope.cloudapp.azure.com/) funcionalidad limitada.

## 🤝 Developers

- @javirs200

¡Gracias por contribuir al desarrollo de este proyecto! Siéntase libre de proponer nuevas funciones, reportar problemas o contribuir con mejoras.

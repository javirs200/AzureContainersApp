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
- Disponer de un container mokup/wrapper que pueda reemplazar los dispositivos fisicos durante el dessarrollo

### ⚠️ Fallos conocidos
- calculo de tiempo en raspberry , diferencia de tramas con esp32, debido a la diferencia de precision de los relojes

## 🌐 Acceso a la Aplicación:

- Aplicación desplegable en contenedores Docker. Existió una versión demo [abierta], pero ya no se encuentra disponible debido a los costes de mantenimiento.

## 🤝 Developers

- @javirs200

¡Gracias por contribuir al desarrollo de este proyecto! Siéntase libre de proponer nuevas funciones, reportar problemas o contribuir con mejoras.

---

## Project Description

WRC Timing System for scale model vehicles, source code for my TFG in Software Engineering.

### 🏗️ Technologies used

- **REACT**

- **API REST**

- **WEBSOCKETS**

- **Socekt TCP** 

- **JWT**

### 💻 Frontend and Backend development.

- **Frontend:** Developed in React, it provides a user interface.

- **Backend:** Implemented in JavaScript (Node.js), it uses Sequelize as database to manage information.

- **Database:** Sequelize is used as an ORM (object-relational mapping) to interact with the database and store the necessary information.

### 💻 Development of connected devices

has two branches in which the code for the physical vehicle detection stations has been developed.

- RaspberryPiDevelop** for the starting station
- ESP32Files** for the finish station

### 🔍 Current Functionalities

- creation of races or events
- registration of participants
- registration of vehicles
- start and finish capture
- vehicle and driver association

### ⌛ Future improvements, new plans

- Migrated version to K8s currently uses DockerCompose. 
- Have a mokup/wrapper container that can replace physical devices during development.

### ⚠️ Known issues
- raspberry time calculation , frame difference with esp32, due to clock precision difference.

## 🌐 Application Access:

- Deployable application in Docker containers. There was an [open] demo version , but it is no longer available due cost maintenace.

## 🤝 Developers.

- @javirs200

Thanks for contributing to the development of this project! Feel free to propose new features, report problems or contribute improvements.
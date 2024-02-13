# Establecer la imagen base a Node
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

WORKDIR /app/client

# copy lista dependencias
COPY ./client/package.json ./

#instalar dependencias
RUN npm install

# copy rest of app
COPY ./client/ ./

# build vite app
RUN npm run build

# El puerto en el que se ejecutará la aplicación
EXPOSE 80

# Comando para iniciar la aplicación
CMD ["npm", "run" ,"start"]
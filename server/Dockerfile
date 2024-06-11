# Establecer la imagen base a Node
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

WORKDIR /app/server

# copy lista dependencias
COPY ./server/package.json ./
# comprobacion
RUN ls
#instalar dependencias
RUN npm install

COPY ./server/ ./

# comprobacion
RUN ls

# El puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run" ,"start"]

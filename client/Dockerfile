# Establecer la imagen base a Node
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

WORKDIR /app/client

# copy lista dependencias
COPY ./client/package.json ./
# comprobacion
RUN ls
#instalar dependencias
RUN npm install

COPY ./client/ ./

# comprobacion
RUN ls

# El puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run" ,"start"]
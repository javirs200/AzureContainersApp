# Establecer la imagen base a Node
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# copiar todos los archivos
COPY . .

#instalar dependencias
RUN npm install

# El puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run" ,"start"]
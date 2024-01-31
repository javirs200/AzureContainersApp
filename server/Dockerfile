# Usar una imagen base de Node
FROM node:18-alpine

# Crear un directorio para la app
WORKDIR /app

# copiar todos los archivos
COPY . .

#instalar dependencias
RUN npm install

# Exponer el puerto en el que la app se ejecutará
EXPOSE 4000

# Comando para iniciar la app
CMD [ "npm","run", "start" ]

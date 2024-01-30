# Establecer la imagen base a Node
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json (si está disponible)
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación al contenedor
COPY . .

# El puerto en el que se ejecutará la aplicación
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run" ,"start"]
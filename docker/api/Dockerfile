# FROM ubuntu:latest


# RUN apt update -y
# RUN apt upgrade -y
# #RUN unminimize -y

# RUN apt install zsh  git sudo man    -y

# RUN apt install curl -y 
# RUN apt install wget -y
# RUN curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && sudo apt-get install -y nodejs 


# COPY . /home/api

# RUN cd /home/api

# #RUN npm install

# CMD ["npm", "start"]

# Utiliza la imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json (o yarn.lock) al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia los archivos de la aplicación al directorio de trabajo
COPY . .



# Instala npm serve de forma global (si no está instalado)
#RUN npm install -g serve

# Define el puerto en el que se ejecutará la aplicación
EXPOSE 3900

# Comando para iniciar la aplicación cuando se ejecute el contenedor
CMD ["npm", "start"]

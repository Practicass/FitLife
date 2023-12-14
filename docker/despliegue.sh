#!/bin/bash
DOCKERFILE_PATH="."  
IMAGE_NAME1="docker-server"
CONT_NAME1="sisinf-database"
IMAGE_NAME2="docker-client"
CONT_NAME2="sisinf-web"       

# docker stop $CONT_NAME1
# docker rm $CONT_NAME1

sudo docker compose down

# cd api 

# # Construir la imagen a partir del Dockerfile
# sudo docker build -t $IMAGE_NAME1 $DOCKERFILE_PATH

# #sudo docker run --name $CONT_NAME1 -d $IMAGE_NAME1

# cd ..


# docker stop $CONT_NAME2
# docker rm $CONT_NAME2

# cd web 

# # Construir la imagen a partir del Dockerfile
# sudo docker build -t $IMAGE_NAME2 $DOCKERFILE_PATH
# #sudo docker run --name $CONT_NAME2 --link $CONT_NAME1 -p 3900 -d $IMAGE_NAME2

sudo docker compose up -d



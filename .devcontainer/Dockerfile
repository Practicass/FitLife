FROM ubuntu:latest
ARG HOME_DIR

RUN apt update -y
RUN apt upgrade -y
#RUN unminimize -y

RUN apt install zsh  git sudo man    -y

RUN apt install curl -y 
RUN apt install wget -y
RUN curl -fsSL https://deb.nodesource.com/setup_19.x | sudo -E bash - && sudo apt-get install -y nodejs 



RUN useradd --create-home --shell /bin/zsh vscode
RUN adduser vscode sudo 

RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >>/etc/sudoers
RUN echo "vscode:vscode" | chpasswd


COPY ./.zshrc /home/vscode
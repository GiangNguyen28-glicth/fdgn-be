
FROM jenkins/jenkins:lts

USER root

# Cài đặt Docker CLI
RUN apt-get update && \
    apt-get install -y apt-transport-https ca-certificates curl gnupg2 software-properties-common && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add - && \
    add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable" && \
    apt-get update && \
    apt-get install -y docker-ce-cli && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g yarn && \
    npm i -g @nestjs/cli && \
    rm -rf /var/lib/apt/lists/*

USER jenkins

# docker run -d --name jenkins -p 8090:8080 -p 50000:50000 -v D:\jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v C:\Users\diepn\AppData\Local\Yarn:/usr/local/yarn my-jenkins-image
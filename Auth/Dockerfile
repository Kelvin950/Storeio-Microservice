FROM node 

WORKDIR  /app 

COPY  package.json .

RUN  npm  install typescript -g

RUN npm install 



COPY  . . 

CMD  ["npm" , "start"]
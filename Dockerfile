FROM node:18.19.1-bookworm

WORKDIR /app

COPY . .

RUN apt update
RUN apt install -y mariadb-server

RUN npm install --prefix frontend
RUN npm install --prefix backend

RUN npm run build --prefix frontend

EXPOSE 4173
EXPOSE 5001

CMD ["./launch.sh"]

#launch with docker run -p 4173:4173 -p 5001:5001 food
FROM node:17.7.2-alpine
WORKDIR /imobiliaria-api
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
EXPOSE 3000
CMD /wait && npm run dev

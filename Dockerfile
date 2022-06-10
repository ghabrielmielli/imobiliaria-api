FROM node:17.7.2-alpine
WORKDIR /imobiliaria-api
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm install
CMD ["npm", "run","dev"]

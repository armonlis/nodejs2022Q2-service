FROM node:16-alpine
EXPOSE 4000/tcp
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build
CMD ["node", "dist/main.js"]
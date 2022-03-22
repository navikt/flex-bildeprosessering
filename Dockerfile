FROM alpine:3.15

WORKDIR /app
COPY . .
RUN apk add --no-cache binutils make gcc g++ nodejs npm vips vips-dev
RUN npm i
RUN npm test
RUN npm run build

EXPOSE 8080

CMD ["node", "."]

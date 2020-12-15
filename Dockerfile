FROM alpine:20200917

WORKDIR /app
COPY . .
RUN apk add --no-cache binutils make gcc g++ nodejs npm vips vips-dev
RUN npm i
RUN npm run build

EXPOSE 8080

CMD ["node", "."]

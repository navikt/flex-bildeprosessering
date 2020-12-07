echo "Bygger flex-bildeprosessering latest for docker compose utvikling"

npm i
rm -rf node_modules/sharp
npm install --arch=x64 --platform=linux --target=8.10.0 sharp   # For å kjøre i docker linux-x64
npm run build

docker build . -t flex-bildeprosessering:latest

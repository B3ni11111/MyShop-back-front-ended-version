# Stage 1 - build
FROM node:20-alpine as builder
# אני שומר אותו ככה כי זאת בנייה עם שני שלבים
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2 - serve with nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# אני עושה daemon off 
# כדאי שהקונטיינר ימשיך לחיות כי הקוד עובר לרוץ "ברקע" 

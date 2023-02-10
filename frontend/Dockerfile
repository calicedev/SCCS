# FROM node:16 as builder

# WORKDIR /app

# COPY package*.json .

# RUN npm install --force

# COPY . .

# RUN npm run build

# FROM nginx

# EXPOSE 3001

# COPY ./defalut.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /app/build  /usr/share/nginx/html

FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .

CMD ["npm", "start"]

EXPOSE 3000
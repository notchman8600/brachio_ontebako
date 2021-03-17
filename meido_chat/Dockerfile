ARG socket_url=ws://localhost:8080/ws
ARG liff_id=undefined

FROM node:14-alpine as build
WORKDIR /app
ARG socket_url
ARG liff_id
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_SOCKET_URL=$socket_url
ENV REACT_APP_LIFF_ID=$liff_id
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn build

FROM nginx:stable-alpine
ARG socket_url
ARG liff_id
ENV REACT_APP_SOCKET_URL=$socket_url
ENV REACT_APP_LIFF_ID=$liff_id
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

ARG socket_url=ws://localhost:8080/ws

FROM node:alpine as build-target
WORKDIR /app
ARG socket_url
ENV REACT_APP_SOCKET_URL=$socket_url
ENV NODE_ENV=production

COPY package.json ./
RUN yarn install && yarn cache clean
COPY . ./
RUN yarn build

# && groupadd -r next && useradd -r -g next next && chown -R next:next .next
# USER next

FROM node:alpine
WORKDIR /app
ARG socket_url
ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH
ENV REACT_APP_SOCKET_URL=$socket_url

COPY --from=build-target /app/node_modules ./node_modules
COPY --from=build-target /app/.next ./.next
COPY --from=build-target /app/package*.json ./
COPY --from=build-target /app/public ./public

EXPOSE 3000

CMD ["yarn","start"]

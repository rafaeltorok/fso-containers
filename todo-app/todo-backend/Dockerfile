FROM node:24

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --omit=dev

ENV MONGO_URL=mongodb://mongodb:27017/tododb
ENV REDIS_URL=redis://redis:6379

EXPOSE 3000

USER node

CMD ["npm", "start"]

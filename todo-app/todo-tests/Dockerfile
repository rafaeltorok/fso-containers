FROM mcr.microsoft.com/playwright:v1.60.0

WORKDIR /todo-tests

COPY ./package*.json .

RUN npm ci

COPY . .

CMD ["npm", "run", "test:e2e"]

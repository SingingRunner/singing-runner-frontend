# Use the larger node image for building the project
FROM node:16.14.0 as builder

WORKDIR /my_frontend/
COPY ./package.json /my_frontend/
COPY ./yarn.lock /my_frontend/
RUN yarn install

COPY . .
RUN yarn build

# Use the smaller alpine-node image for deployment
FROM node:16.14.0-alpine

WORKDIR /my_frontend/
COPY --from=builder /my_frontend/package.json .
COPY --from=builder /my_frontend/yarn.lock .
COPY --from=builder /my_frontend/.next ./.next
COPY --from=builder /my_frontend/public ./public
RUN yarn install --production

CMD ["yarn", "start"]

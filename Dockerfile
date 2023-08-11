# Use the larger node image for building the project
FROM node:16.14.0 as builder

WORKDIR /my_frontend/
COPY ./package.json /my_frontend/
COPY ./yarn.lock /my_frontend/
RUN yarn install

COPY . .

ARG NEXT_PUBLIC_APPKEY
ARG NEXT_PUBLIC_KAKAO_API_KEY
ARG NEXT_PUBLIC_GOOGLE_CLIENT_ID
ARG NEXT_PUBLIC_GOOGLE_REDIRECT_URL
ARG NEXT_PUBLIC_GOOGLE_CLIENT_SECRET

ENV NEXT_PUBLIC_APPKEY=$NEXT_PUBLIC_APPKEY
ENV NEXT_PUBLIC_KAKAO_API_KEY=$NEXT_PUBLIC_KAKAO_API_KEY
ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=$NEXT_PUBLIC_GOOGLE_CLIENT_ID
ENV NEXT_PUBLIC_GOOGLE_REDIRECT_URL=$NEXT_PUBLIC_GOOGLE_REDIRECT_URL
ENV NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=$NEXT_PUBLIC_GOOGLE_CLIENT_SECRET

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

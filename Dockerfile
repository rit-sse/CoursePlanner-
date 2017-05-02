FROM node:6.10.1

WORKDIR /usr/src/app

COPY ./package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g gulp bower

COPY ./ /usr/src/app
RUN chmod +x /usr/src/app/entrypoint.sh

RUN bower install --allow-root
RUN npm run prodGulp

ENV ENVIRONMENT=prod

EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]

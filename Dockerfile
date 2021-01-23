FROM alpine:3.13
RUN apk add --no-cache nodejs npm curl

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .

EXPOSE 3000

HEALTHCHECK --interval=15s --timeout=8s --start-period=15s CMD curl -I http://localhost:3000 || exit 1 

CMD [ "npm", "run", "start" ]

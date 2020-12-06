FROM node:12.18.1
# ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production
COPY . .
CMD [ "npm", "run", "start" ]

FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm --prefix backend install
COPY backend/ ./backend/
EXPOSE 4000
CMD ["npm", "--prefix", "backend", "run", "start"]

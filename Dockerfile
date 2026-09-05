FROM node:20-alpine
WORKDIR /app
COPY backend/ ./backend/
RUN npm --prefix backend install
EXPOSE 4000
CMD ["npm", "--prefix", "backend", "run", "start"]

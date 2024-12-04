#Base stage for Next.js
FROM node:18 AS builder
WORKDIR /app/react_next_app
COPY ./../../reactApplication/react_next_app /app/react_next_app
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "dev"]
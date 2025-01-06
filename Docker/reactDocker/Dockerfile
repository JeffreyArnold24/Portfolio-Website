#Base stage for Next.js
FROM node:20 AS builder
WORKDIR /app/react_next_app
COPY ./../../reactApplication/react_next_app /app/react_next_app
RUN npm install
RUN npm run build

FROM node:20 AS runner
WORKDIR /app
COPY --from=builder /app/react_next_app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
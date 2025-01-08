FROM python:3.10-slim
WORKDIR /app/flaskServer
COPY ./flaskServer /app/flaskServer
RUN pip install -r requirements.txt
EXPOSE 8081
EXPOSE 8082
CMD ["python", "app.py"]
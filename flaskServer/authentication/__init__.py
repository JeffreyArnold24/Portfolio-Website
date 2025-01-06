from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///../../sqlite_database/web_database.db'
db = SQLAlchemy()
db.init_app(app)
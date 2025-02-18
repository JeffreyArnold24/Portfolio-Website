# Configurations
This folder contains two files.
- DatabaseConfig is used to setup and connect to the SQLite database. This file can be adjusted as needed if the type of database changes allowing for swapping databases if needed.
- WebConfig is used to tell the server how it can be connect to such as which clients it will accept requests from.

# Controllers
This folder contains all of the REST APIs.

It also contains a file that functions as a Global Exception Handler. When an exception is thrown, it will be rerouted through this file and return an error to the client using a consitant format.

# DAO
The Database Access Objects (DAOs) are the files that directly interact with the databases. Each DAO implement interfaces so that if the database were to change, it would be easy to rewrite new classes that server the same function.

# DTO
The Database Transfer Objects (DTOs) are used as models for transfering necessary information between the client and the server. This includes classes such as a LoginRequest class and a LoginResponse class.

# Services
The services folder contains files that handle most of the logic relating to the server. They are typically called from a controller and then interact with the DAOs in order to create an appropriate DTO object response to be returned to the client.

# Util
This folder contains helper functions that could be used between certain services so that code does not need to be rewritten in multiple classes.

# Main.java
This is the main function that is run in order to start the server.

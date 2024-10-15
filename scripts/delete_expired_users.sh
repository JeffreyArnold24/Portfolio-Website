#!/bin/bash

# Check if an argument (time interval) is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <time_interval_minutes>"
    exit 1
fi

# Define the SQLite database file
DB_PATH="../sqlite database/web_database.db"

# The first argument ($1) is the time interval in minutes
time_interval_days=$1

# Convert minutes to milliseconds
time_interval_milliseconds=$((time_interval_days * 60 * 1000 * 60 * 24))

# SQL query to delete tokens older than the time interval
delete_sql="DELETE FROM users WHERE creationDateTime <= (strftime('%s', 'now') * 1000 - $time_interval_milliseconds);"

# Execute the SQL query using sqlite3 command-line interface
deleted_rows=$(sqlite3 "$DB_PATH" "$delete_sql")

# Check the result and print a message
if [ $? -eq 0 ]; then
    echo "Expired users deleted successfully."
else
    echo "Failed to delete expired users."
fi
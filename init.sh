#!/bin/bash

frontend(){
    cd frontend 
    npm start
}

backend(){
    cd backend
    npm run dev
}

frontend &
backend &

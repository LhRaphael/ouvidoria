#!/bin/bash
closePort(){
    lsof -ti:$1 | xargs kill -9
}

frontend(){
    cd frontend 
    npm start
}

backend(){
    cd backend
    npm run dev
}

closePort 3000
closePort 3001

frontend &
backend &

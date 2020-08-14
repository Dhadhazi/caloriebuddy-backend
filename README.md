# caloriebuddy-backend

Minimal Viable Product version of the backend.

## REST API made with NodeJ using MongoDB

### API Endpoints, all starts from /api/:
- post - /user - adding user
- post - /login - logging in user, gives back JWT token and all the user data
- get - /loginJwt - loggs in user with JWT, gives back all user data

#### All other endpoints require JWT in the user
- post- /user/add - adding user data, mostly consumption or activity

- patch - /user/weight - update weight
- patch - /user/budget - update budget

- put - /user - deleting all the data of the user, except login

- delete - /user - deletes the user
- delete - /weight - deletes the weight
- delete - /add - deletes consumption or activity

### CRON Job
- Runs a daily cron job one minute after midnight to rollover all the calories

### .env requirements
- MONGO_URI - add your MONGO DB connect URI
- JWT_SECRET - add your secret for JWT

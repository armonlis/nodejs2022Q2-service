# **REST SERVICE.**
This part contains two parts in one:
- Authentication and Authorization.
- Logging & Error Handling.
___
## **Authentication and Authorization**
Clone or download this repository and open the console in its destination.  
Enter in the console:  
`npm i` or `npm install`  
To build image with Postgres enter in the console or skip this part if you have your own one:  
`docker build -t db -f db.Dockerfile .`  
To run the Postgres DB enter in the console or run your DB on the port 5000:  
`docker run --rm -p 5000:5432 db`  
Then enter in the console:  
`npm run typeorm migration:run`  
Then enter in the console:  
`npm run start:dev` or `npm run build` and `npm run start:prod`  
Now you can test this application with authorization and authenfication:  
`npm run test:auth`  
___
## **Logging & Error Handling**
You can use the following options just change the .env file:  
### LOG_MODE
- `console` to dispatch logs in the console  
- `file` to write logs in the files (errors will be written in the others files)  
### LOG_LEVEL
- from `0` to `4` in the following sequence "log", "error", "warn", "debug", "verbose"
### PATH_TO_LOGS
- the path to your logs folder. Please ended it with /.
### LOG_FILE_NAME
- name for your logs files
### LOGS_MAX_SIZE
- max size of the files with the logs kB
### ERROR_FILE_NAME
- name for your errors files
### ERRORS_MAX_SIZE
- max size of the files with the errors kB  
If you will not change the .env file you will be able to find your logs and errors in the repository_folder/logs/ folder.
___
## **Running the application into Docker's container.**
To run this app with Docker please do following:  
- change POSTGRES_PORT in the .env file to 5432  
- change POSTGRES_HOST in the .env file to 100.100.100.4
- enter in the console `docker-compose up`. Also you can read the README.MD in the develop2 branch for details.

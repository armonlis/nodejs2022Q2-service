# **REST SERVICE.**
This part contains two parts in one:
- Containerization. Docker.
- PostgresSQL & ORM.
___
## **Contanerization. Docker.**
Clone or download this repository and open the console in its destination.  
All you need enter in console:  
`docker-compose up`  
You can see logs and data base files of Postgres in the folder `postres/data_base` and `postgres/logs` accordingly in the root of your OS. (C:\postgres\... for Win).
___
### Creating Docker's images.
To create postgres image enter in console:  
`docker build -t db -f db.Dockerfile .`  
To create the server image enter in console:  
`docker build -t db -f server.Dockerfile .`  
Now you can check out the size of the server (application) image (less than 350Mb).  
Also you can start this app using images. For this: comment all the build part in the docker compose file and uncomment image one.
___ 
### Running application with slow internet connection.
I can offer you doing following:
- comment `RUN npm i` in the `server.Dockerfile` file
- comment `node_module` in the `.dockerignore` file  

After this run:  
`docker-compose up`  
Or you can create images and run the application with them (watch the `Creating Docker's images.` part).
___
### Vulnerabilities scanning.
Before scanning you should create images (watch the `Creating Docker's images.` part).  
Enter in the console:  
`npm run scan` for scanning your images.  
`npm run scan:server` for scanning the server image.  
`npm run scan:db` for scanning the data base image.  
___
## **PostgresSQL & ORM.**
There was used TypeORM.  
You can see `entities` in the `src\typeorm\entity` folder.  
You can see `migrations` in the `src\typeorm\migration` folder.  
To sure migrations are used see `data-source.ts` in the `src\typeorm` folder (synchronize: false and migrations). Also you can see applying migrations in console when you run the application with docker-compose.  
To run tests enter:  
`npm run test`


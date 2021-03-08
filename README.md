# Review Service

This service is setup to run in Docker containers. To run locally, follow instructions below.

## Instructions For Running Locally
1. Install Docker on your local machine https://docs.docker.com/get-docker/
2. Install Docker Compose should your machine require extra steps https://docs.docker.com/compose/install/
3. Clone down repository: "git clone https://github.com/sdc-perlman/review-service.git"
4. From the root directory of the repository in the terminal, run "docker-compose up --build app mongo"

```console
docker-compose up -- build app mongo
```

By specifiying the service, we are choosing which image to create containers of. If we only ran "docker-compose up", docker will assume that we want containers to run for all images


## Seeding the Database
1. Run the command "npm run data-generate"
2. This will start the process of generating fake data, notice in the "server/dataGeneration/generateDump.js" file, that there is an
	"iterations" variable which detemines how much data will be generated. It is set to 19 to create 10,000,000 record. If running this
	locally, I recommend switch it to 0 or 1 (500,000 records for 0, 1,000,000 for 1) to significantly reduce the amount of time to
	completed the script.
3. After the data is created, a shell script should execute that concatenates all files that were generated. If this command does NOT
	execute due to file-permission reasons, then there are two things you can try:
	1. You can "cd" into the "server/dumps" directory, and run "chmod 777 catScript.sh" to give
		your machine higher permissions, and then run "npm run shell"
	2. Another option is to copy the command that was logged to the console when the data was generated. It is the same exact command 		that the "npm run shell" script is supposed to execute, but instead now you would just be executing it directly in your terminal
	3. I personally recommend trying the first option first
4. Once the "dump.sql" file is created, from the root directly of the project in your terminal, run the command "docker-compose --build 	up pg". This will read the "pg" service in the "docker-compose.yaml" file and only build that image and run a container, whlie 			ignoring the other services. Once the image is build, the Postgres container will see the "dump.sql" file and begin copying the 		information to the database. This process should take very little time if you set the number of iterations to 0 or 1 earlier.
	You will notice the creation of another folder called "pg" in the root directory of the project, which is just a volume to persist the data that was seeded so that you do not need to seed the database when stopping and restarting a Postgres container.

### Option 1
```console
cd server/dumps
chmod 777 catScript.sh
npm run shell
```

### Option 2
From the rootdir, paste the command that printed to your terminal. This command will vary depending on how many iterations you choose to run in "server/dataGeneration/generateDump.js". It should look like the following below:
```console
cat server/dumps/head.sql server/dumps/copySpaces.sql server/dumps/spacesBody0.sql server/dumps/spacesBody1.sql server/dumps/copyReviews.sql server/dumps/reviewsBody0.sql server/dumps/reviewsBody1.sql server/dumps/copyCalculations.sql server/dumps/calculationsBody0.sql server/dumps/calculationsBody1.sql server/dumps/foot.sql > server/dumps/dump.sql
```

### Running the Postgres container
From the rootdir, enter in your terminal
```console
docker-compose --build up pg
```

NOTE: The initial copying of the dum.sql may take a little time, but all subsequent containers will be instant. To stop and delete the container, enter:
```console
docker-compose down
```

NOTE: Postgres has the "out-of-box" capability of generating a dump.sql file to back up existing databases. The entire strategy of this data generation script was to create a file using the same syntax as a native pg_dump file, as these scripts follow several recommendations from the Postgres documentation on speeding up the process of seeding large datasets. More can be read [here](https://www.postgresql.org/docs/9.1/populate.html)

##PgAdmin
In the docker-compose.yml file, you will see that I have also included a service to run a container for PgAdmin (the Postgres GUI). To see it in action, run the following command:
```console
docker-compose up --build pg pgadmin
```

In the browser, go to http://localhost:8080

![create-connection](https://sdc-perlman.s3.amazonaws.com/pgadmin/createConnection.png)
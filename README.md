# fr4mlab
Franck's repository for MongoDB learning, analyzing, and benchmarking

## Example

Start mongodb, prometheus, mongodb_exporter (from percona) and grafana:
```
docker compose down
docker compose up -d
```

### Run some workload (insert for 5 minutes) defined in [functions.js](./config/functions.js)
```
docker compose run mongosh # the entrypoint loads automatically /config/functions.js

 db.demo.drop(); 
 db.runCommand( {
   create: "demo",
   clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "demo clustered key" }
} )
 run(300, bulkInsert, db.demo, 1, 1000);

```

### Run a custom workload from ten connections:
```
mlab(){
 for i in $(seq 1 $1)
 do
  docker compose run -T mongosh --eval "load('/config/functions.js'); run($2)" < /dev/null |
   sed -e "s/^/$i\\t/" &
 done
 wait
}

mlab 10 "300,bulkInsert,db.demo,1,1000" 

```

![output](https://github.com/user-attachments/assets/24030459-ef3a-4647-8352-8c89f88ca040)


### Run mongostat ( fields listed in [mongostat.fields](./config/mongostat.fields) ):
```
docker compose run mongostat

```
![mongostats](https://github.com/user-attachments/assets/9204ac1b-5980-44fd-9ba1-5a83ef27e8dd)


### Watch grafana dashboard on port [3000](HTTP://localhost:3000) (user/passsword admin/admin):

![image](https://github.com/user-attachments/assets/64d8e5ba-2533-4822-afc1-ac4289e15b04)


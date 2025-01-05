# fr4mlab
Franck's repository for MongoDB learning, analyzing, and benchmarking

## Test

Start mongodb, prometheus, and grafana:
```
docker compose down
docker compose up -d
```

Run some workload (insert for 5 minutes)
```
docker compose run mongosh # the entrypoint loads automatically /config/functions.js

 db.demo.drop(); 
 db.runCommand( {
   create: "demo",
   clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "demo clustered key" }
} )
 run(300, bulkInsert, db.demo, 1, 1000);

```

Run a custom workload from three connections:
```
mlab(){
 for i in $(seq 1 $1)
 do
  docker compose run -T mongosh --eval "load('/config/functions.js'); run($2)" < /dev/null |
   | sed -e "s/^/$i\\t/" &
 done
 wait
}

mlab 10 "300,bulkInsert,db.demo,1,1000" 

```

Run mongostat ( fields listed in ./config/mongostat.fields ):
```
docker compose run mongostat

```

Watch grafana dashboard on port 3000 or 

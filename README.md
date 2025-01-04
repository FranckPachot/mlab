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
docker compose run mongosh
 db.demo.drop(); 
 db.runCommand( {
   create: "demo",
   clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "demo clustered key" }
} )
 run(300, bulkInsert, db.demo, 1, 1000);

```

Run mongostat:
```
docker compose run mongostat
```


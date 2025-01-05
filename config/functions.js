
function bulkInsert(collection, start, end) {
    const bulkData = [];
    for (let i = start; i <= end; i++) {
        bulkData.push({ value: i });
    }
    collection.insertMany(bulkData);
}

function run(durationInSeconds, func, ...args) {
    const startTime = Date.now();
    while ((Date.now() - startTime) / 1000 < durationInSeconds) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] Executing: ${func.name}(${args.join(", ")})`);
        func(...args);
    }
}

print (`
Examples:

// insertMany of 1000 documents during 5 minutes into a clustered collection "demo"

 db.demo.drop();
 db.runCommand( {
   create: "demo",
   clusteredIndex: { "key": { _id: 1 }, "unique": true, "name": "demo clustered key" }
} )
 run(300, bulkInsert, db.demo, 1, 1000);

 
`);


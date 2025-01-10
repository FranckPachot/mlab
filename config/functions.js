
// Some CRUD functions

function bulkInsert(collection, start, end) {
    const bulkData = [];
    for (let i = start; i <= end; i++) {
        // documents have a value (numeric) and 5 random UUID in an array
        bulkData.push({ value: i , created_at: new Date(), filler: Array.from({ length: 5 }, () => new UUID()) });
    }
    collection.insertMany(bulkData);
}

function insertOne(collection) {
    const value = Math.floor(1e3*Math.random()) ;
    collection.insertOne({ value: value, created_at: new Date(), filler: Array.from({ length: 5 }, () => new UUID()) });
}

function deleteOne(collection) {
    const value = Math.floor(1e3*Math.random()) ;
    collection.deleteOne( { value: value } );
}

function deleteMany(collection) {
    const value = Math.floor(1e3*Math.random()) ;
    collection.deleteMany( { value: { $gte: value , $lte: value+10 } } );
}

function deleteAll(collection) {
    collection.deleteMany({});
}

function replaceOne(collection) {
    const oldValue = Math.floor(1e3*Math.random()) ;
    const newValue = Math.floor(1e3*Math.random()) ;
    collection.findOneAndReplace({ value: oldValue }, { value: newValue, filler: Array.from({ length: 5 }, () => new UUID()) });
}

function updateOne(collection, query) {
    const value = Math.floor(1e3*Math.random()) ;
    collection.updateOne({ value: value }, { $inc: { value: 1 } });
}

function queryValue(collection) {
    const value = Math.floor(1e3*Math.random()) ;
    return collection.findOne({ value: value });
}

function queryRange(collection) {
    const minValue = Math.floor(1e3*Math.random()) ;
    const maxValue = Math.floor(1e3*Math.random()) ;
    return collection.find({ value: { $gte: minValue, $lte: maxValue } }).toArray();
}

// function to run another function in a loop

function run(durationInSeconds, func, ...args) {
    const startTime = Date.now();
    let executionCount = 0;
    while ((Date.now() - startTime) / 1000 < durationInSeconds) {
        executionCount++;
        const timestamp = new Date().toISOString();
        func(...args);
        console.log(`[${timestamp}] Executing: ${func.name}(${args.join(", ")}) ${(executionCount/((Date.now()-startTime)/1000)).toFixed(1)}/s`);
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


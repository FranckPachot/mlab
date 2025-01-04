
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


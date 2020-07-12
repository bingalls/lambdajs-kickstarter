"use strict";
exports.__esModule = true;
// Prisma experimental migrations
var child_process_1 = require("child_process");
var generate = child_process_1.spawnSync('npx', ['prisma', 'generate']);
console.log("stderr: " + generate.stderr.toString());
console.log("stdout: " + generate.stdout.toString());
// Name the new migration "bootstrap"
var save = child_process_1.spawnSync('npx', [
    'prisma', 'migrate', 'save', '--experimental', '-c', '-n', 'bootstrap'
]);
console.log("stderr: " + save.stderr.toString());
console.log("stdout: " + save.stdout.toString());
var up = child_process_1.spawnSync('npx', ['prisma', 'migrate', 'up', '--experimental']);
console.log("stderr: " + up.stderr.toString());
console.log("stdout: " + up.stdout.toString());
var populate = child_process_1.spawnSync('node', ['prisma/populate.js']);
console.log("stderr: " + populate.stderr.toString());
console.log("stdout: " + populate.stdout.toString());

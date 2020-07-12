// Prisma experimental migrations
import { spawnSync } from 'child_process';

const generate = spawnSync( 'npx', [ 'prisma', 'generate' ] );
console.log( `stderr: ${generate.stderr.toString()}` );
console.log( `stdout: ${generate.stdout.toString()}` );

// Name the new migration "bootstrap"
const save = spawnSync( 'npx', [ 
    'prisma', 'migrate', 'save', '--experimental', '-c', '-n', 'bootstrap'
] );
console.log( `stderr: ${save.stderr.toString()}` );
console.log( `stdout: ${save.stdout.toString()}` );

const up = spawnSync( 'npx', [ 'prisma', 'migrate', 'up', '--experimental' ] );
console.log( `stderr: ${up.stderr.toString()}` );
console.log( `stdout: ${up.stdout.toString()}` );

const populate = spawnSync( 'node', [ 'prisma/populate.js' ] );
console.log( `stderr: ${populate.stderr.toString()}` );
console.log( `stdout: ${populate.stdout.toString()}` );

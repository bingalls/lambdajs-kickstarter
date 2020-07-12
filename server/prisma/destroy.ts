// Hack around Prisma experimental migrations
require('dotenv').config();
import { createFile, remove, stat, truncate } from 'fs-extra';
import { prompt } from 'prompts';

(async () => {
    const response = await prompt.prompt({
      type: 'confirm',
      name: 'value',
      message: 'Are you sure you wish to destroy this database?',
      initial: false
    });
   
    if (response.value) {
      remove(`${__dirname}/prisma/migrations`);
      const dbName = process.env.DB_NAME ?? '';
      if (stat(dbName)) {
        truncate(dbName);
      } else {
        createFile(dbName);
      }
      console.log('Database reset');
    } else {
      console.log('Process aborted');
    }
  })();

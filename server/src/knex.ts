const knexConfig = {
  client: 'postgres',
  connection: {
      host     : 'database.trocafone.local',
      user     : 'trocafone',
      password : 'trocafone',
      database : 'modelos3',
  } 
};

export const knex = require('knex')(knexConfig);
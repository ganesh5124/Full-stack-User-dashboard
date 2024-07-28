const { Model } = require('objection');

const db = require("knex")({
    // The knex module is itself a function which takes a configuration object for Knex,
    // accepting a few parameters
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        port: '',
        password: "",
        database: "User Management",
    },
    pool: { min: 0, max: 7 },
});

Model.knex(db);
module.exports = db;

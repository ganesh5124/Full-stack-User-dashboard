const express = require("express");
const routes = require("./routes/routes");
const cors = require('cors')
const corsOptions = require("./config/config");
const PORT = process.env.PORT || 3000;
const app = express();

console.log('corsOptions', corsOptions);

app.use(cors(corsOptions))
// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// acts as a middleware and apply navigation
app.use('', routes)


app.listen(PORT, ()=>{
    console.log(`App is listening on PORT - ${PORT}`);
})

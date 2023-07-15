const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit')

const app = express();
const limiter = rateLimit({
	windowMs: 1* 60 * 1000, 
	max: 4, // Limit each IP to requests per `window` (here, per 15 minutes)

})

// Apply the rate limiting middleware to all requests
app.use(limiter)


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
})

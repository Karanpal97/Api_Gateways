const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
const rateLimit = require('express-rate-limit')
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const limiter = rateLimit({
	windowMs: 1* 60 * 1000, 
	max: 4, // Limit each IP to requests per `window` (here, per 15 minutes)

})

// Apply the rate limiting middleware to all requests
app.use(limiter)
app.use('/booking-service', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true , pathRewrite: {
	'^/booking-service': '/', 
 },}));


app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
})


// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        //createProxyMiddleware('/api', {
		createProxyMiddleware('/api',{
			//target: 'http://localhost:5000/',
			target: 'https://olleh-farm.onrender.com/',
            //target: 'http://192.168.0.41:3000'
            //target: 'http://humaster.iptime.org',
			//target: 'http://nginx:8080',
            changeOrigin: true,
            // pathRewrite: {
            //      '^/api': '' // URL ^/api -> 공백 변경
            // }
			// router: {
			// 	'/socket.io': 'ws://nginx:80'
			//   }			
        })
    );
};
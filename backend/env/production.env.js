const port = process.env.PORT || 8989;
module.exports = {
  ENV: 'production',
  PORT: port,
  URL: `http://192.168.100.168:${port}`,
  MONGODB_URI: 'mongodb://192.168.100.168:27017/customer_api',
  CURRENT_VERSION: 'v1'
};

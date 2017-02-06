const fs      = require('fs');
const morgan  = require('morgan');
const logging = require('winston');
const spdy    = require('spdy');
const express = require('express');

const PORT = 4433;
const SERVER_OPTIONS = {
  key: fs.readFileSync('tls/key.pem'),
  cert:  fs.readFileSync('tls/cert.pem')
};

const app = express();
app.use(morgan('dev'));

app.get('*', (req, res) => {
  res.status(200).json({message: 'ok'});
});


const server = spdy.createServer(SERVER_OPTIONS, app);
server.listen(PORT, (error) => {
  if (error) {
    logging.error(error);
    return process.exit(1);
  } else {
    logging.info(`Listening on port ${PORT}`);
    return 0;
  }
});

module.exports.config = {
    'host': process.env.MQ_HOST,
    'port': process.env.MQ_PORT,
    'connectHeaders':{
      'host': process.env.MQ_CON_HOST,
      'login': process.env.MQ_CON_LOGIN,
      'passcode': process.env.MQ_CON_PASS,
      'heart-beat': process.env.MQ_CON_BEAT
    }
};
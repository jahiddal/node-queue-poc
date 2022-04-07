const stompit = require('stompit');
const {config} = require("../config/queue.config.js");
  
// Queue subscribe method
module.exports.subscribe = () => {
    stompit.connect(config, function(error, client) {
        if (error) {
          console.log('connect error ' + error.message);
          return;
        }
        const subscribeHeaders = {
          'destination': '/queue/tutorials',
          'ack': 'client-individual'
        };
        client.subscribe(subscribeHeaders, function(error, message) {
          if (error) {
            console.log('subscribe error ' + error.message);
            return;
          }
          message.readString('utf-8', function(error, body) {
            if (error) {
              console.log('read message error ' + error.message);
              return;
            }
            console.log('received message: ' + body);
            client.ack(message);
          });
        });
      });
  }  
  
  // Queue add element method
  module.exports.publish = (message) => {
    stompit.connect(config, function(error, client) {
        if (error) {
            console.log('connect error ' + error.message);
            return;
        }
        const sendHeaders = {
            'destination': '/queue/tutorials',
            'content-type': 'text/plain'
        };
        const frame = client.send(sendHeaders);
        frame.write(message);
        frame.end();
        client.disconnect();
    });
  }
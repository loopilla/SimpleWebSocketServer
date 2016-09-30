# SimpleWebSocketServer
A very simple Websocket server side wrapper based on webserver npm package

This implementation using ES6 features.

Package used: https://www.npmjs.com/package/websocket

##Usage
###Server side

#### UTF-8
```
wsServer = new socketServer({
    httpServer: server,
    autoAcceptConnections: false,
    protocol: 'echo-protocol'
});


wsServer.addHandler('message', (message) => {
        console.log('Incoming utf8 msg: ', message.utf8Data);
        this.sendUTF(message.utf8Data);
    }
);

wsServer.addHandler('close', (reasonCode, description) => {
        console.log('dissconnect');
    }
);

wsServer.start();
```

For the full example check the example in the repository.


Bests,
    Loop
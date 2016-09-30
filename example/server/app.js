var http = require('http');
var socketServer = require('../../server').SimpleWebSocketServer;

var server = http.createServer(function(req, res){
    console.log('Arrived');
    res.writeHead(404);
    res.end();
});

server.listen(9000, function(){
    console.log('Listening on port 9000');
});

wsServer = new socketServer({
    httpServer: server,
    autoAcceptConnections: false,
    protocol: 'echo-protocol'
});


wsServer.addHandler('message', function(message){
        console.log('Incoming utf8 msg: ', message.utf8Data);
        this.sendUTF(message.utf8Data);
    }
);

wsServer.addHandler('close', function(reasonCode, description){
        console.log('dissconnect');
    }
);

wsServer.start();

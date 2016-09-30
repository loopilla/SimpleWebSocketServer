"use strict";
var webSocketServer = require('websocket').server;

var _handlersArr = Symbol('eventHandlers');
var _validator = Symbol('validatorCallback');
var _instance = Symbol('socketServer');

//ES6
class SimpleWebSocketServer {
    constructor(opts) {
        if(!opts.httpServer) {
            throw new Error('HTTP server instance or port number shoud be defined in options.');
        }

        this.options = opts;

        this.options.autoAcceptConnections = this.options.autoAcceptConnections || false;
        this.options.validator = this.options.validator || ((request) => {
                 return true;
             });

        this[_handlersArr] = new Map();
        this[_validator] = this.options.validator;
    }

    start() {
        //Starts websocketserver
        this[_instance] = new webSocketServer(this.options);

        var clazz = this;

        this[_instance].on('request', (request) => {
            if (!clazz[_validator].call(request)) {
                // Make sure we only accept requests from an allowed origin
                request.reject();
                console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
                return;
            }

            var connection = request.accept(clazz.options.protocol, request.origin);

            clazz[_handlersArr].forEach((value, key, map) => {
                    connection.on(key, value);
                }
            );
        });
    }

    addHandler(event, handler) {
        this[_handlersArr].set(event, handler);
    } 

    removeHandler(event) {
        this[_handlersArr].delete(event);
    } 

    handlerExists(event) {
        return this[_handlersArr].get(event)?true:false;
    }
};

//Named prototype
exports.SimpleWebSocketServer = SimpleWebSocketServer;
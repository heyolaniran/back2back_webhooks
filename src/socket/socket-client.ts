import { Injectable, OnModuleInit } from "@nestjs/common";
import { io, Socket } from "socket.io-client";

@Injectable()
export class SocketClient implements OnModuleInit {

    public socketClient : Socket

    constructor() {
        this.socketClient = io('http://localhost:3000')
    }


    onModuleInit() {
        this.registerConsumerEvents()
    }

    private registerConsumerEvents() {
        this.socketClient.emit('newMessage', {msg: 'New message', content : 'Hey from consumer! '})
        this.socketClient.on('connect', () => {
            console.log('Connected to server')
        })

        this.socketClient.on('onMessage', (payload : any) => {
            console.log("Payload", payload)
        })
    }

}
import {io} from 'socket.io-client'


const socketInit=()=>{
    const options={
        'force new connection':true,
        reconnectionAttempt:'Infinite',
        timeout:10000,
        transports:['websockets'],

    }

    return io('http://localhost:5000',options)
}


const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl()


io.on('connection', (client) => {
    let ua = client.handshake.headers['user-agent'];
    let referer = client.handshake.headers['referer'];
    console.log('\n Usuario conectado');
    console.log(`UserAgent: ${ua}`);
    console.log(`Client ID: ${client.id}`);
    console.log(`Refer: ${referer}`);


    client.on('disconnect', () => {
        console.log('\n Usuario desconectado');
        console.log(`Client ID: ${client.id}`);
        console.log(`Refer: ${referer}`);
    });


    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();

        console.log(siguiente);

        callback(siguiente);
    });


    client.emit('estadoActual', {
        actual: ticketControl.getUltimo(),
        ultimos4: ticketControl.getUltimos4()
    });


    // client.on('ultimos4', (data, callback) => {
    //     client.broadcast.emit('ultimos4', {
    //         ultimos4: ticketControl.getUltimos4()
    //     })

    //     callback({
    //         resp: 'Se enviaron los ultimos 4 - server.'
    //     })
    // });


    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                msg: 'El escritorio es necesario'
            });
        }

        let atender = ticketControl.atenderTicket(data.escritorio);

        callback(atender);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
    });

});
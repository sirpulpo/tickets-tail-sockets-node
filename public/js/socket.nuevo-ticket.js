let socket = io();

let label = $('#lblNuevoTicket');

const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();



socket.on('connect', function() {
    console.log('Conexión con la nube desde nuevo ticket.');
    console.log('UserAgent:', UA);
});


socket.on('disconnect', function() {
    console.log('Desconectado de la nube desde nuevo ticket.');
    console.log('UserAgent:', UA);
});


socket.on('estadoActual', function(data) {
    console.log(data);
    label.text(data.actual);
});


$('button').on('click', function() {
    socket.emit('siguienteTicket',
        null,
        function(siguienteTicket) {
            label.text(siguienteTicket);
        });
});
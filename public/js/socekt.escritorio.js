let socket = io();

const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();


socket.on('connect', function() {
    console.log('Conexión con la nube desde escritorio.');
    console.log('UserAgent:', UA);
});


socket.on('disconnect', function() {
    console.log('Desconectado de la nube desde escritorio.');
    console.log('UserAgent:', UA);
});


var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';

    throw new Error('El escritorio es necesario.');
}

var escritorio = searchParams.get('escritorio');

console.log('Escritorio:', escritorio);
$('h1').append(': ', escritorio);

$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio },
        function(atendiendo) {
            if (atendiendo === 'No hay más tickets pendientes') {
                alert(atendiendo);
                $('small').text(atendiendo);
                return;
            }

            $('small').text('Ticket: ' + atendiendo.numero);
            console.log(atendiendo);
        });

    // socket.emit('ultimos4', null, function(resp) {
    //     console.log(resp);
    //     console.log('Se notifico al publico OK');
    // });
});
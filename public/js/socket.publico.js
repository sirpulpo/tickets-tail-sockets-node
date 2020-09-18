let socket = io();

const inBrowser = typeof window !== 'undefined';
const UA = inBrowser && window.navigator.userAgent.toLowerCase();

let lblTicket1 = $('#lblTicket1');
let lblTicket2 = $('#lblTicket2');
let lblTicket3 = $('#lblTicket3');
let lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

let tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
let escritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];



socket.on('connect', function() {
    console.log('Conexión con la nube desde "publico".');
    console.log('UserAgent:', UA);
});


socket.on('disconnect', function() {
    console.log('Desconectado de la nube desde "publico".');
    console.log('UserAgent:', UA);
});


socket.on('estadoActual', function(data) {
    actualizaHTML(data.ultimos4);
});


socket.on('ultimos4', function(data) {
    var audio = new Audio('./audio/new-ticket.mp3');
    audio.play();

    actualizaHTML(data.ultimos4);
});


function actualizaHTML(ultimos4) {
    for (let i = 0; i < ultimos4.length; i++) {
        tickets[i].text('Ticket: ' + ultimos4[i].numero);
        escritorios[i].text('Escritorio: ' + ultimos4[i].escritorio);
    }
}
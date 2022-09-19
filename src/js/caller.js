/*
    Caller calls a predefined ID. 
    For security purposes, put the ID in a database or something. 

    Once the predefined ID is called, a room is opened. 
    Here we start broadcasting the audio TO the socket room  

*/

var errorText = document.getElementById('works');
var connection = new RTCMultiConnection();

connection.socketURL = 'https://muazkhan.com:9001/';

connection.session = {
    audio: true,
    video: false,
    oneway: true
};

connection.mediaConstraints = {
    audio: true,
    video: false
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};

connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',

        'stun:stun.l.google.com:19302?transport=udp',
    ]
}];

console.log('works here');

connection.open('webrtc-floki', function(isRoomOpened, roomid, error){
    if (error) {
        var text = document.createTextNode(error);
        errorText.appendChild(error);
    }

    if ( isRoomOpened === true){
        var text = document.createTextNode('Connessione riuscita');
        errorText.appendChild(text);
        console.log('Room already open');
    }
})
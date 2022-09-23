/*
    Caller calls a predefined ID. 
    For security purposes, put the ID in a database or something. 

    Once the predefined ID is called, a room is opened. 
    Here we start broadcasting the audio TO the socket room  

*/

var errorText = document.getElementById('works');
var connection = new RTCMultiConnection();
var audio  = document.getElementById('audioContainer');
var success = document.getElementById('works');
var call = document.getElementById('call');

connection.enableLogs = false;
//connection.autoCreateMediaElement = false; 
connection.socketURL = 'https://muazkhan.com:9001/';

connection.session = {
    audio: true,
    oneway: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: false
};

connection.mediaConstraints = {
    audio: true,
    video: false
};



connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',

        'stun:stun.l.google.com:19302?transport=udp',
    ]
}];

connection.socketMessageEvent = 'This is a webrtc test for Floki s.r.l based in Italy. As soon as we figure out how to host our own socket.io server, we will use it.';
console.log('works here');

call.onclick = function() { 
    connection.open('webrtc-floki', function(isRoomOpened, roomid, error){


        if ( isRoomOpened === true){
            var text = document.createTextNode('Connessione riuscita');
            works.appendChild(text);
            console.log('Room already open');
        }
    });
    
}


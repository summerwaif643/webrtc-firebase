var connection = new RTCMultiConnection();


connection.socketURL = 'https://muazkhan.com:9001/';
connection.socketMessageEvent = 'audio-conference-demo';

connection.session = {
    audio: true,
    video: false
};

connection.mediaConstraints = {
    audio: true,
    video: false
};

//this is correct
connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

// https://www.rtcmulticonnection.org/docs/iceServers/
// use your own TURN-server here!

connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',
        'stun:stun.l.google.com:19302?transport=udp',
    ]
}];

var audio = document.getElementById('audio');

call.onclick = function() { 
    connection.join('webrtc-floki');
}

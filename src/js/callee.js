connection.socketURL = 'https://muazkhan.com:9001/';

connection.session = { 
    audio: true, 
    video: false,
    oneway: true
};

connection.sdpConstraints.mandatory= {
    OfferToRecieveAudio: true
};

connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',

        'stun:stun.l.google.com:19302?transport=udp',
    ]
}];


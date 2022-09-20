console.log('callee working'); 

// Selectors
var error = document.getElementById('error');
var noSupport = document.getElementById('noSupport');
var audio = document.getElementById('callee');
var connection = new RTCMultiConnection();

connection.socketURL = 'https://muazkhan.com:9001/';
connection.session = {
    audio: false, 
    video: false
}

connection.iceServers = [{
    'urls': [
        'stun:stun.l.google.com:19302',
        'stun:stun1.l.google.com:19302',
        'stun:stun2.l.google.com:19302',

        'stun:stun.l.google.com:19302?transport=udp',
    ]
}];

connection.dontCaptureUserMedia = true;

connection.checkPresence('webrtc-floki', function(isRoomExist, roomid){
        if (isRoomExist === true){
            connection.onstream = function(event) { 
                audio.src = URL.createObjectURL(event.stream);

                console.log('Stream is considered audio:' + event.stream.isAudio);
                console.log('Stream is considered video:' + event.stream.isVideo);

            }
            //connection.join(roomid);
            console.log('Connected succesfully');
        } else { 

            console.log('Room is not present');
            var text = document.createTextNode("La stanza non e' stata creata; Contattare la guida.");
            error.appendChild(text);
        
        }
    
});




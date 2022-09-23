var connection = new RTCMultiConnection();
var join = document.getElementById('join');
var call = document.getElementById('open');

connection.socketURL = "https://muazkhan.com:9001/";

connection.session = {
    audio: true, 
    video: false
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true, 
    OfferToReceiveVideo: false
};

var videosContainer = document.getElementById('videos-container');
var remote = document.getElementById('remote');

connection.onstream = function(event) { 
    var video = event.mediaElement;

    if (event.type === 'remote'){
        console.log('remote video');
        remote.appendChild(video);
    }

    if (event.type === 'local'){
        console.log('local video');
        videosContainer.appendChild(video);
    }

};

console.log('giorgia');

join.onclick = function() {
    this.disabled = true;
    connection.join('webrtc-flokii');
}

call.onclick = function() {
    this.disabled = true; 
    connection.open('webrtc-flokii')
}


/*
TODO: Reconnection on drop connection
TODO: Write better containers 
*/


var connection = new RTCMultiConnection();
var join = document.getElementById('join');
var call = document.getElementById('open');

connection.socketURL = "https://muazkhan.com:9001/";

connection.enableLogs = false; 

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
    OfferToReceiveAudio: false, 
    OfferToReceiveVideo: false
};

var videosContainer = document.getElementById('videos-container');
var remote = document.getElementById('remote');

connection.onstream = function(event) { 
    var video = event.mediaElement;

    //add for existing removal (Remove your ownly created and leave only the hosts)

    if (event.type === 'remote'){
        console.log('remote video');
        remote.appendChild(video);
    }

    if (event.type === 'local'){
        console.log('local video');
        videosContainer.appendChild(video);
    }

};

join.onclick = function() {
    this.disabled = true;
    connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: false
    };

    connection.join('webrtc-floki');
}

call.onclick = function() {
    this.disabled = true; 
    connection.openOrJoin('webrtc-floki');
}


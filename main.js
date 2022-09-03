import firebase from 'firebase/app';
import 'firebase/firestore';
//Firestore configuration
const firebaseConfig = {
    apiKey: "AIzaSyCIywuoG8qC2ykaP3dFeBFG7UflnEjB2Xg",
    authDomain: "webrtc-floki.firebaseapp.com",
    databaseURL: "https://webrtc-floki-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "webrtc-floki",
    storageBucket: "webrtc-floki.appspot.com",
    messagingSenderId: "9945580836",
    appId: "1:9945580836:web:5ce98e36d0556bb99adfb1"
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const firestore = firebase.firestore();
  
  // Ice + candidates set to normal google 
  const servers = { 
    iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302',
           'stun:stun2.l.google.com:19302'],
        },
      ],
      iceCandidatePoolSize: 10,
  }
  const constraints = {
      audio: true
  }
  const pc = new RTCPeerConnection(servers);
  let localStream = null; 
  let remoteStream = null;
  
  //call button, remove if necessary
  const callButton = document.getElementById('call');
  //answerbutton for other page 
  const answerButton = document.getElementById('answer')
  //answer before call for other reasons 
  try{
  answerButton.onclick = async () => {
    let id; 
    const preCallId = await firestore.collection('calls')
    .orderBy('objTimestamp', 'desc')
    .limit(1)
    .get()
    .then((data) => {
        data.forEach((doc) => {
            // console.log(doc.id); ID is correct; 
            id = doc.id;
        });
    });
    
    //Remember to try except for doc id
    const callId = id;
    const callDoc = firestore.collection('calls').doc(callId);
    const answerCandidates = callDoc.collection('answerCandidates');
    const offerCandidates = callDoc.collection('offerCandidates');
    // Replay remote stream 
    remoteStream = new MediaStream();
    pc.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };
    // add remote stream to audioplay 
    const audioplay = document.getElementById('audio');
    audioplay.srcObject = remoteStream;
    pc.onicecandidate = (event) => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
        console.log(event.candidate && answerCandidates.add(event.candidate.toJSON()));
    };
    const callData = (await callDoc.get()).data();
    const offerDescription = callData.offer;
    await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    // This may be useless
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);
    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
    };
    await callDoc.update({answer});
    offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            console.log(change);
            if (change.type === 'added'){
                let data = change.doc.data();
                pc.addIceCandidate(new RTCIceCandidate(data));
            }
        })
    })
}
} catch(err){ 
    console.log('undefined answerButton, user is on call page')
}
try{
  callButton.onclick = async () => {
    
    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    
   //CALLER tracks
   localStream.getTracks().forEach((track) => {
    pc.addTrack(track, localStream);
  });
  // CALLEE tracks
  pc.ontrack = (event) => {
    event.streams[0].getTracks().forEach((track) => {
      remoteStream.addTrack(track);
    });
  };
    // Create an offer and send to firebase 
    //timestamp in seconds for easy retrieval
    // GREATER IS LAST!! 
    var timestamp = firebase.firestore.Timestamp.fromDate(new Date());
    const callDoc = firestore.collection('calls').doc();
    const db = firestore.collection('calls');
    const offerCandidates = callDoc.collection('offerCandidates');
    const answerCandidates = callDoc.collection('answerCandidates');
    // callDoc.id is the id TO CALL!!!!!!
    // Get candidatesfor caller and save them 
    pc.onicecandidate = (event) => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
    };
    // Create offer 
    const offerDescription = await pc.createOffer();
    await pc.setLocalDescription(offerDescription);
    const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type
    };
    console.log("The offer is:" + {offer})
    const objTimestamp = String(timestamp.seconds)
    // also add a timestamp for further calling 
    await callDoc.set({objTimestamp, offer})
    //Remote answer 
    callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        if (!pc.currentRemoteDescription && data?.answer){
            const answerDescription = new RTCSessionDescription(data.answer);
            pc.setRemoteDescription(answerDescription);
        }
    });
    // add canddidate on aswer 
    answerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
            if (change.type === 'added'){
                const candidate = new RTCIceCandidate(change.doc.data());
                pc.addIceCandidate(candidate);
            }
        })
    })
    console.log('end of the line ');
  };
} catch(err){
    console.log('User is in answer page');
}
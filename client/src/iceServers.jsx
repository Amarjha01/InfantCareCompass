import SimplePeer from 'simple-peer';

const peer = new SimplePeer({
    initiator: true,
    trickle: false,
    config: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Google's public STUN server
        { 
          urls: "turn:your.turn.server",
          username: "username",
          credential: "password"
        }
      ],
    },
  });
  
export default peer;
import { useCallback, useEffect, useReducer, useRef, useState } from "react"
import { useStateWithCallback } from "./useStateWithCallback"
import {socketInit }from "../socket"
import { ACTIONS } from "../action"
import freeice from "freeice"

const users=[
    {

    },
    {

    }
]

export const useWebRTC=()=>{
    const [client,setClient]=useStateWithCallbacK(users);

const audioElement=useRef({});
//hum user ki id ko store krenge taki user ki id ko get krke hum player ko manipulate kr paye

const connections=useRef({});
const localMediaStream=useRef(null);
const socketRef=useRef()

useEffect(()=>{
socketRef.current=socketInit()
},[])




const provideRef=(instance,userId)=>{
audioElement.current[userId]=instance
}

const addNewClients=useCallback((newClient,cb)=>{
    
const lookingFor=client.find((client)=>client._id===newClient._id);
if(lookingFor===undefined){
    setClient((prev)=>[...prev,newClient],cb)
}

},[client,setClient])


//ab humre pass jitne vi player honge woh sare humare pass mapping hogi konse user ka konsa player he
//ab hum easily kisi vi user ko mute unmute kr sakte he

//now-- ab hume audio capture krna he humare computer se 
//humare browser ke andar ek navigator naam ka object rehta he 
//

useEffect(()=>{

const startCapture=async()=>{
localMediaStream.current=await navigator.mediaDevices.getUserMedia({
    audio:true
})
}
startCapture().then(()=>{
addNewClients(userId,()=>{
    const localElement=audioElement.current[userId]
    if(localElement){
        localElement.volume=0;  //agar 0 nai kroge to app hi apne voice ko dubara sunoge
        localElement.srcObject=localMediaStream.current

    }
    //now how to add second client
    //isko ab hum server pe bhejenge with websocket


    //pehle to bhum join emit krnenge because hume pehle khud ko websocket se join krna he 

socketInit.current.emit(ACTIONS.JOIN,{roomId,userId})


})
})

},[])





useEffect(()=>{

    const handleNewPeer=async ({peerId,createOffer,user:remoteUser})=>{

//how to add peer
//check ki jo connection he hamare 
//usme pehle se ye peer he ki nai
if(peerId in connections.current){
    return console.log(`u r alrady connected wth peerid`)
}
//agar cnnction ke andar client nai he to 
//humare connection ke anadar jo  current client aa raha he 
//uska ek webRtc ka object bana ke ..usko connection ke andar store krenege
//APKA jo local machine hota he
//usko apni router ki public id Pata nai hoti he 
//iceserver apke computer ko batate he ki ..apki public id konsi hoti he
//
connections.current[peerId]=new RTCPeerConnection({
    iceServers:freeice()

})
//handle new icecandidate 

//jitne vi new icecandidate mil jate he ...hume turant 
//usko dusre client ko bhejne he ..taki woh vi add kr paye

connections.current[peerId].onicecandidate=(event)=>{
    socket.current.emit(ACTIONS.RELAY_ICE,{
        peerId,
icecandidate:event.candidate
    })


}

/// hqandle on 
connections.current[peerId].ontrack=({
    streams:[remoteStream]
})=>{
    addNewClients(remoteUser,()=>{
        if(audioElement.current[remoteUser._id]){
            audioElement.current[remoteUser._id].srcObject=remoteStream
        }else{

            let settled=false;
            const interval=setInterval(()=>{
                if(audioElement.current[remoteUser._id]){
                    audioElement.current[remoteUser._id].srcObject=remoteStream
                    settled=true;

                }
                if(settled){
                    clearInterval(interval)
                }
            },1000)
        }
    })
}

//jitne vi humare local media stream he 
//woh hume har ek track add krna he is connection ke andar
//taki humara voice dusre client ko chala jaye
//dusre cliemnt ka jo connection he uske andar jo stream humari he woh connect ho jaye

localMediaStream.current.getTracks().forEach(track=>{
    connections.current[peerId].addTrack(track,localMediaStream.current)
})


//offer creation
if(createOffer){
    const offer=await connections.current[peerId].createOffer();

    //send offer to another client
    socket.current.emit(ACTIONS.RELAY_SDP,{
        peerId,
        sessionDescription:offer
    })
}


    }

    socket.current.on(ACTIONS.ADD_PEER,handleNewPeer)
return ()=>{
    socket.current.off(ACTIONS.ADD_PEER)
}

},[])

return {client,provideRef}
}
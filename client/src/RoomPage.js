import React from 'react'
import {ZegoUIKitPrebuilt} from '@zegocloud/zego-uikit-prebuilt'
import { useParams } from 'react-router-dom'
import { ZegoSuperBoardManager } from "zego-superboard-web";
import './Video.css'
const RoomPage = () => {
    const {roomId} = useParams();
    const myMeeting= async (element)=>{
        const appID= 1990273576;
        const serverSecret="8717baa9d5ce6b5b4f156246b9e05554";
        const kitToken=ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,roomId,Date.now().toString(),"sreek");
        const zp=ZegoUIKitPrebuilt.create(kitToken);
        zp.addPlugins({ZegoSuperBoardManager});
        zp.joinRoom({
            container:element,
            scenario:{
                mode:ZegoUIKitPrebuilt.VideoConference,
            },
        })
    }
  return (
    <div className='room-page'>
        <div ref={myMeeting}/>
    </div>
  )
}

export default RoomPage
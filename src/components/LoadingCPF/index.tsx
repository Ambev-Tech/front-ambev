import React from 'react';
import Lottie from 'react-lottie';
import animationData from './LoadingCPF.json';

const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
};

export const LoadingCPF:React.FC = () => {

    return(
        <div style={{display:"flex",height:"100%",pointerEvents:"none",width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Lottie options={defaultOptions}
              height={"20rem"}
              width={"20rem"}
              isStopped={false}
              isPaused={false}/>
        </div>
    );
}
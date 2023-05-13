import { useCallback, useEffect, useRef, useState } from "react"

export const useStateWithCallback=(initialstate)=>{


const [state,setState]=useState(initialstate);

const cbRef=useRef()


const updateState=useCallback((newState,cb)=>{
    cbRef.current=cb
    setState((prev)=>{
        return typeof newState==='function'?newState(prev):newState;
    })
},[])

useEffect(()=>{
    if(cbRef.current){
        cbRef.current(state);
        cbRef.current=null
    }


},[state])

return [state,updateState]

}


//ye customhooke bana rahe he jisme hum callback denge
// woh basically run hoga woh wali state-(useWebRTC wali) update hone ke baad


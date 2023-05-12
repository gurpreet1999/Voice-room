import { useEffect, useState } from "react";
import { setAuth } from "../store/authSlice";
import axios from "axios";
import { useDispatch } from "react-redux";


export function useLoadingWithRefresh(){
    const [loading,setLoading]=useState(true)
    const dispatch = useDispatch();
    useEffect(()=>{
        (async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:5000/api/refresh`,
                    {
                        withCredentials: true,
                    }
                );
                dispatch(setAuth(data));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        })();
    },[])

    return { loading };
}




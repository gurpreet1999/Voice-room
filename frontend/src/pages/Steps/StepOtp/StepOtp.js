import React, { useState } from 'react'
import styles from "./StepOtp.module.css"
import Card from '../../../components/Shared/Card/Card'
import TextInput from '../../../components/Shared/TextInput/TextInput'
import Button from '../../../components/Shared/Button/Button'
import { verifyOtp } from '../../../http'
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
const StepOtp = () => {
  const [otp,setOtp]=useState()
  const { phone, hash } = useSelector((state) => state.auth.otp);
  const dispatch=useDispatch()
  
const submit=async()=>{

if(!otp || !phone || !hash) return;




    try {
        const { data } = await verifyOtp({ otp, phone, hash });
        dispatch(setAuth(data));
    } catch (err) {
        console.log(err);
    }


}

  return (
    <>
            <div className={styles.cardWrapper}>
                <Card
                    title="Enter the code we just texted you"
                    icon="lock-emoji"
                >
                    <TextInput
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <div className={styles.actionButtonWrap}>
                        <Button onClick={submit} text="Next" />
                    </div>
                    <p className={styles.bottomParagraph}>
                        By entering your number, you’re agreeing to our Terms of
                        Service and Privacy Policy. Thanks!
                    </p>
                </Card>
            </div>
        </>
  )
}

export default StepOtp
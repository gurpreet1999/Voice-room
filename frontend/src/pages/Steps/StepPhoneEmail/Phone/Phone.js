import React, { useState } from 'react'
import Card from '../../../../components/Shared/Card/Card'
import Button from '../../../../components/Shared/Button/Button'
import TextInput from '../../../../components/Shared/TextInput/TextInput'
import styles from "../StepPhoneEmail.module.css"

import { useDispatch } from 'react-redux'
import { setOtp } from '../../../../store/authSlice'
import { sendOtp } from '../../../../http'



const Phone = ({onNext}) => {

    const dispatch=useDispatch()

    const [phoneNumber,setPhoneNumber]=useState("")
    async function submit() {
        if(!phoneNumber) return;
        const { data } = await sendOtp({ phone: phoneNumber });
        console.log(data);
        dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        onNext();
    }

  return (
    <Card title="Enter you phone number" icon="phone">
    <TextInput
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
    />
    <div>
        <div className={styles.actionButtonWrap}>
            <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
            By entering your number, you’re agreeing to our Terms of
            Service and Privacy Policy. Thanks!
        </p>
    </div>
</Card>
  )
}

export default Phone
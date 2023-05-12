import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styles from './StepName.module.css';
import Button from '../../../components/Shared/Button/Button';
import TextInput from '../../../components/Shared/TextInput/TextInput';
import Card from '../../../components/Shared/Card/Card';
import { setName } from '../../../store/activateSlice';





const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState(name); //ye isliye kiya because suppose hum 
    //hum username daal kr agge badh gaye ..but bychance agar hum back atte he to ..woh username display hona chaiya na v.ii

    function nextStep() {
        if (!fullname) {
            return;
        }
        dispatch(setName(fullname));
        onNext();
    }
    return (
        <>
            <Card title="What’s your full name?" icon="goggle-emoji">
                <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p className={styles.paragraph}>
                    People use real names at codershouse :) !
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div>
            </Card>
        </>
    );
};

export default StepName;
import React, { useState } from 'react';

import styles from './StepAvatar.module.css';
import { useSelector, useDispatch } from 'react-redux';


import { setAuth } from '../../../store/authSlice';
import Card from '../../../components/Shared/Card/Card';
import Button from '../../../components/Shared/Button/Button';
import { setAvatar } from '../../../store/activateSlice';
import {activate} from "../../../http/index"

const StepAvatar = ({ onNext }) => {
    const dispatch = useDispatch();
    const { name, avatar } = useSelector((state) => state.activate);
    const [image, setImage] = useState('/images/monkey-avatar.png');
    const [loading, setLoading] = useState(false);
    const [unMounted, setUnMounted] = useState(false);
    function captureImage(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        //humari image file format he ..hume isse base64 string me convert krna hoga

        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
            // ye hum isliye kr rahe he because agar hum back chale jate he to ..and fir se atte he ..and ye component fir se 
            // render hoga and humari image nai rahegi ..this is not a good user experience 
        };
    }
    async function submit() {
        if (!name || !avatar) return;
        setLoading(true);
        try {
            const { data } = await activate({ name, avatar });
            if (data.auth) {
                if (!unMounted) {
                    dispatch(setAuth(data));
                }
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

//let fix bugs--jab vi hum react me promises ke sath kaam krte he..react me ye memory leak --wala issue aa jata he
////promise ke sath jab hum kaam krte he to ye gurantee nai he ki
//suppose humara promise complete hone se pehle navigate ho gya dusra component
//uski vajah se ..agge ka code run nai hoga
//kyunki component pehle unmont  ho ja raha he
//

    useEffect(() => {
        return () => {
            setUnMounted(true);
        };
    }, []);

    if (loading) return <Loader message="Activation in progress..." />;
    return (
        <>
            <Card title={`Okay, ${name}`} icon="monkey-emoji">
                <p className={styles.subHeading}>How’s this photo?</p>
                <div className={styles.avatarWrapper}>
                    <img
                        className={styles.avatarImage}
                        src={image}
                        alt="avatar"
                    />
                </div>
                <div>
                    <input
                        onChange={captureImage}
                        id="avatarInput"
                        type="file"
                        className={styles.avatarInput}
                    />
                    <label className={styles.avatarLabel} htmlFor="avatarInput">
                        Choose a different photo
                    </label>

                    {/* see with the help of htmlFor humne input ko connect kiya he */}
{/* //this is also best option ..we dont neeed to use javascript and do input.click() */}
{/* humne input ka display none kr rakha he */}

                </div>
                <div>
                    <Button onClick={submit} text="Next" />
                </div>
            </Card>
        </>
    );
};

export default StepAvatar;
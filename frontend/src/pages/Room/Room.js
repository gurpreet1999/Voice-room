import React, { useState } from 'react'
import { useWebRTC } from '../../hooks/useWebRTC';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Room = () => {

    const {id:roomId}=useParams()
    const {user}=useSelector(state=>state.auth)

 const {client,provideRef}=useWebRTC(roomId,user)


  return (
    <div>
    <div className="container">
        <button onClick={handManualLeave} className={styles.goBack}>
            <img src="/images/arrow-left.png" alt="arrow-left" />
            <span>All voice rooms</span>
        </button>
    </div>
    <div className={styles.clientsWrap}>
        <div className={styles.header}>
            {room && <h2 className={styles.topic}>{room.topic}</h2>}
            <div className={styles.actions}>
                <button className={styles.actionBtn}>
                    <img src="/images/palm.png" alt="palm-icon" />
                </button>
                <button
                    onClick={handManualLeave}
                    className={styles.actionBtn}
                >
                    <img src="/images/win.png" alt="win-icon" />
                    <span>Leave quietly</span>
                </button>
            </div>
        </div>
        <div className={styles.clientsList}>
            {clients.map((client) => {
                return (
                    <div className={styles.client} key={client.id}>
                        <div className={styles.userHead}>
                            <img
                                className={styles.userAvatar}
                                src={client.avatar}
                                alt=""
                            />
                            <audio
                                autoPlay
                                ref={(instance) => {
                                    provideRef(instance, client.id);
                                }}
                            />
                            {/* ref ke andar variable vi de sakte and function vi de sakte he */}
                            {/* function ke andar hume recieve ho jayega--means..ye funcyon hume callback deti he jiske andar hume curremnt 
                             audio element ka instance mil jata he */}


                            <button
                                onClick={() =>
                                    handleMuteClick(client.id)
                                }
                                className={styles.micBtn}
                            >
                                {client.muted ? (
                                    <img
                                        className={styles.mic}
                                        src="/images/mic-mute.png"
                                        alt="mic"
                                    />
                                ) : (
                                    <img
                                        className={styles.micImg}
                                        src="/images/mic.png"
                                        alt="mic"
                                    />
                                )}
                            </button>
                        </div>
                        <h4>{client.name}</h4>
                    </div>
                );
            })}
        </div>
    </div>
</div>
  )
}

export default Room
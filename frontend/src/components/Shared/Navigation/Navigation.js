import React from 'react'
import { Link } from 'react-router-dom'
import styles from "./Navigation.module.css"
import { setAuth } from '../../../store/authSlice';
import { logout } from '../../../http';







const Navigation = () => {


  const dispatch=useDispatch()
  const {isAuth}=useSelector(state=>state.auth)

  async function logoutUser() {
    try {
        const { data } = await logout();
        dispatch(setAuth(data));
    } catch (err) {
        console.log(err);
    }
}


  return (
   <nav className={`${styles.navbar} container ` }  >
    <Link to={"/"} className={styles.brandStyle} >
        <img src="/images/logo.png"  alt='logo'/>
        <span className={styles.logotext} >Codershouse</span>
    </Link>
    {isAuth && (
                <div className={styles.navRight}>
                    <h3>{user?.name}</h3>
                    <Link to="/">
                        <img
                            className={styles.avatar}
                            src={
                                user.avatar
                                    ? user.avatar
                                    : '/images/monkey-avatar.png'
                            }
                            width="40"
                            height="40"
                            alt="avatar"
                        />
                    </Link>
                    <button
                        className={styles.logoutButton}
                        onClick={logoutUser}
                    >
                        <img src="/images/logout.png" alt="logout" />
                    </button>
                </div>
            )}
   </nav>
  )
}

export default Navigation
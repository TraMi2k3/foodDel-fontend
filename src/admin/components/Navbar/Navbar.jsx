import { useNavigate } from 'react-router-dom'
import { assets } from '../../assets/assets'
import './navbar.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <div className="navbarad">
        <img src={assets.logo} alt="" className="logo" />
        <div className="info">
          <span>Admin Panel</span>
          <img src={assets.profile_image} alt="" className="profile" />  
          <span className='pad'></span> 
          <div className='logout' onClick={logout}>
              <img src={assets.logout_icon} alt="" />
              <p>Logout</p>
          </div>           
        </div>
    </div>
  )
}


export default Navbar

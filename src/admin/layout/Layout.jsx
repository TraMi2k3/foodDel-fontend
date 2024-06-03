import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar/Navbar';
import Sidebar from '../components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
        <Navbar/>
        <hr />
        <div style={{display: 'flex'}}>
          <Sidebar />
          <Outlet />
        </div>
    </div>
  )
}

export default Layout

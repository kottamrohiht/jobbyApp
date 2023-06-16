import {withRouter, Link} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    //  const token = Cookies.get('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link to="/" className="link-el-logo">
        <img src={websiteLogo} alt="website logo" className="header-logo" />
      </Link>
      <ul className="headericons-container">
        <Link to="/" className="link-el">
          <li>
            <AiFillHome className="react-icon" />
          </li>
        </Link>
        <Link to="/jobs" className="header-link">
          <li>
            <BsFillBriefcaseFill className="react-icon" />
          </li>
        </Link>
        <button
          data-testid="logoutButton"
          type="button"
          onClick={onClickLogout}
          className="react-icon react-icon-button"
        >
          <FiLogOut className="react-icon" />
        </button>
      </ul>

      <ul className="header-inner-container">
        <div className="home-jobs-container">
          <Link to="/" className="link-el">
            <li className="link-home"> Home </li>
          </Link>
          <Link to="/jobs" className="header-link">
            <li className="link-home"> Jobs </li>
          </Link>
        </div>

        <button
          data-testid="logoutButton"
          onClick={onClickLogout}
          className="logoutButton"
          type="button"
        >
          Logout
        </button>
      </ul>
    </div>
  )
}

export default withRouter(Header)

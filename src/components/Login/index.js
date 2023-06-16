import {Component} from 'react'

import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhaHVsIiwicm9sZSI6IlBSSU1FX1VTRVIiLCJpYXQiOjE2MTk2Mjg2MTN9.nZDlFsnSWArLKKeF0QbmdVfLgzUbx1BGJsqa2kc_21Y'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrMsg: false,
    errMsg: '',
  }

  navigateToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })

    this.setState({
      username: '',
      password: '',
      errMsg: false,
      showErrMsg: '',
    })

    this.navigateToHome()
  }

  loginFailure = errorMsg => {
    this.setState({
      showErrMsg: true,
      errMsg: errorMsg,
    })
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userObj = {username, password}

    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userObj),
    }

    const response = await fetch(loginUrl, options)
    if (response.ok) {
      const data = await response.json()
      const token = data.jwt_token
      this.loginSuccess(token)
    } else {
      const data = await response.json()
      const errorMsg = data.error_msg
      this.loginFailure(errorMsg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUsernameFeid = () => {
    const {username} = this.state

    return (
      <div className="username-container">
        <label htmlFor="usernameFeild" className="usernameFeild">
          {' '}
          USERNAME{' '}
        </label>
        <input
          type="text"
          id="usernameFeild"
          value={username}
          placeholder="Username"
          className="username-input"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordFeild = () => {
    const {password} = this.state

    return (
      <div className="username-container">
        <label htmlFor="passwordFeild" className="usernameFeild">
          PASSWORD
        </label>
        <input
          type="password"
          id="passwordFeild"
          value={password}
          placeholder="Password"
          className="username-input"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {showErrMsg, errMsg} = this.state
    const token = Cookies.get('jwt_token')
    const websiteLogo = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'
    return token !== undefined ? (
      <Redirect to="/" />
    ) : (
      <div className="login-container">
        <form className="form-container" onSubmit={this.onSubmitForm}>
          <img src={websiteLogo} alt="website logo" className="websiteLogo" />
          {this.renderUsernameFeid()}
          {this.renderPasswordFeild()}

          <button type="submit" className="submitButton">
            Login
          </button>
          {showErrMsg && <p className="error">*{errMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login

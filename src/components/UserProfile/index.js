import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAIL',
}

class UserProfile extends Component {
  state = {
    profileDetails: {},
    apiStatus: apiStatusConstants.loading,
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const apiUrl = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok) {
      const data = await response.json()
      const userObj = data.profile_details
      const updatedData = {
        profileImageUrl: userObj.profile_image_url,
        name: userObj.name,
        shortBio: userObj.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getData()
  }

  renderProfile = () => {
    const {profileDetails} = this.state
    const {profileImageUrl, name, shortBio} = profileDetails

    return (
      <div className="user-profile-container">
        <img src={profileImageUrl} alt="profile" className="profileImageUrl" />
        <h1 className="name"> {name} </h1>
        <p className="shortBio"> {shortBio} </p>
      </div>
    )
  }

  renderLoadingVIew = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailurView = () => (
    <button onClick={this.onClickRetry} type="button" className="retry-button">
      Retry
    </button>
  )

  renderProfileDeatils = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingVIew()
      case 'SUCCESS':
        return this.renderProfile()
      case 'FAIL':
        return this.renderFailurView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-main-container">
        {this.renderProfileDeatils()}
      </div>
    )
  }
}

export default UserProfile

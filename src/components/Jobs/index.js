import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import UserProfile from '../UserProfile'
import EmploymentType from '../EmploymentType'
import SalaryRange from '../SalaryRange'
import JobCard from '../JobCard'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAIL',
}

/*

  renderNoItemsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-heading"> No Jobs Found </h1>
      <p className="no-para">We could not find any jobs.Try others filters.</p>
    </div>
  )

*/

class Jobs extends Component {
  state = {
    userInput: '',
    employmentType: [],
    minPackage: '0',
    totalJobsList: [],
    apiStatus: apiStatusConstants.loading,
  }

  componentDidMount = () => {
    this.getFetchData()
  }

  getFetchData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const {userInput, employmentType, minPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const newString = employmentType.join()

    const jobsApi = `https://apis.ccbp.in/jobs?employment_type=${newString}&minimum_package=${minPackage}&search=${userInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobsApi, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        title: each.title,
        rating: each.rating,
        location: each.location,
        employmentType: each.employment_type,
        packagePerAnnum: each.package_per_annum,
        jobDescription: each.job_description,
      }))

      this.setState({
        totalJobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateMinPackage = amount => {
    this.setState(
      {
        minPackage: amount,
      },
      this.getFetchData,
    )
  }

  uncheckEmployment = type => {
    const {employmentType} = this.state
    const filteredJobs = employmentType.filter(each => each !== type)

    this.setState({employmentType: filteredJobs}, this.getFetchData)
  }

  onChangeEmploymentType = type => {
    this.setState(
      prevState => ({
        employmentType: [...prevState.employmentType, type],
      }),
      this.getFetchData,
    )
  }

  onChangeUserinput = event => {
    this.setState({
      userInput: event.target.value,
    })
  }

  onClickSearchIcon = () => {
    this.getFetchData()
  }

  renderJobsList = () => {
    const {totalJobsList} = this.state

    const listLen = totalJobsList.length

    return (
      <div className="JobCard-container">
        {listLen > 0 ? (
          <ul className="job-unordered-list">
            {totalJobsList.map(each => (
              <JobCard key={each.id} item={each} />
            ))}
          </ul>
        ) : (
          <>
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-heading"> No Jobs Found </h1>
            <p className="no-para">
              We could not find any jobs.Try others filters.
            </p>
          </>
        )}
      </div>
    )
  }

  onClickRetry = () => {
    this.getFetchData()
  }

  renderLoadingVIew = () => (
    <div className="loader-container-1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailurView = () => (
    <div className="api-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for. </p>
      <button
        data-testid="retry button"
        onClick={this.onClickRetry}
        type="button"
        className="retry-button retry-button-jobs"
      >
        Retry
      </button>
    </div>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingVIew()
      case 'SUCCESS':
        return this.renderJobsList()
      case 'FAIL':
        return this.renderFailurView()

      default:
        return null
    }
  }

  render() {
    const {userInput} = this.state

    return (
      <div className="jobs-man-container">
        <Header />
        <div className="jobs-inner-container">
          <div className="input-container">
            <input
              type="search"
              value={userInput}
              className="jobs-input"
              onChange={this.onChangeUserinput}
              placeholder="Search"
            />
            <button
              onClick={this.onClickSearchIcon}
              type="button"
              className="search-button-icon-bs"
              data-testid="searchButton"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>

          <div className="user-specification-container">
            <UserProfile />
            <hr className="hrLine" />
            <ul className="employment-type-unorder-list">
              <EmploymentType
                onChangeEmploymentType={this.onChangeEmploymentType}
                uncheckEmployment={this.uncheckEmployment}
              />
            </ul>
            <hr className="hrLine" />
            <ul className="employment-type-unorder-list">
              <SalaryRange
                updateMinPackage={this.updateMinPackage}
                removePackage={this.removePackage}
              />
            </ul>
          </div>

          <div className="job-list-items-container">
            <div className="input-container2">
              <input
                type="search"
                value={userInput}
                className="jobs-input"
                onChange={this.onChangeUserinput}
                placeholder="Search"
              />
              <button
                onClick={this.onClickSearchIcon}
                type="button"
                className="search-button-icon-bs"
                data-testid="searchButton"
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderApiStatus()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs

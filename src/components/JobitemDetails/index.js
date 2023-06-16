import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'

import JobcardDetails from '../JobcardDetails'

import './index.css'

const apiStatusConstants = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAIL',
}

class JobitemDetails extends Component {
  state = {
    jobDetails: {},
    skills: [],
    lifeatCompany: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.loading,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApi = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(jobDetailsApi, options)
    if (response.ok) {
      const newData = await response.json()
      const data = newData.job_details

      const updatedSkills = data.skills.map(each => ({
        id: each.name,
        name: each.name,
        imageUrl: each.image_url,
      }))

      const lifeAtCompany = data.life_at_company

      const updatedAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const updatedJobDetails = {
        id: data.id,
        companyLogoUrl: data.company_logo_url,
        title: data.title,
        rating: data.rating,
        location: data.location,
        employmentType: data.employment_type,
        packagePerAnnum: data.package_per_annum,
        companyWebsiteUrl: data.company_website_url,
        jobDescription: data.job_description,
      }

      const similarJobs = newData.similar_jobs
      const updatedSimilarJobs = similarJobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        title: each.title,
        rating: each.rating,
        jobDescription: each.job_description,
        location: each.location,
        employmentType: each.employment_type,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        lifeatCompany: updatedAtCompany,
        similarJobsList: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLifeatCompany = () => {
    const {lifeatCompany} = this.state
    const {description, imageUrl} = lifeatCompany

    return (
      <div className="life-at-company-continer">
        <div className="life-at-inner-container">
          <h1 className="life-at-heading">Life at Company</h1>
          <p className="life-at-description"> {description} </p>
        </div>
        <img src={imageUrl} alt="life at company" className="lifeat-img" />
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobItemDetails()
  }

  renderJobListItemDetails = () => {
    const {jobDetails, skills, similarJobsList} = this.state

    return (
      <div className="jobsItem-skills-life-outer-container">
        <div className="jobsItem-skills-life-container">
          <JobcardDetails jobDetails={jobDetails} />
          <h1 className="skills-heading"> Skills </h1>
          <ul className="skill-maincontainer">
            {skills.map(each => (
              <Skills key={each.id} item={each} />
            ))}
          </ul>
          {this.renderLifeatCompany()}
        </div>
        <h1 className="similar-jobs-heading"> Similar Jobs </h1>
        <ul className="similar-maincontainer">
          {similarJobsList.map(each => (
            <SimilarJobs key={each.id} item={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingVIew = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailurView = () => (
    <div className="jobsapi-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImg-jobsApi"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for. </p>
      <button
        onClick={this.onClickRetry}
        type="button"
        className="retry-button retry-button-jobs"
      >
        Retry
      </button>
    </div>
  )

  renderJobsDataApiConatans = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'LOADING':
        return this.renderLoadingVIew()
      case 'SUCCESS':
        return this.renderJobListItemDetails()
      case 'FAIL':
        return this.renderFailurView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="jobitem-details-container-main">
        <Header />
        {this.renderJobsDataApiConatans()}
      </div>
    )
  }
}

export default JobitemDetails

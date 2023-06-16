import {Component} from 'react'

import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

class JobcardDetails extends Component {
  render() {
    const {jobDetails} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = jobDetails

    return (
      <div className="list-item1">
        <div className="img-title-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="companyLogoUrl"
          />
          <div className="title-rating-container">
            <h1 className="title"> {title} </h1>
            <div className="rating-star-container">
              <BsFillStarFill className="star" />
              <p className="rating"> {rating} </p>
            </div>
          </div>
        </div>

        <div className="loaction-emptype-package-container1">
          <div className="location-internship-container1">
            <div className="location-container">
              <MdLocationOn className="loaction-icon" />
              <p className="location"> {location} </p>
            </div>

            <div className="location-container">
              <BsBriefcaseFill className="loaction-icon-briefcase" />
              <p className="location"> {employmentType} </p>
            </div>
          </div>

          <p className="packagePerAnnum"> {packagePerAnnum} </p>
        </div>

        <hr className="hr-line" />

        <div className="description-anchor-container">
          <h1 className="description"> Description </h1>
          <a
            rel="noreferrer"
            href={companyWebsiteUrl}
            target="_blank"
            className="companyWebsiteUrl"
          >
            Visit
          </a>
        </div>
        <p className="jobDescription"> {jobDescription} </p>
      </div>
    )
  }
}

export default JobcardDetails

import {Component} from 'react'

import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

class SimilarJobs extends Component {
  render() {
    const {item} = this.props
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
    } = item

    return (
      <li className="similar-list-item">
        <div className="similar-img-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-companyLogoUrl"
          />
          <div className="similar-title-rating-container">
            <h1 className="similar-title"> {title} </h1>
            <div className="similar-rating-star-container">
              <BsFillStarFill className="similar-star" />
              <p className="similar-rating"> {rating} </p>
            </div>
          </div>
        </div>

        <h1 className="similar-description"> Description </h1>
        <p className="similar-jobDescription"> {jobDescription} </p>

        <div className="similar-location-internship-container">
          <div className="similar-location-container">
            <MdLocationOn className="similar-loaction-icon" />
            <p className="similar-location"> {location} </p>
          </div>

          <div className="similar-location-container">
            <BsBriefcaseFill className="similar-loaction-icon-briefcase" />
            <p className="similar-location"> {employmentType} </p>
          </div>
        </div>
      </li>
    )
  }
}

export default SimilarJobs

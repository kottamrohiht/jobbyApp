import {Component} from 'react'

import {Link} from 'react-router-dom'

import {BsFillStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

class JobCard extends Component {
  render() {
    const {item} = this.props
    const {
      id,
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
    } = item

    return (
      <Link to={`/jobs/${id}`} className="link-item">
        <li className="list-item">
          <div className="img-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
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

          <div className="loaction-emptype-package-container">
            <div className="location-internship-container">
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

          <h1 className="description"> Description </h1>
          <p className="jobDescription"> {jobDescription} </p>
        </li>
      </Link>
    )
  }
}

export default JobCard

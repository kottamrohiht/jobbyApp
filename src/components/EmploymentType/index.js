import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const EmploymentType = props => {
  const {onChangeEmploymentType, uncheckEmployment} = props

  const onCheckLabel = event => {
    if (event.target.checked) {
      onChangeEmploymentType(event.target.value)
    } else {
      uncheckEmployment(event.target.value)
    }
  }

  const renderemploymentTypesList = each => (
    <li key={each.employmentTypeId} className="checkbox-container">
      <input
        type="checkbox"
        name="Full Time"
        onChange={onCheckLabel}
        id={each.employmentTypeId}
        className="checkbox"
        value={each.employmentTypeId}
      />
      <label htmlFor={each.employmentTypeId} className="labelEl">
        {each.label}
      </label>
      <br />
    </li>
  )

  return (
    <ul className="employment-container">
      <h1 className="employment"> Types of Employment </h1>
      {employmentTypesList.map(each => renderemploymentTypesList(each))}
    </ul>
  )
}
export default EmploymentType

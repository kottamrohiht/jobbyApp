import './index.css'

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const SalaryRange = props => {
  const {updateMinPackage} = props

  const onCheckLabel = event => {
    if (event.target.checked) {
      updateMinPackage(event.target.value)
    }
  }

  const renderemploymentTypesList = each => (
    <li key={each.salaryRangeId} className="checkbox-container">
      <input
        type="radio"
        onChange={onCheckLabel}
        name="salary"
        id={each.salaryRangeId}
        value={each.salaryRangeId}
      />
      <label htmlFor={each.salaryRangeId} className="labelEl">
        {each.label}
      </label>
      <br />
    </li>
  )

  return (
    <ul className="employment-container">
      <h1 className="employment"> Salary Range </h1>
      {salaryRangesList.map(each => renderemploymentTypesList(each))}
    </ul>
  )
}
export default SalaryRange

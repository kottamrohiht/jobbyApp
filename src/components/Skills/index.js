import './index.css'

const Skills = props => {
  const {item} = props
  const {imageUrl, name} = item

  return (
    <li className="list-skills-item-container">
      <img src={imageUrl} alt={name} className="skillsImg" />
      <p className="skillName"> {name} </p>
    </li>
  )
}

export default Skills

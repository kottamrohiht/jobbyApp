import './index.css'

const NotFound = () => {
  const notFound =
    'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

  return (
    <div className="notfound-container">
      <img src={notFound} alt="not found" className="notFound" />
      <h1 className="notFound-heading"> Page Not Found </h1>
      <p className="notFound-para">
        We&apos;re sorry,the page you requested could not be found
      </p>
    </div>
  )
}

export default NotFound

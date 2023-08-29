import {FaGithubSquare, FaFacebookSquare, FaLinkedin} from "react-icons/fa"
import "../../styles/intro.css"
const Intro = ({user, imageUrl}) => {
  
  return (
    <div id='intro' className='container'>
        <div>
          <h1>Amdadul Haque</h1>
          <h3>Software Engineere & Mern Stack developer</h3>
          <p>{user.intro}</p>
          <button><a href="#contect">Contact me</a></button>
        </div>
        <div >
          <div style={{backgroundImage: `url(${imageUrl})`}} className="blob-image"></div>
        </div>
        <div>
          <p>SCROLL</p>
          <div className="line"></div>
        </div>
        <div className='profile-link'>
          <a href="https://github.com/itz-AmdadulHaque" target="_blank" rel="noreferrer"><FaGithubSquare /></a>
          <a href="https://www.linkedin.com/in/amdadul-haque-b14246279" target="_blank" rel="noreferrer"><FaLinkedin /></a>
          <a href="https://www.facebook.com/amdadul.haque.714" target="_blank"  rel="noreferrer"><FaFacebookSquare /></a>
        </div>
        
    </div>
  )
}

export default Intro
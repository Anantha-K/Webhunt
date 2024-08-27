import React from 'react'
import '/app/team.css'

const page = () => {
  return (
    <div className="container">
      <div className="head">TEAMS</div>
      <div className="List">
        <div className="team 1">
          <div className="No">Team 1</div>
           <ul>    
            <li>Person 1</li>
            <li>Person 2</li>
           </ul>
        </div>
         <div className="team 2">
          <div className="No">Team 2</div>
           <ul>    
            <li>Person 1</li>
            <li>Person 2</li>
           </ul>
        </div>
      </div>
      <footer id="footer">
        <div className="containerr">
          <div className="copyright">
            &copy; Copyright <strong><span>IEEE FISAT SB</span></strong>.
          </div>
          <div className="credits">
            Designed with Love 💞<a href="https://www.ieee.fisat.ac.in/webcom.html?value=index">IEEE FISAT SB WebCom</a>
          </div>
        </div>
      </footer>
    </div>
    

  )
}

export default page
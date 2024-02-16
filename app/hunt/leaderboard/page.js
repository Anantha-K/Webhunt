import Head from 'next/head';
import '/Users/ananthakrishnan/Documents/Anandu/IEEEEEEEEEEEEE/Webhunt/app/leader.css';
import { cookies } from 'next/headers'
 

export default function Home() {
 
  return (
    <div className="containerr">
      <div>
        <a href="https://ieee-fisat-spectrospect.vercel.app/"><img src="/ezgif.gif" alt="" id="img" /></a>
        <div className="upper">
          <div className="card1">
            <div className="pro_pic">
              <div className="sec_pic" id="sp1"></div>
            </div>
            <div className="user_name">
              <span className="user1">AMAL DEV</span>
            </div>
            <div className="points">
              <span className="p1">1000 points</span>
            </div>
          </div>
          <div className="card2">
            <div className="pro_pic">
              <div className="sec_pic" id="sp2"></div>
            </div>
            <div className="user_name">
              <span className="user2">AMAL DEV</span>
            </div>
            <div className="points">
              <span className="p2">1000 points</span>
            </div>
          </div>
          <div className="card3">
            <div className="pro_pic">
              <div className="sec_pic" id="sp3"></div>
            </div>
            <div className="user_name">
              <span className="user3">AMAL DEV</span>
            </div>
            <div className="points">
              <span className="p3">1000 points</span>
            </div>
          </div>
        </div>
        <div className="main_heading">Web Hunt</div>
        <div className="main_heading" id="lead">Leaderboard</div>
        <div className="mid">
          <a className="main__scroll" href="#last">
            <div className="main__scroll-box">
              <svg width="80px" height="85px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11.9997 13.1716L7.04996     8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgb(0, 255, 0)">
                </path>
              </svg>
            </div>
          </a>
        </div>
        <div className="lower">

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
  );
}

'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '/app/leader.css'

export default function Page() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    let url = "/api/auth/Fetchleader";

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.message === "Leaderboard fetched successfully") {
        setLeaderboard(data.leaderboard);
      } else {
        console.error("Failed to fetch leaderboard");
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const renderTopThree = () => {
    if (leaderboard.length < 3) return null;

    const [first, second, third] = leaderboard;
    
    return (
      <div className="upper">
        <div className="card1">
          <div className="pro_pic">
            <div className="sec_pic" id="sp2"></div>
          </div>
          <div className="user_name">
            <span className="user2">{second.name}</span>
          </div>
          <div className="points">
            <span className="p2">{second.score} points</span>
          </div>
        </div>
        <div className="card2">
          <div className="pro_pic">
            <div className="sec_pic" id="sp1"></div>
          </div>
          <div className="user_name">
            <span className="user1">{first.name}</span>
          </div>
          <div className="points">
            <span className="p1">{first.score} points</span>
          </div>
        </div>
        <div className="card3">
          <div className="pro_pic">
            <div className="sec_pic" id="sp3"></div>
          </div>
          <div className="user_name">
            <span className="user3">{third.name}</span>
          </div>
          <div className="points">
            <span className="p3">{third.score} points</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="containerr">
      <div className="Contain">
        <a href="https://ieee-fisat-spectrospect.vercel.app/">
          <Image src="/ezgif.gif" alt="user image" width={100} height={100} id="img" />
        </a>
        {renderTopThree()}
        <div className="main_heading" id="lead">Web Hunt Leaderboard</div>
        <div className="List">
          <ul>
            {leaderboard.slice(3, 13).map((user, index) => (
              <li key={index} className="listno">
                <div className="part2">
                  <div className="rank_item">
                    <span className="text">{index + 4}</span>
                  </div>
                  <div className="col-name">
                    <div className="user">{user.name}</div>
                    <div className="lowpnt">{user.score} points</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="mid">
          <a className="main__scroll" href="#last">
            <div className="main__scroll-box">
              <svg width="80px" height="85px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgb(0, 255, 0)">
                </path>
              </svg>
            </div>
          </a>
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
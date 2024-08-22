'use client';
import Head from 'next/head';
import '/app/leader.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    let url = "http://localhost:3000/api/auth/Fetchleader";
    
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

  return (
    <div className="containerr">
      <div className="Contain">
        <a href="https://ieee-fisat-spectrospect.vercel.app/">
          <img src="/ezgif.gif" alt="" id="img" />
        </a>
        <div className="upper">
          {leaderboard.slice(0, 3).map((user, index) => (
            <div className={`card${index + 1}`} key={index}>
              <div className="pro_pic">
                <div className="sec_pic" id={`sp${index + 1}`}></div>
              </div>
              <div className="user_name">
                <span className={`user${index + 1}`}>{user.email}</span>
              </div>
              <div className="points">
                <span className={`p${index + 1}`}>{user.score} points</span>
              </div>
            </div>
          ))}
        </div>
        <div className="main_heading" id="lead">Web Hunt Leaderboard</div>
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
        <div className="lower">
          {leaderboard.slice(3).map((user, index) => (
            <div className="user-entry" key={index + 3}>
              <span>{user.email} - {user.score} points</span>
            </div>
          ))}
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
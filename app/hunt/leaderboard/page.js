'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import '/app/leader.css';

export default function Page() {
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch("/api/auth/Fetchleader");
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
      <div className="top-three">
        <div className="card first-place">
          <div className="medal">🥇</div>
          <div className="user-name">{first.name}</div>
          <div className="points">{first.score} points</div>
        </div>
        <div className="card second-place">
          <div className="medal">🥈</div>
          <div className="user-name">{second.name}</div>
          <div className="points">{second.score} points</div>
        </div>
        <div className="card third-place">
          <div className="medal">🥉</div>
          <div className="user-name">{third.name}</div>
          <div className="points">{third.score} points</div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <h1 className="title">Web Hunt Leaderboard</h1>
      {renderTopThree()}
      <div className="leaderboard-list">
        <ul>
          {leaderboard.slice(3).map((user, index) => (
            <li key={index} className="leaderboard-item">
              <span className="rank">{index + 4}</span>
              <span className="name">{user.name}</span>
              <span className="score">{user.score} points</span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="footer">
        <div className="copyright">
          &copy; Copyright <strong>IEEE FISAT SB</strong>.
        </div>
        <div className="credits">
          Designed with 💚 by <a href="https://www.ieee.fisat.ac.in/webcom.html?value=index">IEEE FISAT SB WebCom</a>
        </div>
      </footer>
    </div>
  );
}
import Head from 'next/head';
import styles from '/Users/ananthakrishnan/Documents/Anandu/IEEEEEEEEEEEEE/Webhunt/app/leader.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>! HuntGame !</title>
        <meta name="description" content="Your description here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <a href="https://ieee-fisat-spectrospect.vercel.app/"><img src="ezgif.gif" alt="" id="img" /></a>
        <div className={styles.upper}>
          <div className={styles.card1}>
            <div className={styles.pro_pic}>
              <div className={styles.sec_pic} id="sp1"></div>
            </div>
            <div className={styles.user_name}>
              <span className={styles.user1}>AMAL DEV</span>
            </div>
            <div className={styles.points}>
              <span className={styles.p1}>1000 points</span>
            </div>
          </div>
          <div className={styles.card2}>
            <div className={styles.pro_pic}>
              <div className={styles.sec_pic} id="sp2"></div>
            </div>
            <div className={styles.user_name}>
              <span className={styles.user2}>ADARSH</span>
            </div>
            <div className={styles.points}>
              <span className={styles.p2}>3000 points</span>
            </div>
          </div>
          <div className={styles.card3}>
            <div className={styles.pro_pic}>
              <div className={styles.sec_pic} id="sp3"></div>
            </div>
            <div className={styles.user_name}>
              <span className={styles.user3}>AMAL KARTHIK</span>
            </div>
            <div className={styles.points}>
              <span className={styles.p3}>500 points</span>
            </div>
          </div>
        </div>
        <div className={styles.main_heading}>Web Hunt</div>
        <div className={styles.main_heading} id="lead">Leaderboard</div>
        <div className={styles.mid}>
          <a className={styles.main__scroll} href="#last">
            <div className={styles.main__scroll-box}>
              <svg width="80px" height="85px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z" fill="rgb(0, 255, 0)"></path>
              </svg>
            </div>
          </a>
        </div>
        <div className={styles.lower}>
          <div className={styles.part1}>
            <div className={styles.col_name}>
              <div className={styles.rank_item}>
                <div className={styles.text}>Place</div>
              </div>
              <div className={styles.dp}>Player</div>
              <div className={styles.user}>User Name</div>
              <div className={styles.lowpnt}>Points</div>
            </div>
          </div>
          <div className={styles.part2}>
            <div className={styles.listno} id="d1">
              <div className={styles.rank_item}>
                <div className={styles.text}>4</div>
              </div>
              <div className={styles.dp} id="m4"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
            <div className={styles.listno} id="d2">
              <div className={styles.rank_item}>
                <div className={styles.text}>5</div>
              </div>
              <div className={styles.dp} id="m5"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
            <div className={styles.listno} id="d3">
              <div className={styles.rank_item}>
                <div className={styles.text}>6</div>
              </div>
              <div className={styles.dp} id="m6"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
            <div className={styles.listno} id="d4">
              <div className={styles.rank_item}>
                <div className={styles.text}>7</div>
              </div>
              <div className={styles.dp} id="m7"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
            <div className={styles.listno} id="d5">
              <div className={styles.rank_item}>
                <div className={styles.text}>8</div>
              </div>
              <div className={styles.dp} id="m8"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
            <div className={styles.listno} id="d6">
              <div className={styles.rank_item}>
                <div className={styles.text}>9</div>
              </div>
              <div className={styles.dp} id="m9"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
            <div id="last" className={styles.listno}>
              <div className={styles.rank_item}>
                <div className={styles.text}>10</div>
              </div>
              <div className={styles.dp} id="m10"></div>
              <div className={styles.user}>Amal</div>
              <div className={styles.lowpnt}>123</div>
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.copyright}>
            &copy; Copyright <strong><span>IEEE FISAT SB</span></strong>. All Rights Reserved
          </div>
          <div className={styles.credits}>
            Designed with Love 💞<a href="https://www.ieee.fisat.ac.in/webcom.html?value=index">IEEE FISAT SB WebCom</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

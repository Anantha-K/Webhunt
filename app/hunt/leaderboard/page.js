import Image from 'next/image'; // Importing Image component from Next.js
import Link from 'next/link'; // Importing Link component from Next.js
import styles from '../styles/Home.module.css'; // Importing CSS module

export default function Home() {
  return (
    <div className={styles.container}> {/* Using CSS module for styling */}
      <Link href="https://ieee-fisat-spectrospect.vercel.app/"> {/* Link to external URL */}
        <a>
          <Image
            src="ezgif.gif" // Image source
            alt="" // Alt text for image
            id="img"
            width={350} // Image width
            height={350} // Image height
          />
        </a>
      </Link>

      <div className={styles.main_heading}>Web Hunt</div> {/* Main heading */}
      <div className={styles.main_heading} id="lead">Leaderboard</div> {/* Leaderboard heading */}

      <div className={styles.mid}> {/* Mid section */}
        <Link href="#last"> {/* Link to section with id "last" */}
          <a className={styles.main__scroll}> {/* Scroll link */}
            <div className={styles.main__scroll-box}> {/* Scroll box */}
              <svg
                width="80px"
                height="85px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M11.9997 13.1716L7.04996 8.22186L5.63574 9.63607L11.9997 16L18.3637 9.63607L16.9495 8.22186L11.9997 13.1716Z"
                  fill="rgb(0, 255, 0)"
                />
              </svg>
            </div>
          </a>
        </Link>
      </div>

      <div className={styles.lower}> {/* Lower section */}
        <div className={styles.part1}> {/* Part 1 of lower section */}
          <div className={styles.col_name}> {/* Column names */}
            <div className={styles.rank_item}> {/* Rank item */}
              <div className={styles.text}>Place</div> {/* Place */}
            </div>
            <div className={styles.dp}>Player</div> {/* Player */}
            <div className={styles.user}>User Name</div> {/* User Name */}
            <div className={styles.lowpnt}>Points</div> {/* Points */}
          </div>
        </div>

        <div className={styles.part2}> {/* Part 2 of lower section */}
          <div className={styles.listno} id="d1"> {/* List number */}
            <div className={styles.rank_item}> {/* Rank item */}
              <div className={styles.text}>4</div> {/* Place */}
            </div>
            <div className={styles.dp} id="m4"></div> {/* Display picture */}
            <div className={styles.user}>Amal</div> {/* User */}
            <div className={styles.lowpnt}>123</div> {/* Points */}
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
            <div className={styles.lowpnt}>1 complete it</div> {/* Complete this line */}
          </div>
          {/* Add more list items as needed */}
        </div>
      </div>
    </div>
  )
}

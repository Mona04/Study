import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import * as styles from "./../style.scss";

const AboutPage = () => {
    const data = useStaticQuery(graphql`query {
        site {
          siteMetadata {
            title
          }
        }
      }`)

  return (
    <main>
      <h1>Test Page</h1>
      <p>{data.site.siteMetadata.title}</p>
      <Link to="/">Back to Home</Link>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
      <button id='asdf' aria-label='asdf'  className={styles.dark}></button>
    </main>
  )
}

export const Head = () => <title>About Me</title>

export default AboutPage
import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

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
      <h1>About Me</h1>
      <p>{data.site.siteMetadata.title}</p>
      <Link to="/">Back to Home</Link>
      <p>Hi there! I'm the proud creator of this site, which I built with Gatsby.</p>
    </main>
  )
}

export const Head = () => <title>About Me</title>

export default AboutPage
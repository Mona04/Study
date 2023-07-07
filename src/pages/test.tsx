import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {toggleSwitch} from "styles/controls/toggleSwitch.module.scss";

interface IProps{}
interface IState{bDarkMode: boolean}

const darkModeAttribute : string = "data-theme";
enum EDarkMode { Dark, Light };

class DarkModeToggle extends React.Component<IProps, IState>
{
  constructor(props:IProps)
  {
    super(props);

    const bPreferDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;  

    document.documentElement.setAttribute(darkModeAttribute, bPreferDarkMode ? 'dark' : 'light');

    this.state = {bDarkMode: this.isDarkMode()}
    this.onChange = this.onChange.bind(this);
    //https://alvarotrigo.com/blog/toggle-switch-css/
    //https://gwan-woo-jeong.github.io/blog/change-theme/
    //https://typescript-kr.github.io/pages/classes.html
  }
  
  onChange(e: React.InputHTMLAttributes<HTMLInputElement>) : void 
  {
    this.state.bDarkMode
    ? document.documentElement.setAttribute(darkModeAttribute, "light")
    : document.documentElement.setAttribute(darkModeAttribute, "dark");
    this.setState({bDarkMode: this.isDarkMode()});
  };
  
  render()
  {
    return (
      <>
        <input id='darkmode-btn' name='darkmode-btn' type='checkbox' 
               className={toggleSwitch}
               onChange={this.onChange}/>
                <label htmlFor="darkmode-btn">Toggle</label>         
      </>
    );
  }

  isDarkMode() : boolean { return document.documentElement.getAttribute(darkModeAttribute) === 'dark'}
}

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
      <p>AAAAAAAAAAA</p>
      <DarkModeToggle/>
    </main>
  )
}

export const Head = () => <title>Test</title>

export default AboutPage
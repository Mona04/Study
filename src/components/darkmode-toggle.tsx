import * as React from 'react'
import * as Utils from "utils/ssr-helper"
import toggleStyle from "@/styles/controls/toggleSwitch.module.scss";

interface IProps{}
interface IState{bDarkMode: boolean}

class DarkModeToggle extends React.Component<IProps, IState>
{
  defaultTheme : StyleSheet | undefined;
  darkTheme : StyleSheet | undefined;
  constructor(props:IProps)
  {
    super(props);

    Utils.isBroswerPreferDarkMode() ? Utils.setDarkMode() : Utils.setLightMode();
    this.state = {bDarkMode: Utils.isDarkMode()}
    this.onChange = this.onChange.bind(this);
    //https://alvarotrigo.com/blog/toggle-switch-css/
    //https://gwan-woo-jeong.github.io/blog/change-theme/
    //https://typescript-kr.github.io/pages/classes.html
  }
  onChange(e: React.InputHTMLAttributes<HTMLInputElement>) : void 
  {   
    Utils.toggleDarkMode();
    this.setState({bDarkMode: Utils.isDarkMode()});
  };

  render()
  {
    return (
      <div className={toggleStyle.toggleBtn}>
        <input id='darkmode-btn' name='darkmode-btn' type='checkbox'           
               onChange={this.onChange}/>
        <label htmlFor="darkmode-btn">Toggle</label>         
      </div>
    );
  }
}

export default DarkModeToggle;
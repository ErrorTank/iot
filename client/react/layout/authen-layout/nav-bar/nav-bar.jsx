import React from "react";
import {customHistory} from "../../../routes/routes";
import {Logo} from "../../../common/logo/logo";
import {UserProfile} from "./user-profile/user-profile";
import {userInfo} from "../../../../common/states/user-info";
import {authenCache} from "../../../../common/cache/authen-cache";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  };

  handleSignout = () => {
    userInfo.setState(null).then(() => {
      authenCache.clearAuthen();
      customHistory.push("/login");
    });

  };

  render() {
    return (

      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light k-navbar">
        <div className="container">
          <a className="navbar-brand"
             onClick={() => customHistory.push("/dashboard")}
          >
           Dashboard
          </a>
          <div className="nav-items" id="navbarText">
            <ul className="navbar-nav ml-auto ">
              {/*<li className="nav-item active">*/}
                {/*<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>*/}
              {/*</li>*/}
              {/*<li className="nav-item">*/}
                {/*<a className="nav-link" href="#">Features</a>*/}
              {/*</li>*/}
              <li className="nav-item">
                <a className="nav-link p-0 user-actions">
                  <span>Hello {userInfo.getState().name}</span>
                  <button className="btn btn-signout" onClick={this.handleSignout}>Đăng xuất</button>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

    );
  }
}
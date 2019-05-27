import React from "react";
import createBrowserHistory from "history/createBrowserHistory"
export const customHistory = createBrowserHistory();
import {Route, Switch, Router, Redirect} from "react-router-dom"
import {KComponent} from "../common/k-component";
import {ModalsRegistry} from "../common/modal/modals";
import {AuthenRoute, GuestRoute, toDefaultRoute} from "./route-type";
import {Login} from "./guest-routes/login/login";
import {userInfo} from "../../common/states/user-info";

import {AuthenLayout} from "../layout/authen-layout/authen-layout";
import {NotFoundPage} from "./not-found/not-found";
import {HomeRoute} from "./authen-routes/home-route/home-route";
import {DeviceNew} from "./authen-routes/device/new/device-new";
import {DeviceEdit} from "./authen-routes/device/edit/device-edit";
import {DeviceView} from "./authen-routes/device/view/device-view";


const NotFoundRoute = () => {
  let getComp = (props) => {

    if (!userInfo.getState()) {
      return (
        <NotFoundPage isLogin = {false} path={props.location.pathname}/>
      );

    }
    return (
      <AuthenLayout location={props.location} match={props.match}>
        <NotFoundPage isLogin = {true} path={props.location.pathname}/>
      </AuthenLayout>
    )
  };

  return (
    <Route
      render={props => getComp(props)}
    />
  )
};

export class MainRoute extends KComponent {
  constructor(props) {
    super(props);
    this.state = {

    };
  };

  render() {
    return (
      <div id="main-route">
        <ModalsRegistry/>
        <Router
          history={customHistory}
        >
          <Switch>

            <GuestRoute exact path='/' render={props => <Redirect to="/login"/>}/>
            <GuestRoute exact path='/login' component={Login}/>
            <AuthenRoute exact path='/dashboard' component={HomeRoute}/>
            <AuthenRoute exact path='/device/new' component={DeviceNew}/>
            <AuthenRoute exact path='/device/:deviceID/edit' component={DeviceEdit}/>
            <AuthenRoute exact path='/device/:deviceID/view' component={DeviceView}/>
            <NotFoundRoute/>
          </Switch>

        </Router>
      </div>
    );
  }
}

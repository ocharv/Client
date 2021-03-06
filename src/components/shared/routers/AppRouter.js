import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { GameGuard } from "../routeProtectors/GameGuard";
import GameRouter from "./GameRouter";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../login/Login";
import {RegisterGuard} from "../routeProtectors/RegisterGuard";
import Register from "../../register/Register"
import {UserProfileGuard} from "../routeProtectors/UserProfileGuard";
import UserProfile from "../../userProfile/UserProfile"
import {MyProfileGuard} from "../routeProtectors/MyProfileGuard";
import MyProfile from "../../myProfile/MyProfile";


/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reacttraining.com/react-router/web/guides/quick-start
 */
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div>
            <Route
              path="/game"
              render={() => (
                <GameGuard>
                  <GameRouter base={"/game"} />
                </GameGuard>
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <LoginGuard>
                  <Login />
                </LoginGuard>
              )}
            />
              <Route
                  path="/register"
                  exact
                  render={() => (
                      <RegisterGuard>
                          <Register />
                      </RegisterGuard>
                  )}
              />
              <Route
                  path="/userProfile/:id" //or path="/:id" component={Child}"
                  exact
                  render={() => (
                      <UserProfileGuard>
                          <UserProfile />
                      </UserProfileGuard>
                  )}
              />
              <Route
                  path="/userProfile/:id/MyProfile"
                  exact
                  render={() => (
                      <MyProfileGuard>
                          <MyProfile />
                      </MyProfileGuard>
                  )}
              />
              <Route path="/" exact render={() => <Redirect to={"/login"} />} />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}
/*
* Don't forget to export your component!
 */
export default AppRouter;

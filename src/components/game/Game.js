import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const Users = styled.ul`
  list-style: none;
  padding-left: 0;
`;

const PlayerContainer = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const B = styled.button`
  cursor: pointer;
  background: inherit;
  border: none;
  color:white;
`;


class Game extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }
    logout() {
        const status = response => {
            if (response.status === 204) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        };
        let token = localStorage.getItem("token");
        localStorage.removeItem("token");
        fetch(`${getDomain()}/logout`, {
            method: "PUT",
            headers: {
                "Content-Type": "text/plain" // when i send the data as json something goes wrong.. maybe i need also id and username and that is why it doesn't work
            },
            body: token //localStorage.getItem("token")
        })
            .then(status)
            .catch(err => {
                console.log(err);
            });

        this.props.history.push("/login");
    };

    componentWillMount() {
        const status = response => {
            if (response.status === 200) {
                // means a user with that token exists
                return Promise.resolve(response);
            }
            localStorage.clear();
            this.props.history.push("/login");
        };
        fetch(`${getDomain()}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": localStorage.getItem("token")
            }
        })
            .then(status)
            .then(response => response.json())
            .then(async users => {
                // delays continuous execution of an async operation for 0.8 seconds.
                // This is just a fake async call, so that the spinner can be displayed
                // feel free to remove it :)
                await new Promise(resolve => setTimeout(resolve, 800));

                this.setState({ users });
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    render() {
        return (
            <Container>
                <h2>Happy Coding! </h2>
                <p>Get all users from secure end point:</p>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <B
                                            onClick = {() =>{
                                                this.props.history.push({
                                                    pathname: "/UserProfile/"+user.id,
                                                    state:{user}
                                                })
                                            }}>
                                            <Player user={user} />
                                        </B>
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                        <Button
                            width="100%"
                            onClick={() => {
                                this.logout();
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(Game);

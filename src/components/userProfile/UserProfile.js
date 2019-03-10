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

class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            users: null
        };
    }

    /*logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }*/

    componentDidMount() {
        // NEED TO REVIEW THIS !!!
        const {handle} = this.props.match.params.id; // this.match.params.id
        fetch(`${getDomain()}/users/${handle}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response =>{
                if(response.status === 200){
                    alert(response.status+"n/ User was retrieved successfully.");
                    const user = response.json();
                    this.setState({ user });
                }else{
                    alert(response.status+"n/ There was a problem retrieving the user");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Something went wrong fetching the users: " + err);
            });
    }

    render() {
        return (
            <Container>
                <h2>*placeholder*'s Profile Details</h2>
                {!this.state.users ? (
                    <Spinner />
                ) : (
                    <div>
                        <Users>
                            // PROBABLY NEEDS MODIFICATION!!!!
                            {this.state.users.map(user => {
                                return (
                                    <PlayerContainer key={user.id}>
                                        <Player user={user} />
                                    </PlayerContainer>
                                );
                            })}
                        </Users>
                        <Button
                            //disabled={this.state.id != LOGGED_IN_ID}
                            width="100%"
                            onClick={() => {
                                this.props.history.push("/myProfile"); //PROBABLY NOT CORRECT
                            }}
                        >
                            Edit
                        </Button>
                    </div>
                )}
            </Container>
        );
    }
}

export default withRouter(UserProfile);
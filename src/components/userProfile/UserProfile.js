import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { Button } from "../../views/design/Button";
import UserContainer from "../../views/UserContainer";
import {withRouter} from "react-router-dom";

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
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.location.state.user
        };
        this.user = props.location.state.user;
        this.id = localStorage.getItem("id");
    }

    /*logout() {
        localStorage.removeItem("token");
        this.props.history.push("/login");
    }*/


    render() {
        // console.log(this.user.token);
        // console.log(localStorage.getItem("token"));
        return (
            <Container>
                <h2>Profile Details</h2>
                    <div>
                        <Users>
                            <PlayerContainer key={this.id}>
                                <UserContainer user={this.state.user} />
                            </PlayerContainer>
                        </Users>
                        <ButtonContainer>
                            <Button
                                //WHY NOT WITH ID
                                disabled={this.user ? this.user.token !== localStorage.getItem("token") : false}
                                width="25%"
                                onClick={() => {
                                    let directory = "/UserProfile/"+this.state.user.id+"/MyProfile";
                                    let user = this.state.user;
                                    this.props.history.push({pathname: directory, state:{user}});
                                }}
                            >
                                Edit
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="25%"
                                onClick={() => {
                                this.props.history.go(-1);
                             }}
                            >
                                Back
                            </Button>
                        </ButtonContainer>
                    </div>
            </Container>
        );
    }
}

export default withRouter(UserProfile);
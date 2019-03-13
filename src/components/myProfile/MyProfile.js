import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import { Button } from "../../views/design/Button";
import {withRouter } from "react-router-dom";


const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 500px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;
const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;
const Label = styled.label`
  color: white;
  margin-bottom: 10px;
  text-transform: uppercase;
`;
const Title = styled.h2`
  color: white;
  margin-bottom: 30px;
  margin-left: 70px;
  justify-content: center;
  
`;


// TODO: remove unneeded in the end


class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            dateOfBirth: null,
            name: null,
            //user: props.location.state.user,
        };
        //this.user = props.location.state.user;
        // perhaps this might work in the render
    }
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }
    save() {

        const status = response => {
            // handles the incoming http status, if 204 then proceed, else to .catch
            if (response.status === 204) {
                // 204 is the status code the server returns upon successful request
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        };

        fetch(`${getDomain()}/users/` + localStorage.getItem("id"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                id: this.state.user.id,
                username: this.state.username,
                birthdayDate: this.state.dateOfBirth,
                name: this.state.name
            })
        })
            .then(status)
            .then(data => {
                //SEE IF IT WORKS
                const status = response => {
                    if (response.status === 200) {
                        return Promise.resolve(response);
                    }
                    return Promise.reject(new Error(response.statusText))
                };

                const json = response => response.json();

                fetch(`${getDomain()}/users/` + localStorage.getItem("id"), { //this.state.user.id
                    // fetches user data of newly updated user
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(status)
                    .then(json)
                    .then(data => {
                        this.setState({user: data});
                        //let instead of "const" because this way it can not be accessed from outside the block
                        let user = this.state.user;
                        // this seems to be the only way to make this user accessible in the history.push, seems ood
                        this.props.history.push({pathname: `/userProfile/` + this.state.user.id, state: {user} })
                    })
                    .catch(err => {
                        alert(`Problem while getting the new data: ${err.message}`);
                    })
            })
            .catch(err => {
                //NEEDS FIXING
                if (err.message.match(/Failed to fetch/)) {
                    alert("The server cannot be reached. Did you start it?");
                } else {
                    alert(`Something went wrong during the update of your profile: ${err.message}`);
                }
            })

    }
    //NEEDS TO BE STATIC??
    checkDateFormat(date) {
        const reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (date === null) {
            return true;
        }
        return reg.test(date);

    }
    render() {
        //let bday = this.state.dateOfBirth;
        let userId = localStorage.getItem("id");
        return(

            <BaseContainer>
                <FormContainer>
                    <Form>
                        <Title>Updating Profile..</Title>
                        <Label>Username: </Label>
                        <InputField
                            placeholder="Update your username here"
                            onChange={e => {
                                this.handleInputChange("username", e.target.value);
                            }}
                        />
                        <Label>Date of Birth: </Label>
                        <InputField
                            placeholder="DD/MM/YYYY"
                            onChange={e => {
                                this.handleInputChange("dateOfBirth", e.target.value);
                            }}
                        />
                        <Label>Name: </Label>
                        <InputField
                            placeholder="Update your name here"
                            onChange={e => {
                                this.handleInputChange("name", e.target.value);
                            }}
                        />
                        <ButtonContainer>
                            <Button
                                width="50%"
                                //DOESNT WORK
                                disabled={(!this.state.username && !this.state.dateOfBirth && !this.state.name)
                                || !(this.checkDateFormat(this.state.dateOfBirth))
                                || !(this.state.id === userId)
                                    //MyProfile.checkDateFormat if static
                                }
                                onClick={() => {
                                    this.save()
                                }}
                            >
                                Save
                            </Button>
                        </ButtonContainer>
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    //I HAVE TO CHECK IF IT RETURNS ME TO THE UPDATED USER OR NOT
                                    this.props.history.go(-1);
                                    //let user = this.state.user;
                                    //this.props.history.push({pathname: `/userProfile/`+this.state.user.id, state:{user}})
                                }}
                            >
                                Cancel
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        )
    };
}
export default withRouter(MyProfile);
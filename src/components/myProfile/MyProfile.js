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
  height: 550px;
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

class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            dateOfBirth: null,
            name: null,
            user: props.location.user
        };
        this.user = props.location.user;
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
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }
    innerFetch(){
        const status = response => {
            if (response.status === 200) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText))
        };

        const json = response => response.json();

        fetch(`${getDomain()}/users/` + localStorage.getItem("id") , { //this.user.id  localStorage.getItem("id")
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Token": localStorage.getItem("token")
            }
        })
            .then(status)
            .then(json)
            .then(data => {
                this.setState({user: data});
                //let instead of "const" because this way it can not be accessed from outside the block
                let user = this.user;
                this.props.history.push({pathname: `/userProfile/` + this.user.id, state: {user} })
            })
            .catch(err => {
                alert(`Problem while getting the new data: ${err.message}`);
            })

    }
    save() {
        const status = response => {
            if (response.status === 204) {
                return Promise.resolve(response);
            }
            return Promise.reject(new Error(response.statusText));
        };

        fetch(`${getDomain()}/users/` + localStorage.getItem("id"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Token": localStorage.getItem("token")
            },
            body:JSON.stringify({
                id: localStorage.getItem("id"),
                username: this.state.username,
                birthdayDate: this.state.dateOfBirth,
                name: this.state.name
            })
        })
            .then(status)
            .then(data => {
                //SEE IF IT WORKS
                this.innerFetch();
                alert("The profile update was successful");
            })
            .catch(err => {
                alert("We encountered a problem during the update. Try a different username")
            })

    }
    //NEEDS TO BE STATIC??
    checkDateFormat(date){
        const reg = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
        if (date === null || reg.test(date)=== true ) {
            return true;
        }else{
            return false;
        }


    }
    render() {
        let bday = this.state.dateOfBirth;
        let uname = this.state.username;
        let nm = this.state.name;
        //let token = this.user.token;
        //let userId = localStorage.getItem("id");
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
                                disabled={(!uname && !bday && !nm)
                                || !(this.checkDateFormat(bday)) //this.state.dateOfBirth
                                //|| !(token === localStorage.getItem("token"))
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
                        <ButtonContainer>
                            <Button
                                width="50%"
                                onClick={() => {
                                    this.logout();
                                }}
                            >
                                Logout
                            </Button>
                        </ButtonContainer>
                    </Form>
                </FormContainer>
            </BaseContainer>
        )
    };
}
export default withRouter(MyProfile);
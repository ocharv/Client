import styled from "styled-components";
import React from "react";
import {BaseContainer} from "../helpers/layout";


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
  width: 300px;
  height: 150px;
  font-size: 18px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;
const Label = styled.label`
  margin-bottom: 5px;
  margin-top: 5px;
  font-weight: lighter;
  color: burlywood;
`;

const UserName = styled.div`
  font-weight: lighter;
  color: white;
`;

const Name = styled.div`
  font-weight: lighter;
  color: white;
`;

const Id = styled.div`
  font-weight: lighter;
  color: white;
`;
const Date = styled.div`
  font-weight: lighter;
  color: white;
`;
const Stat = styled.div`
  font-weight: lighter;
  color: white;
`;

const UserContainer = ({ user }) => {
    return (
        <BaseContainer>
            <FormContainer>
                <Form>
                    <Id>User Id: <Label>{user.id}</Label></Id>
                    <UserName>Username: <Label>{user.username}</Label></UserName>
                    <Name>Name: <Label>{user.name}</Label></Name>
                    <Date>Date of Birth: <Label>{user.dateOfBirth}</Label></Date>
                    <Stat>Status: <Label>{user.status}</Label></Stat>
                    <Date>Creation Date: <Label>{user.creationDate}</Label></Date>
                </Form>
            </FormContainer>
        </BaseContainer>
    );
};

export default UserContainer;
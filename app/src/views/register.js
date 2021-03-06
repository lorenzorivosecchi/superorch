import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import PrimaryForm from "../components/_miscellaneous/PrimaryForm";
import RegistrationForm from "../components/_forms/RegistrationForm";
import UserProfileForm from "../components/_forms/UserProfileForm";

const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 15px 10px;
  flex-direction: column;
`;

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

const StyledLink = styled(Link)`
  display: block;
  margin-top: 10px;
  font-size: 16px;
  text-align: center;
  color: lightgrey;
  text-decoration: none;
`;

function RegisterView() {
  const [index, setIndex] = useState(0);
  const nextForm = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };

  return (
    <StyledContainer>
      {/* First part: email and password */}
      {index === 0 && (
        <>
          <StyledForm title="Register">
            <RegistrationForm onSuccess={nextForm} />
          </StyledForm>
          <StyledLink to="/login">Back to login</StyledLink>
        </>
      )}
      {/* Second part: choose nickname */}
      {index === 1 && (
        <>
          <StyledForm title="User Profile">
            <UserProfileForm onSuccess={redirect} />
          </StyledForm>
          <StyledLink to="/">Skip</StyledLink>
        </>
      )}
    </StyledContainer>
  );
}

export default RegisterView;

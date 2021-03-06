import React from "react";
import styled from "styled-components/macro";
import BackgroundLink from "../../_miscellaneous/BackgroundLink";
import ListItem from "../ListItem";

const StyledContainer = styled.div`
  margin: 10px 0 5px 0;
  font-size: 14px;
`;

const StyledList = styled.ul`
  margin: 15px 0;
`;

const StyledLink = styled(BackgroundLink)`
  margin-top: 15px;
  text-decoration: none;
  color: grey;
`;

//
// Displays a list of users
//
function MemberList({ orchestra }) {
  const userId = localStorage.getItem("userId");

  // Filter out the current user
  const members = orchestra.members.filter(
    member => member.user._id !== userId
  );

  const url = `/orchestras/${orchestra._id}`;

  return (
    <StyledContainer>
      <StyledList>
        {members.map((member, index) => (
          <ListItem key={index} url={`${url}/chats/member-${member._id}`}>
            {member?.user?.name}
          </ListItem>
        ))}
      </StyledList>
      <StyledLink to={`${url}/invites`}>+ invite</StyledLink>
    </StyledContainer>
  );
}

export default MemberList;

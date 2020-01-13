import React from "react";
import styled from "styled-components/macro";
import MemberList from "../components/Sidebar/MemberList";
import Playground from "../components/Playground";

const StyledContainer = styled.div`
  flex: 1;
  display: flex;
`;

const StyledSidebar = styled.div`
  background: whitesmoke;
  border-right: solid 1px lightgrey;
  flex: 0 1 200px;
`;

function HomeView() {
  return (
    <StyledContainer>
      <StyledSidebar>
        <MemberList />
      </StyledSidebar>
      <Playground />
    </StyledContainer>
  );
}

export default HomeView;

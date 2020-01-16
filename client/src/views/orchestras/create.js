import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import PrimaryLayout from "../../components/_layouts/PrimaryLayout";
import PrimaryForm from "../../components/_forms/PrimaryForm";
import CreateOrchestraForm from "../../components/_forms/CreateOrchestraForm";

const StyledForm = styled(PrimaryForm)`
  max-width: 300px;
  border: solid 1px lightgrey;
  border-radius: 10px;
  margin: auto;
`;

function CreateOrchestraView() {
  const history = useHistory();
  const redirect = () => {
    history.push("/");
  };

  return (
    <PrimaryLayout>
      <StyledForm title="Create Orchestra">
        <CreateOrchestraForm onSuccess={redirect} />
      </StyledForm>
    </PrimaryLayout>
  );
}

export default CreateOrchestraView;

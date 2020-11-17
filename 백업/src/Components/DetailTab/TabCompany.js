import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  overflow: scroll; /*new*/
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const BoxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px; /*new*/
`;

const LogoContainer = styled.div`
  width: 300px;
  display: flex;
`;

const Logo = styled.img`
  width: 100%;
  height: 150px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 30px; /*new*/
  max-width: 250px; /*new*/
  margin: 20px;
  border-radius: 15px;
  box-shadow: 0.5px 2px 10px 5px rgba(255, 255, 255, 0.2);
`;

const ContextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 150px;
  font-weight: 550;
  background-color: rgba(0, 0, 0, 0.4);
  margin: auto;
  border-radius: 15px;
  box-shadow: 4px 8px 5px 1px rgba(20, 20, 20, 0.8);
`;

const Title = styled.div`
  font-size: 18px;
  margin: auto;
  text-align: center;
`;

const Country = styled.div`
  font-size: 25px;
  margin: auto;
  text-align: center;
`;

export default function TabCompany({ companies }) {
  return (
    <Container>
      {companies &&
        companies.map((company) => (
          <BoxContainer count={companies.length}>
            <LogoContainer>
              <Logo
                count={companies.length}
                src={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/w200${company.logo_path}`
                    : `${require("assets/NoImage.png")}`
                }
              />
            </LogoContainer>
            <ContextContainer count={companies.length}>
              <Title>{company.name}</Title>
              <Country>
                {company.origin_country ? company.origin_country : "Unknown"}
              </Country>
            </ContextContainer>
          </BoxContainer>
        ))}
    </Container>
  );
}

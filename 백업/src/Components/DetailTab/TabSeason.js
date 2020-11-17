import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 10px 0 10px 10px;
  overflow-y: scroll;
  max-height: 350px;
`;

const ItemContainer = styled.div`
  display: flex;
`;

const SeasonName = styled.span`
  width: 100%;
  padding: 20px;
  margin-top: 15px;
  background-color: #640;
  font-size: 20px;
  font-weight: 700;
`;

const LogoContainer = styled.div`
  margin: 10px 0;
`;

const Logo = styled.img`
  width: 220px;
  height: 240px;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.2);
  margin: 20px;
  box-shadow: 0.5px 2px 10px 5px rgba(255, 255, 255, 0.2);
`;

const OverviewContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  font-size: ${(props) => (props.isOverView ? "30px" : "14px")};
  margin-right: 20px;
`;

const OverView = styled.p``;

export default function TabSeason({ seasons }) {
  return (
    <Container>
      {seasons &&
        seasons.map((season) => (
          <>
            {/* Sometimes season has null value ! It needs to check it  */}
            {season.overview === null ? (season.overview = "") : null}
            <SeasonName>{season.name}</SeasonName>
            <ItemContainer>
              <LogoContainer>
                <Logo
                  src={
                    season.poster_path
                      ? `https://image.tmdb.org/t/p/w200${season.poster_path}`
                      : require("../../assets/NoPoster.jpg")
                  }
                />
              </LogoContainer>
              <OverviewContainer isOverView={season.overview.length < 1}>
                <OverView>
                  {season.overview.length < 1
                    ? "( No OverView )"
                    : season.overview.length > 730
                    ? `${season.overview.slice(0, 730)}...`
                    : season.overview}
                </OverView>
              </OverviewContainer>
            </ItemContainer>
          </>
        ))}
    </Container>
  );
}

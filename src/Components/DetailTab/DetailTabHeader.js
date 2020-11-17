import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: block;
  position: relative;
`;
const ButtonContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: rgba(10, 10, 10, 0.8);
  display: flex;
`;

const Button = styled.button`
  cursor: pointer;
  width: 100%;

  background-color: ${(props) =>
    props.selected ? "#c8224f" : "rgba(20, 20, 20, 0.8)"};
`;

export default function DetailTabHeader({
  isVideos,
  isCasts,
  // isCompanies,
  isRecommends,
  isSeasons,
  handleClick,
  selectedButton,
}) {
  //   console.log(isVideos);
  //   console.log(isCompanies);
  //   console.log(isRecommends);
  //   console.log(isSeasons);
  //   console.log(selectedButton);

  return (
    <Container>
      <ButtonContainer>
        {isVideos && (
          <Button
            selected={selectedButton === "Youtube"}
            onClick={(e) => handleClick("Youtube")}
          >
            Youtube
          </Button>
        )}
        {/* {isCompanies && (
          <Button
            selected={selectedButton === "Company"}
            onClick={(e) => handleClick("Company")}
          >
            Company
          </Button>
        )} */}
        {isCasts && (
          <Button
            selected={selectedButton === "Casts"}
            onClick={(e) => handleClick("Casts")}
          >
            Casts
          </Button>
        )}
        {isRecommends && (
          <Button
            selected={selectedButton === "Recommends"}
            onClick={(e) => handleClick("Recommends")}
          >
            Recommends
          </Button>
        )}
        {isSeasons && (
          <Button
            selected={selectedButton === "Seasons"}
            onClick={(e) => handleClick("Seasons")}
          >
            Seasons
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
}

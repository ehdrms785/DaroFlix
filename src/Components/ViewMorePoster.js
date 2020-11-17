import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  font-size: 12px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 100%;
  min-height: 350px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
  transition: opacity 0.15s linear;
`;

const Rating = styled.span`
  position: absolute;
  bottom: 5px;
  right: 5px;
  opacity: 0;
  transition: opacity 0.15s linear;
`;

const ImageContainer = styled.div`
  margin-bottom: 5px;
  position: relative;
  &:hover {
    ${Image} {
      opacity: 0.3;
    }
    ${Rating} {
      opacity: 1;
    }
  }
`;

const Title = styled.span`
  display: block;
  margin-bottom: 2.5px;
  font-size: 14px;
  text-align: center;
`;

const Year = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  text-align: center;
  display: block;
`;

const ViewMorePoster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  isMovie = false,
}) => (
  <Link
    to={{
      pathname: isMovie ? `/movie/${id}` : `/show/${id}`,
      state: { isMovie: isMovie },
    }}
  >
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w500${imageUrl}`
              : require("../assets/NoPoster.jpg")
          }
        />
        <Rating>
          <span role="img" aria-label="rating">
            ⭐
          </span>
          {rating}/10
        </Rating>
      </ImageContainer>
      <Title>
        {title.length > 15 ? `${title.substring(0, 18)}...` : title}
      </Title>
      <Year>{year}</Year>
    </Container>
  </Link>
);

ViewMorePoster.propTypes = {
  id: PropTypes.number.isRequired,
  imageurl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default ViewMorePoster;

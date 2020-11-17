import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import CategorySection from "Components/CategorySection";
import Loading from "Components/Loading";
import Message from "Components/Message";
import Poster from "Components/Poster";
const Container = styled.div`
  padding: 20px;
`;

const TVPresenter = ({ popular, topRated, airingToday, error, loading }) =>
  loading ? (
    <Loading nowPage="TV Show" />
  ) : error ? (
    <Message text={error} color="red" />
  ) : (
    <Container>
      <Helmet>
        <title>TV Show | Nomfilx</title>
      </Helmet>
      {popular && popular.length > 0 && (
        <CategorySection title="Popular" link="/show/viewMore/popular">
          {popular.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
              isMovie={false}
            />
          ))}
        </CategorySection>
      )}
      {topRated && topRated.length > 0 && (
        <CategorySection title="TopRated" link="/show/viewMore/topRated">
          {topRated.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
              isMovie={false}
            />
          ))}
        </CategorySection>
      )}

      {airingToday && airingToday.length > 0 && (
        <CategorySection title="Airing Today" link="/show/viewMore/airingToday">
          {airingToday.map((show) => (
            <Poster
              key={show.id}
              id={show.id}
              imageUrl={show.poster_path}
              title={show.original_name}
              rating={show.vote_average}
              year={show.first_air_date.substring(0, 4)}
              isMovie={false}
            />
          ))}
        </CategorySection>
      )}

      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

TVPresenter.propTypes = {
  popular: PropTypes.array,
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default TVPresenter;

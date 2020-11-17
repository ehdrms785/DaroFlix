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
  height: 100%;
  /* overflow: scroll; */
`;

const HomePresenter = ({ nowPlaying, upComing, popular, error, loading }) =>
  loading ? (
    <Loading nowPage="Movies" />
  ) : error ? (
    <Message text={error} color="red" />
  ) : (
    <Container>
      <Helmet>
        <title>Movies | Nomfilx</title>
      </Helmet>
      {upComing && upComing.length > 0 && (
        <CategorySection title="UpComing" link="/movie/viewMore/upComing/">
          {upComing.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </CategorySection>
      )}
      {nowPlaying && nowPlaying.length > 0 && (
        <CategorySection title="Now Playing" link="/movie/viewMore/nowPlaying/">
          {nowPlaying.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </CategorySection>
      )}

      {popular && popular.length > 0 && (
        <CategorySection title="Popular" link="/movie/viewMore/popular/">
          {popular.map((movie) => (
            <Poster
              key={movie.id}
              id={movie.id}
              imageUrl={movie.poster_path}
              title={movie.original_title}
              rating={movie.vote_average}
              year={movie.release_date.substring(0, 4)}
              isMovie={true}
            />
          ))}
        </CategorySection>
      )}

      {error && <Message color="#e74c3c" text={error} />}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upComing: PropTypes.array,
  popular: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default HomePresenter;

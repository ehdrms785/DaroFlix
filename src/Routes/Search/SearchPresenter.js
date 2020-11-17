import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "Components/Loading";
import CategorySection from "Components/CategorySection";
import Message from "Components/Message";
import Poster from "Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
`;

const Form = styled.form`
  /* margin-bottom: 50px; */
  width: 100%;
  margin-bottom: 50px;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  searchTerm,
  error,
  loading,
  handleSubmit,
  updateTerm,
}) =>
  error ? (
    <Message text={error} color="red" />
  ) : (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows"
          value={searchTerm}
          onChange={updateTerm}
        />
      </Form>
      {loading ? (
        <Loading nowPage="Search" />
      ) : (
        <>
          <Helmet>
            <title>Search Page | Nomfilx</title>
          </Helmet>
          {movieResults && movieResults.length > 0 && (
            <CategorySection
              title="Movie Results"
              link={`/movie/viewMore/search/${searchTerm}`}
            >
              {movieResults.map((movie) => (
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.original_title}
                  rating={movie.vote_average}
                  year={
                    movie.release_date
                      ? movie.release_date.substring(0, 4)
                      : null
                  }
                  isMovie={true}
                />
              ))}
            </CategorySection>
          )}

          {tvResults && tvResults.length > 0 && (
            <CategorySection
              title="TV Show Results"
              link={`/show/viewMore/search/${searchTerm}`}
            >
              {tvResults.map((show) => (
                <Poster
                  key={show.id}
                  id={show.id}
                  imageUrl={show.poster_path}
                  title={show.original_name}
                  rating={show.vote_average}
                  year={
                    show.first_air_date
                      ? show.first_air_date.substring(0, 4)
                      : null
                  }
                  isMovie={false}
                />
              ))}
            </CategorySection>
          )}

          {error && <Message color="#e74c3c" text={error} />}

          {movieResults &&
            tvResults &&
            movieResults.length === 0 &&
            tvResults.length === 0 && (
              <Message color="grey" text="Nothing Found Anything" />
            )}
        </>
      )}
    </Container>
  );

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  searchTerm: PropTypes.string,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;

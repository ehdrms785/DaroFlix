import React from "react";
import Loading from "../../Components/Loading";
import styled from "styled-components";
import Message from "../../Components/Message";
import Helmet from "react-helmet";
import ViewMorePoster from "../../Components/ViewMorePoster";
import ViewMoreSection from "../../Components/ViewMoreSection";
const Container = styled.div`
  overflow: auto;
  padding: 20px;
`;
const ViewMorePresenter = ({ results, loading, error, isMovie, subject }) => {
  return loading ? (
    <Loading />
  ) : error ? (
    <Message text={error} color="red" />
  ) : (
    <Container>
      <Helmet>
        <title>
          {isMovie ? "Movie" : "TV"} | {subject}
        </title>
      </Helmet>
      <ViewMoreSection title={subject}>
        {results && results.length > 0 && isMovie
          ? results.map((result) => {
              // console.log("check!!");
              // console.log(result);
              return (
                <ViewMorePoster
                  key={result.id}
                  id={result.id}
                  imageUrl={result.poster_path}
                  title={result.original_title}
                  rating={result.vote_average}
                  year={
                    result.release_date
                      ? result.release_date.substring(0, 4)
                      : "( )"
                  }
                  isMovie={true}
                />
              );
            })
          : results.map((result) => (
              <ViewMorePoster
                key={result.id}
                id={result.id}
                imageUrl={result.poster_path}
                title={result.original_name}
                rating={result.vote_average}
                year={result.first_air_date.substring(0, 4)}
                isMovie={false}
              />
            ))}
      </ViewMoreSection>
    </Container>
  );
};

export default ViewMorePresenter;

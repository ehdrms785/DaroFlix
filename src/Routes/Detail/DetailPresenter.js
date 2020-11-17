import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loading from "Components/Loading";
import Helmet from "react-helmet";
import DetailTabContainer from "Components/DetailTab/DetailTabContainer";
import MyModal from "../../Components/MyModal";
import ModalPortal from "../../Components/ModalPortal";
import CastModal from "../../Components/CastModal";

const Container = styled.div`
  position: relative;
  height: calc(100vh - 50px);
  /* height: 100%; */
  width: 100%;
  padding: 30px;
  overflow: hidden;
  /* ${(props) => (props.modalType === null ? "" : "overflow:auto")} */
  /* overflow:auto; */
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  /* height: calc(120vh - 100px); */
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center, center;
  background-size: cover;
  filter: blur(2px);
  opacity: 0.5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;

  height: calc(100vh - 100px);
  /* height: 100%; */
  position: relative;
`;

const Cover = styled.img`
  top: 80px;
  width: 30%;
  height: calc(100vh - 150px);
  background-size: cover;
  background-position: center, center;
  border-radius: 5px;
  /* position: ${(props) => (props.modalType === null ? "sticky" : "")}; */
  position: sticky;
  margin: 20px;
  box-shadow: 0.5px 2px 10px 5px rgba(255, 255, 255, 0.2);
`;

const Data = styled.div`
  width: 70%;
  height: 100%;
  margin-left: 10px;
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
`;
const Header = styled.div`
  display: flex;
`;

const Title = styled.h3`
  font-size: 35px;
`;

const IMDB = styled.a``;

const Img = styled.img`
  margin-top: 6px;
  margin-left: 10px;
  background-image: url(${(props) => props.bgImage});
  width: 52px;
  height: 30px;
  background-position: center, center;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  line-height: 1.5;
  opacity: 0.7;
  width: 60%;
  height: 80px;
  margin-bottom: 50px;
  display: block;
`;
const Button = styled.button`
  cursor: pointer;
`;
const DetailPresenter = ({
  result,
  casts_result,
  recommends_result,
  error,
  loading,
  isMovie,
}) => {
  // console.log(casts_result);
  return loading ? (
    <Loading nowPage="Detail"></Loading>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}
        </title>
      </Helmet>
      <Backdrop
        bgImage={
          result.backdrop_path
            ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
            : result.poster_path
            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
            : require("assets/NoPoster.jpg")
        }
      />

      <Content>
        <Cover
          src={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("assets/NoPoster.jpg")
          }
        />

        {/* <button onClick={() => handleOpenModal("youtube")}>Modal Open</button>
          {modalType === "youtube" && (
            <ModalPortal>
              <MyModal onClose={handleCloseModal} />
            </ModalPortal>
          )} */}

        <Data>
          <Header>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            {result.imdb_id ? (
              <IMDB
                href={`https://www.imdb.com/title/${result.imdb_id}`}
                target="_blank"
              >
                <Img bgImage={require("../../assets/imdb.PNG")} />
              </IMDB>
            ) : null}
          </Header>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date
                ? result.first_air_date.substring(0, 4)
                : "❌"}
            </Item>
            <Divider>▪</Divider>
            <Item>
              {result.runtime
                ? `${result.runtime} min`
                : result.episode_run_time
                ? `${result.episode_run_time[0]} min`
                : "❤"}
            </Item>
            <Divider>▪</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
          </ItemContainer>

          <Overview>
            {result.overview.length > 500
              ? `${result.overview.slice(0, 500)}...`
              : result.overview}
          </Overview>

          <DetailTabContainer
            result={result}
            casts_result={casts_result}
            recommends_result={recommends_result}
            isMovie={isMovie}
          />
        </Data>
      </Content>
    </Container>
  );

  DetailPresenter.propTypes = {
    result: PropTypes.object,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    isMovie: PropTypes.bool.isRequired,
  };
};

export default DetailPresenter;

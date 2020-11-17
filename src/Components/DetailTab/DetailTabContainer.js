import React, { Component } from "react";
import styled from "styled-components";
import DetailTabHeader from "./DetailTabHeader";
import TabYoutube from "./TabYoutube";
import TabSimilar from "./TabSimilar";
import TabSeason from "./TabSeason";
import TabCasts from "./TabCasts";
import { movieApi } from "../../api";
import Loading from "../Loading";
const Container = styled.div`
  display: block;
  width: 80%;
  background-color: rgba(30, 30, 30, 0.8);
  height: 100%;
  /* max-height: 400px; */
  max-height: 430px;
  margin-bottom: 20px;
`;

export default class DetailTabContainer extends Component {
  state = {
    selectedButton: null,
    seasons: null,
    results: null,
    loading: true,
  };
  async getRecommendsMovies() {
    const {
      result: { id: movie_id },
    } = this.props;

    let recommends_result = null;
    try {
      ({
        data: { results: recommends_result },
      } = await movieApi.getSimilarMovies(movie_id, 1));
    } catch (e) {
      this.setState({ error: "Can not find Similar Data from API" });
    } finally {
      this.setState({ loading: false, recommends_result });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      result: { id: prev_movie_id },
    } = prevProps;
    const {
      result: { id: now_movie_id },
    } = this.props;

    if (prev_movie_id !== now_movie_id) {
      this.getRecommendsMovies();
      this.buttonCheckAndUpdate();
    }
  }
  buttonCheckAndUpdate() {
    let selectedButton = null;
    const {
      result: {
        videos: { results },
      },
      casts_result,
      recommends_result,
      isMovie,
    } = this.props;
    let seasons = null;
    if (isMovie) {
    } else {
      ({
        result: { seasons },
      } = this.props);
    }

    // 유튜브 비디오 체크 & 버튼 활성화
    if (results && results.length > 0) {
      selectedButton = "Youtube";
      // 캐스팅 체크 &  버튼 활성화
    } else if (casts_result && casts_result.length > 0) {
      selectedButton = "Casts";
    }
    // 추천영화(비슷한영화[Movie Only])체크 & 버튼 활성화
    else if (recommends_result && recommends_result.length > 0) {
      selectedButton = "Recommends";
    }
    // 시즌(TV Only) & 버튼 활성화
    else if (seasons && seasons.length > 0) {
      selectedButton = "Seasons";
    }
    this.setState({
      selectedButton,
      loading: false,
    });
  }
  componentDidMount() {
    this.getRecommendsMovies();
    this.buttonCheckAndUpdate();
  }

  handleClick = (selectedButton) => {
    this.setState({
      selectedButton,
    });
  };

  render() {
    const { selectedButton, loading } = this.state;
    // 최적화를 위해서 한 번 시도
    // 로딩이 false 이면 굳이 밑에 것들을 가져와서 체크 할 필요가 없지 않을까?
    // 그럴 필요는 없다는 결론 그래서 loading === false로 걸러주기로함

    if (loading === false) {
      const {
        result: {
          videos: { results },
        },
        casts_result,
        recommends_result,
        result: { id: movie_id },
        isMovie,
      } = this.props;
      // 밑에서 isSeasons를 체크하기 위해서 미리 초기화
      let seasons = null;
      if (!isMovie) {
        ({
          result: { seasons },
        } = this.props);
      }

      const isVideos = results && results.length > 0;
      const isCasts = casts_result && casts_result.length > 0;
      // const isCompanies = production_companies && production_companies.length > 0;
      const isRecommends = recommends_result && recommends_result.length > 0;
      const isSeasons = seasons && seasons.length > 0;

      /* If selectedButton is null, wait til next rendering  */
      return loading ? (
        <Loading />
      ) : selectedButton ? (
        <Container>
          <DetailTabHeader
            isVideos={isVideos}
            isCasts={isCasts}
            isRecommends={isRecommends}
            isSeasons={isSeasons}
            handleClick={this.handleClick}
            selectedButton={selectedButton}
          />
          {selectedButton === "Youtube" && isVideos && results.length > 0 && (
            <TabYoutube youtubeKey={results[0].key} />
          )}
          {selectedButton === "Casts" && casts_result.length > 0 && (
            <TabCasts casts_result={casts_result} />
          )}
          {selectedButton === "Recommends" && recommends_result.length > 0 && (
            <TabSimilar
              recommends_result={recommends_result}
              movie_id={movie_id}
            />
          )}
          {selectedButton === "Seasons" && seasons.length > 0 && (
            <TabSeason seasons={seasons} />
          )}
        </Container>
      ) : null;
    }
    // == if(loading === true) 일 때는 굳이 아무것도 렌더링 시키지 않는다
    // 굳이 필요가 없기 때문 (최적화용)
    else {
      return null;
    }
  }
}

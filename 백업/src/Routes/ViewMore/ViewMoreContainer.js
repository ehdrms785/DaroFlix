import React from "react";
import ViewMorePresenter from "./ViewMorePresenter";
import { movieApi, tvApi } from "../../api";

export default class extends React.Component {
  state = {
    results: null,
    loading: true,
    error: null,
    page: 3,
    scroll: false,
  };

  async getData() {
    const {
      match: {
        params: { type, subject, query },
      },
    } = this.props;
    // console.log(`type:${type} , subject:${subject}, query:${query}`);

    try {
      if (type === "movie") {
        let movies1 = [];
        let movies2 = [];
        if (subject === "upComing") {
          ({
            data: { results: movies1 },
          } = await movieApi.upComing(1));
          ({
            data: { results: movies2 },
          } = await movieApi.upComing(2));
        } else if (subject === "nowPlaying") {
          ({
            data: { results: movies1 },
          } = await movieApi.nowPlaying(1));
          ({
            data: { results: movies2 },
          } = await movieApi.nowPlaying(2));
        } else if (subject === "popular") {
          ({
            data: { results: movies1 },
          } = await movieApi.popular(1));
          ({
            data: { results: movies2 },
          } = await movieApi.popular(2));
        } else if (subject === "search") {
          ({
            data: { results: movies1 },
          } = await movieApi.search(query, 1));
          ({
            data: { results: movies2 },
          } = await movieApi.search(query, 2));
        }
        const movies = [...movies1, ...movies2];
        this.setState({
          results: movies,
        });
      } else if (type === "show") {
        let shows1 = [];
        let shows2 = [];
        if (subject === "popular") {
          ({
            data: { results: shows1 },
          } = await tvApi.popular(1));
          ({
            data: { results: shows2 },
          } = await tvApi.popular(2));
        } else if (subject === "topRated") {
          ({
            data: { results: shows1 },
          } = await tvApi.topRated(1));
          ({
            data: { results: shows2 },
          } = await tvApi.topRated(2));
        } else if (subject === "airingToday") {
          ({
            data: { results: shows1 },
          } = await tvApi.airingToday(1));
          ({
            data: { results: shows2 },
          } = await tvApi.airingToday(2));
        }
        const shows = [...shows1, ...shows2];
        this.setState({
          results: shows,
        });
      }
    } catch {
      this.setState({ error: "Can not find View More Data from API" });
    } finally {
      this.setState({ loading: false });
    }
  }
  async getDataMore(page) {
    const {
      match: {
        params: { type, subject, query },
      },
    } = this.props;
    const { results, scroll } = this.state;
    // dconsole.log(`${type} and ${subject} and ${query}`);
    try {
      if (scroll) {
        if (type === "movie") {
          let movies1 = [];

          if (subject === "upComing") {
            ({
              data: { results: movies1 },
            } = await movieApi.upComing(page));
          }
          if (subject === "nowPlaying") {
            ({
              data: { results: movies1 },
            } = await movieApi.nowPlaying(page));
          }
          if (subject === "popular") {
            ({
              data: { results: movies1 },
            } = await movieApi.popular(page));
          }
          if (subject === "search") {
            ({
              data: { results: movies1 },
            } = await movieApi.search(query, page));
          }
          const movies = [...results, ...movies1];
          // console.log(`${type} and ${subject} and ${page}`);
          // console.log(movies1);

          /*  만약 movies1.length가 0이면 (더이상 가져올 데이터가 없으면)
            페이지업그레이드 안하고 스테이트 업데이트도 안하고 그대로 둔다 */
          if (movies1.length > 0) {
            this.setState((current) => ({
              results: movies,
              scroll: false,
              page: current.page + 1,
            }));
          }
        } else if (type === "show") {
          let shows1 = [];
          if (subject === "popular") {
            ({
              data: { results: shows1 },
            } = await tvApi.popular(page));
          }
          if (subject === "topRated") {
            ({
              data: { results: shows1 },
            } = await tvApi.topRated(page));
          }
          if (subject === "airingToday") {
            ({
              data: { results: shows1 },
            } = await tvApi.airingToday(page));
          }
          const movies = [...results, ...shows1];

          this.setState((current) => ({
            results: movies,
            scroll: false,
            page: current.page + 1,
          }));
        }
      }
    } catch {
      this.setState({ error: "Can not find Data from APIzz" });
    } finally {
      this.setState({ loading: false });
    }
  }
  infiniteScroll(e) {
    const { clientHeight, scrollHeight } = document.documentElement;

    const { results, scroll } = this.state;
    // if (results && scrollTop + clientHeight >= scrollHeight - 600) {
    if (results && window.scrollY + clientHeight >= scrollHeight - 600) {
      // ㄴ window.scrollY 를 사용하면 모바일에서 작동이 되더라 + IE9 이하에서는 pageOffset을 써 줘야한다
      // ㄴ state의 results 값을 체크해주지 않으면
      // ㄴ 스크롤이 내려가있는 상태에서 새로고침시 getData 값을 가져오기 이전에
      // ㄴ getDataMore를 실행해버린다 (그러면서 오류가 발생한다)
      // ㄴ
      if (scroll === false) {
        // ㄴ 이렇게 걸러주지 않으면 스크롤이 내려가서 추가로드할때 로드가 완료될때까지 (false로 돌아올때까지)
        // ㄴ 계속 this.setState를 실행시켜서 필요없는 렌더링을 몇번이고 한다
        this.setState({ scroll: true });
        this.getDataMore(this.state.page);
      }
    }
  }
  componentDidMount() {
    this.getData();
    window.addEventListener("scroll", this.infiniteScroll.bind(this));
  }
  componentDidUpdate() {}
  render() {
    const {
      match: {
        params: { type, subject },
      },
    } = this.props;
    const { results, loading, error } = this.state;
    //console.log(results);
    return (
      <ViewMorePresenter
        results={results}
        loading={loading}
        error={error}
        isMovie={type === "movie"}
        subject={subject}
      />
    );
  }
}

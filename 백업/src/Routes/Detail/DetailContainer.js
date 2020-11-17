import React from "react";
import DetailPresenter from "./DetailPresenter";
import { movieApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;

    this.state = {
      result: null,
      casts_result: null,
      recommends_result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      modal: false,
      modalType: null,
    };
  }

  async componentDidMount() {
    // console.log(this.props);
    this.getData();
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: { id: prevId },
      },
    } = prevProps;
    const {
      match: {
        params: { id: nowId },
      },
    } = this.props;
    // console.log(prevId, nowId);
    if (prevId !== nowId) {
      this.getData();
    }
  }
  getData = async () => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;

    const { isMovie } = this.state;
    const parsedIntId = parseInt(id);
    if (isNaN(parsedIntId)) {
      return push("/");
    }
    let result = null;
    let casts_result = null;
    let recommends_result = null;
    try {
      if (isMovie) {
        ({ data: result } = await movieApi.movieDetail(parsedIntId));
        ({
          data: { cast: casts_result },
        } = await movieApi.getCasts(parsedIntId));
        ({
          data: { results: recommends_result },
        } = await movieApi.getSimilarMovies(parsedIntId, 1));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedIntId));
        ({
          data: { cast: casts_result },
        } = await tvApi.getCasts(parsedIntId));
      }
    } catch {
      // If api couldn't get data
      // 임시로
      // return push("/");
      this.setState({ error: "Can not find anything" });
    } finally {
      this.setState({
        loading: false,
        result,
        casts_result,
        recommends_result,
      });
    }
  };
  changeParam = (id) => {
    const {
      history: { push },
    } = this.props;
    push(`/movie/${id}`);
  };

  render() {
    const {
      result,
      casts_result,
      recommends_result,
      error,
      loading,
      isMovie,
    } = this.state;
    return (
      <DetailPresenter
        result={result}
        casts_result={casts_result}
        recommends_result={recommends_result}
        error={error}
        loading={loading}
        isMovie={isMovie}
        changeParam={this.changeParam}
        handleOpenModal={this.handleOpenModal}
        handleCloseModal={this.handleCloseModal}
      />
    );
  }
}

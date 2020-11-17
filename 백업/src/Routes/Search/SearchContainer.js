import React from "react";
import SearchPresenter from "./SearchPresenter";
import { movieApi, tvApi } from "../../api";
import { Redirect } from "react-router";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    error: null,
    loading: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      this.searchByTerm(searchTerm);
      this.props.history.push(`/search?query=${searchTerm}`);
    }
  };
  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({
      searchTerm: value,
    });
  };

  searchByTerm = async (query) => {
    try {
      this.setState({ loading: true });
      let movieResults = null;
      let tvResults = null;
      //   console.log(`query:${query}`);
      // query 값이 null이면 , null 값을 반환해서 검색 초기상태가 되게 만들기 위한 로직
      // movieResults = [] 로 초기화를 하면 presenter에서 있는걸로 인식을해서
      // data를 가져오지 못한걸로 판단해서 메세지를 띄운다.
      if (query) {
        ({
          data: { results: movieResults },
        } = await movieApi.search(query));
        ({
          data: { results: tvResults },
        } = await tvApi.search(query));
      }
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({
        error: "Can't find results",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };
  queryCheck() {
    const {
      location: { search },
    } = this.props;
    const params = new URLSearchParams(search);
    const query = params.get("query");
    //   console.log(`query: ${query}`);
    if (query === null) {
      // 현재 query가 아무값도 없을때 ! searchTerm 초기화시켜주고 리렌더링 그리고 url 이동!
      this.setState({ searchTerm: "" });
      this.props.history.push("/search");
    } else {
      this.setState({ searchTerm: query });
    }
    this.searchByTerm(query);
  }
  componentDidMount() {
    this.queryCheck();
  }
  componentDidUpdate(prevProps) {
    const {
      location: { search: prevSearch },
    } = prevProps;
    const {
      location: { search: nowSearch },
    } = this.props;
    // console.log(prevSearch, nowSearch);

    if (prevSearch !== nowSearch) {
      this.queryCheck();
    }
  }
  render() {
    const { movieResults, tvResults, searchTerm, error, loading } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        error={error}
        loading={loading}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm}
      />
    );
  }
}

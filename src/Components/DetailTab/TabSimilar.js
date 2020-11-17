import React from "react";
import styled from "styled-components";
import { movieApi } from "../../api";
import { Link } from "react-router-dom";

export default class TabSimilar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie_results: null,
      scroll: false,
      page: 2,
    };
    this.infiniteScroll = this.infiniteScroll.bind(this);
  }

  async getDataMore() {
    const { movie_results, scroll, page } = this.state;
    const { movie_id } = this.props;
    // const { recommends_ } = this.props;

    try {
      if (scroll) {
        let new_movies = [];
        ({
          data: { results: new_movies },
        } = await movieApi.getSimilarMovies(movie_id, page));

        // new_movies가 있을때만 업데이트
        if (new_movies.length > 0) {
          const movies = [...movie_results, ...new_movies];
          this.setState((current) => ({
            movie_results: movies,
            scroll: false,
            page: current.page + 1,
          }));
        }
      }
    } catch (e) {
      this.setState({ error: "Can not find Similar Data from API" });
    } finally {
      this.setState({ loading: false });
    }
  }
  infiniteScroll(e) {
    let target = e.target;

    const { clientHeight, scrollHeight, scrollTop } = target;
    const { scroll } = this.state;

    // console.log(`Scroll Top : ${scrollTop}`);
    // console.log(`clientHieght: ${clientHeight}`);
    // console.log(`scrollHeight: ${scrollHeight}`);
    if (scrollTop + clientHeight >= scrollHeight - 500) {
      if (scroll === false) {
        this.setState({ scroll: true });
        this.getDataMore();
      }
    }
  }
  componentDidUpdate() {
    document
      .getElementById("Movie_result")
      .addEventListener("scroll", this.infiniteScroll.bind(this));
  }
  componentWillUnmount() {
    document
      .getElementById("Movie_result")
      .removeEventListener("scroll", this.infiniteScroll);
  }
  componentDidMount() {
    this.setState({
      movie_results: this.props.recommends_result,
    });
    // window.addEventListener("scroll", this.infiniteScroll);
    // document.addEventListener("scroll", this.infiniteScroll.bind(this));
    // document
    //   .getElementsByClassName("Movie_result")
    //   .addEventListner("scroll", this.infiniteScroll);
  }
  render() {
    const { movie_results } = this.state;
    return (
      <Container id="Movie_result">
        {movie_results &&
          movie_results.map((movie) => (
            <Link to={`/movie/${movie.id}`}>
              <MovieContainer>
                <Cover
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      : require("../../assets/NoPoster.jpg")
                  }
                ></Cover>
                <Title>
                  {movie.title.length > 17
                    ? `${movie.title.substring(0, 17)} ...`
                    : movie.title}
                </Title>
              </MovieContainer>
            </Link>
          ))}
      </Container>
    );
  }
}

const Container = styled.div`
  height: 90%;
  margin-bottom: 25px;
  overflow-y: scroll;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  grid-gap: 40px;
  justify-content: center;
`;
const MovieContainer = styled.div`
  margin: auto;
`;
const Cover = styled.img`
  width: 200px;
  height: 250px;
  display: block;
  margin-top: 20px;
`;
const Title = styled.span`
  font-size: 18px;
  text-align: center;
  display: block;
  line-height: 1.5;
  margin-top: 10px;
`;

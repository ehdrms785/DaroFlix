import React from "react";
import styled from "styled-components";
import { movieApi } from "../api";
import Loading from "./Loading";

// 모달 배경 클릭 안되게 설정하는 컨테이너
const MyModalContainer = styled.div`
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 실제 모달 컨텐트 부분
const Content = styled.div`
  width: 1000px;
  height: 500px;
  background: grey;
  z-index: 3;
  overflow-y: auto;
  display: block;
  margin: auto;
`;

const CloseButton = styled.button`
  color: white;
  font-size: 80px;
  position: absolute;
  right: 165px;
  top: 52px;
  transform: rotate(45deg);
`;

// 프로필 커버사진과 설명을 세로형식으로 나누기 위한 부분
const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ProfileCover = styled.img`
  width: 300px;
  min-width: 300px;
  height: 90%;
  margin: auto 50px;
`;

// 자세한 설명 부분
const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 80%;
  margin-right: 100px;
  margin: auto 30px;
`;

const Name = styled.h1`
  font-size: 31px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Context = styled.h2`
  font-size: 14px;
  margin-bottom: 20px;
`;

const Biography = styled.h3`
  font-size: 13px;
  line-height: 1.5;
  overflow-y: ${(props) => (props.text_length > 900 ? "scroll" : "unset")};
  /* overflow 될 사이즈가 되면 y축 scroll만 생성 ! 아니면 unset  */
  margin: 5px 0;
`;
// { casts_result, onClose }
class CastModal extends React.Component {
  state = {
    loading: true,
    error: null,
    cast_detail: null,
  };
  componentDidMount() {
    // console.log("CastModal Did Mount !");
    this.getCastDetail();
  }
  async getCastDetail() {
    const { cast_id } = this.props;
    // console.log(cast_id, typeof cast_id);
    if (cast_id) {
      let cast_detail = null;
      try {
        ({ data: cast_detail } = await movieApi.getCastDetail(cast_id));
      } catch {
        this.setState({ error: "Can not find cast's data from api !" });
      } finally {
        this.setState({ loading: false, cast_detail });
      }
    }
  }
  render() {
    const { onClose } = this.props;
    const { loading, error, cast_detail } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <MyModalContainer>
        <Content>
          <CloseButton onClick={onClose}>+</CloseButton>
          <ProfileContainer>
            <ProfileCover
              src={
                cast_detail.profile_path
                  ? `https://image.tmdb.org/t/p/w300${cast_detail.profile_path}`
                  : require("../assets/noProfile.png")
              }
            />

            <ProfileDetail>
              <Name>{cast_detail.name}</Name>
              <Title>Birthday</Title>
              <Context>{cast_detail.birthday}</Context>
              <Title>Birth_Place</Title>
              <Context>{cast_detail.place_of_birth}</Context>

              {cast_detail.deathday ? (
                <>
                  <Title>Deathday</Title>
                  <Context> {cast_detail.deathday}</Context>
                </>
              ) : null}
              <Title>Biography</Title>
              <Biography text_length={cast_detail.biography.length}>
                {cast_detail.biography}
              </Biography>
            </ProfileDetail>
          </ProfileContainer>
        </Content>
      </MyModalContainer>
    );
  }
}

export default CastModal;

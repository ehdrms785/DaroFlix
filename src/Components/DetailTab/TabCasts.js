import React from "react";
import styled from "styled-components";
import ModalPortal from "../ModalPortal";
import CastModal from "../CastModal";

const BigContainer = styled.div`
  position: relative;
  margin-right: 40px;
  text-align: center;
  margin-top: 30px;
`;
const Container = styled.div`
  position: relative;
  height: 290px;
  max-width: 160px;
  margin: 0 auto;

  /* 원래는 ::after 였는데 after 하니까 버튼영역을 덮어서 이미지를 가려버림 */
  &::before {
    content: "";
    display: block;
    width: 100%;
    /* height: 175px; */
    outline: 5px solid #72a9e3;
    position: absolute;
    /* top: 56px; */
    left: 8px;
    /* max-width: 150px; */
    width: 200px;
    height: 216px;
    top: 24px;
  }
`;

const SliderWrapper = styled.div`
  height: 100%;
  /* width:100%; */
  display: flex;
  align-items: center;
  position: absolute;
  transition: transform 500ms cubic-bezier(0.413, 0.03, 0.1, 0.4);
`;

const CastContainer = styled.div`
  ${(props) =>
    props.index === props.nowTarget
      ? "opacity:1;transform: scale(1);"
      : Math.abs(props.nowTarget - props.index) > 1
      ? "opacity:0;"
      : "opacity:0.5; transform: scale(0.7);"}
  transition: all 0.3s linear;
`;

const Cover = styled.img`
  /* width: 150px;
  height: 180px; */
  width: 200px;
  height: 220px;
`;
const CastName = styled.span`
  display: block;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
  margin-top: 8px;
`;
const PrevButton = styled.button`
  font-size: 20px;
  position: absolute;
  left: 0;
  top: -22px;
  z-index: 1;

  &:disabled {
    color: grey;
  }
`;

const NextButton = styled.button`
  font-size: 20px;
  position: absolute;
  right: -36px;
  top: -22px;
  z-index: 1;
  &:disabled {
    color: grey;
  }
`;

const CastButton = styled.button``;

export default class TabCasts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      modalOpen: false,
      cast_id: null,
    };
    this.nextButton = this.nextButton.bind(this);
    this.preButton = this.preButton.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  nextButton = () => {
    let newIndex = this.state.index + 1;
    this.setState({ index: newIndex });
  };
  preButton = () => {
    let newIndex = this.state.index - 1;
    this.setState({ index: newIndex });
  };
  handleModalOpen = (cast_id) => {
    this.setState({ modalOpen: true, cast_id: cast_id });
  };
  handleModalClose = () => {
    this.setState({ modalOpen: false, cast_id: null });
  };
  render() {
    const { index, modalOpen, cast_id } = this.state;
    const { casts_result } = this.props;
    return (
      <BigContainer>
        {" "}
        <PrevButton onClick={() => this.preButton()} disabled={index === 0}>
          Prev
        </PrevButton>
        <NextButton
          onClick={() => this.nextButton()}
          disabled={index === casts_result.length - 1}
        >
          Next
        </NextButton>
        {/* 이미지를 둘러 싸고 있는 사각박스를 위한 컨테이너 */}
        <Container>
          {/* state.index는 Prev, Next 버튼을 누르면 값이 변한다
          그리고 그 변한 index값을 기준으로 이 SliderWrapper가
           X축을 변경해줌으로써 슬라이딩이 가능해진다 */}
          <SliderWrapper
            style={{
              transform: `translateX(-${
                this.state.index * (100 / casts_result.length)
              }%`,
            }}
          >
            {casts_result &&
              casts_result.map((cast, idx) => (
                <CastContainer key={idx} index={idx} nowTarget={index}>
                  <CastButton
                    // 클릭한 cast.id 값을 state로 업데이트를 시킨다
                    // 그 업데이트 한 값을  CastModal 컴포넌트로 넘긴다
                    // 그 cast_id 값을 모달로 넘겨서 그 cast_id값으로 해당 인물디테일 가져온다
                    onClick={() => this.handleModalOpen(cast.id)}
                    disabled={idx !== index}
                    // idx : map함수의 인수(인덱스) , index : state의 index (현재 포커스 index값)
                  >
                    <Cover
                      src={
                        cast.profile_path
                          ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                          : require("../../assets/noProfile.png")
                      }
                    ></Cover>

                    <CastName>
                      {cast.name.length < 20
                        ? cast.name
                        : `${cast.name.substring(0, 18)}..`}
                    </CastName>
                  </CastButton>
                </CastContainer>
              ))}
          </SliderWrapper>
          {modalOpen && (
            <ModalPortal>
              <CastModal cast_id={cast_id} onClose={this.handleModalClose} />
            </ModalPortal>
          )}
        </Container>
      </BigContainer>
    );
  }
}

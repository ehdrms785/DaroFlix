import React from "react";
import styled from "styled-components";

const VideoContainer = styled.iframe`
  width: 100%;
  height: calc(100% - 40px);
`;

export default function TabYoutube({ youtubeKey }) {
  return (
    <VideoContainer
      src={`https://www.youtube.com/embed/${youtubeKey}`}
      allow="fullscreen ; encrypted-media; gyroscope; picture-in-picture"
    ></VideoContainer>
  );
}

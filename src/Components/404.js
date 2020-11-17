import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    color: #95a5a6;
    font-size: 18px;
    font-weight: 600;
    margin-top: 100px;

`;

const NotFound = ( { text }) => (
    <Container>
        <Text>
            {text}
        </Text>
    </Container>
)

NotFound.proTypes = {
    text: PropTypes.string.isRequired
}
export default Error;

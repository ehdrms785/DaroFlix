import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    color: ${props => props.color};
    font-size: 18px;
    font-weight: 600;
    margin-top: 100px;

`;

const Message = ( { text , color }) => (
    <Container>
        <Text color={color}>
            {text}
        </Text>
    </Container>
)

Message.proTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired
}
export default Message;

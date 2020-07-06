import React from 'react';
import { ChatMessage } from "@/components/ChatRoom/context/type-d";
import styled from "styled-components";

const Message: React.FC<ChatMessage> = ({
  message,
  timestamp,
  userCode
                                        }) => {
  return (
    <Wrapper>
      <div>
        <span>
          {userCode}
        </span>
        <span>
          {timestamp}
        </span>
      </div>
      <Body>
        {message}
      </Body>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 5px;
`
const Body = styled.div`
  background-color: #dff0ff;
  max-width: 70%;
  width: fit-content;
  border-radius: 15px;
  padding: 8px 12px;
  word-break: break-word;
  margin-top: 3px
`

export default Message;
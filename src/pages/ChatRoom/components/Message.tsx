import React from 'react';
import { ChatMessage } from "@/pages/ChatRoom/context/type-d";
import styled from "styled-components";

const Message: React.FC<ChatMessage> = ({
  message,
  timestamp,
  userCode
                                        }) => {
  return (
    <div>
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
    </div>
  );
};

const Body = styled.div`
  background-color: #dff0ff;
  width: 70%;
  border-radius: 15px;
  padding: 15px;
`

export default Message;
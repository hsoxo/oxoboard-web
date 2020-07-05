import React, { createContext } from "react";
import { initChatRoomState } from "@/pages/ChatRoom/context/slice";
import { ChatRoomState } from "@/pages/ChatRoom/context/type-d";

export const ChatRoomContext = createContext<{
  state: ChatRoomState,
  dispatch: React.Dispatch<any>;
}>({
  state: initChatRoomState(),
  dispatch: () => null
});

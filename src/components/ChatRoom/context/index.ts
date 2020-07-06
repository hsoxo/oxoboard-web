import React, { createContext } from "react";
import { initChatRoomState } from "@/components/ChatRoom/context/slice";
import { ChatRoomState } from "@/components/ChatRoom/context/type-d";

export const ChatRoomContext = createContext<{
  state: ChatRoomState,
  dispatch: React.Dispatch<any>;
}>({
  state: initChatRoomState(),
  dispatch: () => null
});

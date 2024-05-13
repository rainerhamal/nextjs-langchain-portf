"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import AIChatBox from "./AIChatBox";

export default function AIChatButton() {
    const [chatBoxOpen, setChatBoxOpen] = useState(false);
    const toggleChatBox = () => {
      setChatBoxOpen(prevState => !prevState);
    };

    return (
        <>
          {/* <button onClick={() => setChatBoxOpen(true)}>
            <Bot size={24} />
          </button> */}
          {/*OR*/}
          <button onClick={toggleChatBox}>
            <Bot size={24} />
          </button>

          <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
        </>
      );
}
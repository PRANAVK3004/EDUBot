import React, { useState, useEffect, useRef } from 'react';
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import 'regenerator-runtime/runtime';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  InputToolbox
} from "@chatscope/chat-ui-kit-react";
import { message } from "antd";
import { FaMicrophone } from 'react-icons/fa';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

export default function ChatArea({ sendMessage }) {
  const [typing, setTyping] = useState(false);
  const [messageApi] = message.useMessage();
  const [messages, setMessages] = useState([
    {
      message: "Hello I Am EduBot",
      sender: "ChatBot",
      direction: "incoming"
    }
  ]);
  const [userInput, setUserInput] = useState('');

  const inputRef = useRef();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const handleSend = async (message) => {
    if (!message) return;
  
    SpeechRecognition.stopListening();
    resetTranscript();
    setUserInput('');
  
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing"
    };
  
    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
  
    setTyping(true);
  
    try {
      const botResponse = await sendMessage(message);
  
      const botMessage = {
        message: botResponse,
        sender: "ChatBot",
        direction: "incoming"
      };
  
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      const errorMessage = {
        message: `Error: ${error.message}`,
        sender: "ChatBot",
        direction: "incoming"
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setTyping(false);
    }
  };

  const handleMicClick = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  useEffect(() => {
    if (listening) {
      setUserInput(transcript);
      inputRef.current.focus();
    }
  }, [transcript, listening]);

  return (
    <MainContainer>
      <ChatContainer>
        <MessageList
          typingIndicator={typing ? <TypingIndicator content="EduBot is typing" /> : null}>
          {messages.map((message, i) => (
            <Message key={i} model={message} />
          ))}
        </MessageList>

        <InputToolbox className="inputBox" style={{ display: 'flex', alignItems: 'center' }}>
          <button
            className='cs-button--mic'
            onClick={handleMicClick}>
            <FaMicrophone size={22} color={listening ? 'red' : 'black'} />
          </button>

          <MessageInput
            ref={inputRef}
            placeholder={listening ? "Listening..." : "Enter Prompt Here"}
            value={userInput}
            onSend={handleSend}
            onChange={(val) => {
              setUserInput(val);

              if (val.trim() === '') {
                SpeechRecognition.startListening({ continuous: true });
              } else {
                SpeechRecognition.stopListening();
              }
            }}
            attachButton={false}
            style={{ flex: 1 }}
          />
        </InputToolbox>
      </ChatContainer>
    </MainContainer>
  );
}
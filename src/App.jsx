// import React, { useState, useEffect } from 'react';
// import './App.css';
// import { Layout, Button, Input, Typography } from 'antd';
// import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import axios from 'axios';

// import ChatArea from './Components/ChatArea';
// import Login from './Components/Login';
// import Logo from './Components/Logo';
// import MenuList from './Components/MenuList';
// import Settings from './Components/Settings';
// import History from './Components/History';

// const { Sider, Content } = Layout;
// const { Text } = Typography;

// // Set the base URL for all axios requests
// //axios.defaults.baseURL = 'http://localhost:5173/';  // Changed to Flask server port

// function App() {
//   const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
//   const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
//   const [chatKey, setChatKey] = useState(Date.now());
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [input, setInput] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       const isSmall = window.innerWidth < 768;
//       setIsSmallScreen(isSmall);
//       setCollapsed(isSmall);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const contentMarginLeft = collapsed ? (isSmallScreen ? 0 : 80) : 250;

//   const handleNewChat = () => {
//     setChatKey(Date.now());
//     setMessages([]);
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   const handleSend = async () => {
//     if (!input.trim()) return;
  
//     const userMessage = { text: input, sender: 'user' };
//     setMessages(prev => [...prev, userMessage]);
//     setInput('');
//     setIsTyping(true);
  
//     try {
//       console.log('Sending request to /api/chat');
//       const response = await axios.post('/api/chat', { message: input }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         timeout: 5000, // 10 seconds timeout
//       });
//       console.log('Received response:', response.data);
//       const botMessage = { text: response.data.response, sender: 'bot' };
//       setMessages(prev => [...prev, botMessage]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//       let errorMessage = 'Sorry, an error occurred. Please try again.';
  
//       if (axios.isAxiosError(error)) {
//         if (error.response) {
//           console.error('Response data:', error.response.data);
//           console.error('Response status:', error.response.status);
//           errorMessage = `Server error: ${error.response.status}. ${error.response.data.error || 'Unknown error'}`;
//         } else if (error.request) {
//           console.error('No response received:', error.request);
//           errorMessage = 'No response received from server. Please check your connection.';
//         } else {
//           console.error('Error setting up request:', error.message);
//           errorMessage = 'Error setting up request. Please try again later.';
//         }
//       }
  
//       setMessages(prev => [...prev, { text: errorMessage, sender: 'bot' }]);
//     } finally {
//       setIsTyping(false);
//     }
//   };

//   return (
//     <Router>
//       <Layout style={{ minHeight: '100vh' }}>
//         {!isAuthenticated ? (
//           <Login onLogin={handleLogin} />
//         ) : (
//           <>
//             <Sider
//               collapsed={collapsed}
//               collapsible
//               trigger={null}
//               className="sidebar"
//               width={250}
//               style={{ display: isSmallScreen && collapsed ? 'none' : 'block' }}
//             >
//               <Logo collapsed={collapsed} />
//               <hr style={{ border: '1px solid white', width: '80%', margin: '0 auto' }} />
//               <MenuList onNewChat={handleNewChat} />
//             </Sider>

//             <Layout className="main-content" style={{ marginLeft: contentMarginLeft }}>
//               <Button
//                 type="text"
//                 className="toggle"
//                 onClick={() => setCollapsed(!collapsed)}
//                 icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//               />
//               <Content className="content-area">
//                 <Routes>
//                   <Route path="/" element={<ChatArea messages={messages} isTyping={isTyping} />} />
//                   <Route path="/new-chat" element={<ChatArea key={chatKey} messages={messages} isTyping={isTyping} />} />
//                   <Route path="/history" element={<History />} />
//                   <Route path="/settings" element={<Settings />} />
//                 </Routes>
//                 <div style={{ position: 'fixed', bottom: 20, left: contentMarginLeft + 20, right: 20 }}>
//                   <Input.Search
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onSearch={handleSend}
//                     enterButton="Send"
//                     placeholder="Type your message here..."
//                   />
//                 </div>
//               </Content>
//             </Layout>
//           </>
//         )}
//       </Layout>
//     </Router>
//   );
// }

// export default App;


import { useState, useEffect } from 'react';
import './App.css';
import { Layout, Button } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import ChatArea from './Components/ChatArea';
import Login from './Components/Login';
import Logo from './Components/Logo';
import MenuList from './Components/MenuList';
import Settings from './Components/Settings';
import History from './Components/History';

const { Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [chatKey, setChatKey] = useState(Date.now());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmall = window.innerWidth < 768;
      setIsSmallScreen(isSmall);
      setCollapsed(isSmall);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contentMarginLeft = collapsed ? (isSmallScreen ? 0 : 80) : 250;

  const handleNewChat = () => {
    setChatKey(Date.now());
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const sendMessage = async (message) => {
    try {
      console.log('Sending message:', message);
      const response = await axios.post('http://192.168.1.106:5172/api', { message });
      console.log('Received response:', response.data);
      return response.data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
      return 'An error occurred while processing your request. Please check the console for more details.';
    }
  };

  return (
    <Router>
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsed={collapsed}
            collapsible
            trigger={null}
            className="sidebar"
            width={250}
            style={{ display: isSmallScreen && collapsed ? 'none' : 'block' }}
          >
            <Logo collapsed={collapsed} />
            <hr style={{ border: '1px solid white', width: '80%', margin: '0 auto' }} />
            <MenuList onNewChat={handleNewChat} />
          </Sider>

          <Layout className="main-content" style={{ marginLeft: contentMarginLeft }}>
            <Button
              type="text"
              className="toggle"
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <AiOutlineMenuUnfold className="menu-icon" /> : <AiOutlineMenuFold className="menu-icon" />}
            />
            <Content className="content-area">
              <Routes>
                <Route path="/" element={<ChatArea key={Math.random()} sendMessage={sendMessage} />} />
                <Route path="/new-chat" element={<ChatArea key={chatKey} sendMessage={sendMessage} />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </Router>
  );
}

export default App;
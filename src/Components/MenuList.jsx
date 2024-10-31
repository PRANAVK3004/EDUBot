import React from 'react';
import { Menu } from 'antd';
import { PlusSquareOutlined, HistoryOutlined } from "@ant-design/icons";
import { FaRegBookmark } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link } from 'react-router-dom';


const MenuList = ({ onNewChat, onLogin }) => {


  return (
    <Menu className="custom-menu" theme='dark' mode='inline'>
      <Menu.Item key='NewChat' icon={<PlusSquareOutlined />} onClick={onNewChat}>
        <Link to="/new-chat">New Chat</Link>
      </Menu.Item>
      <Menu.SubMenu key='History' icon={<HistoryOutlined />} title='History' className="submenu-scroll">
       
        
        <Menu.Item key="His1">History 1</Menu.Item>
        <Menu.Item key="His2">History 2</Menu.Item>
        <Menu.Item key="His3">History 3</Menu.Item>
        <Menu.Item key="His4">History 4</Menu.Item> 
        </Menu.SubMenu>
      <Menu.Item key='BookMarks' icon={<FaRegBookmark />}>Bookmark</Menu.Item>
      <Menu.Item key='Settings' icon={<IoSettingsOutline />}>
      <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key='LogOut' icon={<RiLogoutBoxLine />} >Logout </Menu.Item>
    </Menu>
  )
}

export default MenuList;
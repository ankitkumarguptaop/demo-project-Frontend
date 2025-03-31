"use client";
import React, { useEffect, useState } from "react";
import style from "./message.module.css";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MessageBox from "@/components/message-box/message";
const Message = () => {
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.event.selectedChat);
  console.log('✌️selectedChat --->', selectedChat);




  return (
    <Box className={style["message-container"]}>
      <Box className={style["right-container"]}>
        {selectedChat && (
          <MessageBox
            selectedChat={selectedChat}
          ></MessageBox>
        )}
      </Box>
    </Box>
  );
};

export default Message;

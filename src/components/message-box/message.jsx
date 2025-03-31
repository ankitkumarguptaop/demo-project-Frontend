"use client";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import style from "./message.module.css";
import SentimentSatisfiedRoundedIcon from "@mui/icons-material/SentimentSatisfiedRounded";
import { createMessage, listMessage } from "@/features/message/message.action";
import { useDispatch, useSelector } from "react-redux";

import { addNewMessage } from "@/features/message/message.slice";
import { ClipLoader } from "react-spinners";
import LocalPhoneSharpIcon from '@mui/icons-material/LocalPhoneSharp';
import VideocamSharpIcon from '@mui/icons-material/VideocamSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import { get } from "react-hook-form";
import { getSocket } from "@/configs/socket";

const MessageBox = ({ selectedChat }) => {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const messages = useSelector((state) => state.message.messages);
  const isLoading = useSelector((state) => state.message.isLoading);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const scrollToBottom = () => {

    const messageContainer = messagesEndRef.current;
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  };

  useEffect(() => {
    const socket = getSocket();
    socket.on("message-receiver", (message) => {
      console.log('✌️message sdsdas--->', message, socket.id);
      dispatch(addNewMessage(message));
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    dispatch(listMessage({ chatId: selectedChat.id }));
  }, [selectedChat]);

  return (
    <Box className={style["message-container"]}>
      <Box className={style["message-header"]}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "center", margin: "0px 10px" }}>
            <Avatar
              alt="Remy Sharp"
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL
                }/${selectedChat.image?.replace(/\\/g, "/")}`}
            />
            <Box>
              <Typography sx={{ padding: "0px 10px", fontWeight: "bold" }}>
                {selectedChat?.name}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: "15px", margin: "0px 10px" }}>
            <LocalPhoneSharpIcon></LocalPhoneSharpIcon>
            <VideocamSharpIcon></VideocamSharpIcon>
            <InfoSharpIcon></InfoSharpIcon>
          </Box>
        </Box>
      </Box>
      {!isLoading ? <Box className={style["message-content"]} ref={messagesEndRef}>
        {messages.length > 0 ? (
          messages.map((message) => {
            return (
              <Box className={
                message.sender_id === currentUser.user.id
                  ? style["sender-message"]
                  : style["reciever-message"]
              }
                key={message.id}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                > <Avatar
                    alt="Remy Sharp"
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL
                      }/${message?.sender?.profile_image?.replace(
                        /\\/g,
                        "/"
                      )}`} />
                  <Box>
                    <Typography
                      className={style["single-message"]}
                      sx={{
                        fontSize: "10px",
                        padding: "8px 15px",
                        borderRadius: "25px",
                      }}
                    >
                      {message?.sender?.name}
                    </Typography>
                    <Typography
                      className={style["single-message"]}
                      sx={{
                        fontSize: "15px",
                        display: "inline-block",
                        padding: "8px 15px",
                        borderRadius: "25px",
                      }}
                    >
                      {message.message}
                    </Typography>
                  </Box>
                </Box>

              </Box>
            );
          })
        ) : (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }} >
            <Typography>No Messages</Typography>
          </Box>
        )}
      </Box> : <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }} ><ClipLoader /></Box>}
      <Box className={style["input-box"]}>
        <TextField
          className={style["input-textfeild"]}
          multiline
          maxRows={1}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={{
            width: "94%",
            outline: "none",
            borderRadius: "50px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '50px',
            }
          }}
          id="standard-basic"
          placeholder="Message..."
          variant="outlined"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label="description for action">
                    <SentimentSatisfiedRoundedIcon sx={{ color: "black" }} />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={content === ""}
                    onClick={() => {
                      dispatch(
                        createMessage({
                          chatId: selectedChat.id,
                          message: content,
                        })
                      );
                      setContent("");
                    }}
                  >
                    Send
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />

      </Box>
    </Box>
  );
};

export default MessageBox;

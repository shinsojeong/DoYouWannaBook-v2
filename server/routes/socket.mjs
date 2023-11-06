import { Server } from "socket.io";
import { createServer } from "http";
import Message from "../models/message.mjs";

export const socketIO = (app) => {
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "https://web-front-euegqv2llo71vvuq.sel5.cloudtype.app/",
    },
  });

  io.on("connect", (socket) => {
    //채팅방 입장
    socket.on("enter", ({ chat_code, std_num }) => {
      socket.join(chat_code);
      socket["std_num"] = std_num;
    });

    //메세지 전송
    socket.on("send", async ({ chat_code, sender, msg }) => {
      try {
        await Message.create({
          msg,
          chat: chat_code,
          sender,
        });
        socket.sockets(chat_code).emit("send", { sender, msg });
      } catch (error) {
        console.error(error);
      }
    });

    // 연결해제
    socket.on("disconnect");
  });
};

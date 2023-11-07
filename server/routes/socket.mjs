import Message from "../models/message.mjs";

const clients = new Set();

export const socketIO = (wss) => {
  wss.on("connection", (ws) => {
    clients.add(ws);
    //채팅방 입장
    ws.on("enter", ({ chat_code, std_num }) => {
      ws.join(chat_code);
      ws["std_num"] = std_num;
    });

    //메세지 전송
    ws.on("send", async ({ chat_code, sender, msg }) => {
      try {
        await Message.create({
          msg,
          chat: chat_code,
          sender,
        });
        ws.to(chat_code).emit("send", { sender, msg });
      } catch (error) {
        console.error(error);
      }
    });

    // 연결해제
    ws.on("disconnect", () => {
      clients.delete(ws);
    });
  });
};

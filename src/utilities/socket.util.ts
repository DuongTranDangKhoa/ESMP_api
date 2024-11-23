import { Server } from 'socket.io';
import { createServer } from 'http';

let io: Server;

// Hàm khởi tạo Socket.IO
export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: '*', // Điều chỉnh nếu cần
    },
  });

 io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Đăng ký userId cho client
  socket.on('register', ({ userId }) => {
    socket.join(userId); // Tham gia phòng dựa trên userId
    console.log(`User ${userId} registered with socket ID ${socket.id}`);
  });

  // Ngắt kết nối
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

  return io;
};

// Xuất `io` để sử dụng ở nơi khác
export const getIo = () => {
  if (!io) throw new Error('Socket.IO chưa được khởi tạo!');
  return io;
};
export const httpServer = createServer();

export function generateOTP(length = 6) {
  const otp = Math.floor(Math.random() * Math.pow(10, length)); // Tạo số ngẫu nhiên có độ dài 'length'
  return otp.toString().padStart(length, '0'); // Đảm bảo OTP có đủ độ dài, thêm số 0 nếu cần
}
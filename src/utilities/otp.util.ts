export function generateOTP(length = 6) {
  const otp = Math.floor(Math.random() * Math.pow(10, length)); 
  return otp.toString().padStart(length, '0'); 
}
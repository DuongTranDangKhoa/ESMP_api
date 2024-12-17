import { eventRepo } from './event.repo';
import { EventObject } from './event.schema';
import { HostDbClient } from '../../database/dbClient.db';
import { EventStatus } from '../../common/constant/common.constant';
import eventpaymentService from '../eventpayment/eventpayment.service';
import serviceService from '../service/service.service';

const getAllEvent = async (hostId: string, hostDb: HostDbClient) => {
  return await eventRepo.getAllEvent(hostId, hostDb);
};

const getEventById = async (eventId: string, hostDb: HostDbClient) => {
  return await eventRepo.getEventById(eventId, hostDb);
};

const createEvent = async (event: EventObject, hostDb: HostDbClient) => {
if (event.startDate && event.endDate && event.startDate > event.endDate) {
  throw new Error('End date must be greater than start date');
}
  return await eventRepo.createEvent(event, hostDb);
};

const updateEvent = async (eventId: string, updateData: EventObject, hostDb: HostDbClient) => {
  return await eventRepo.updateEvent(eventId, updateData, hostDb);
};

const deleteEvent = async (eventId: string, hostDb: HostDbClient) => {
  await eventRepo.deleteEvent(eventId, hostDb);
};

const getEventVendorList = async (eventId: string, hostDb: HostDbClient) => {
  return await eventRepo.getEventVendorList(eventId, hostDb);
};
const profitOfEvent = async (hostId: string, hostDb: HostDbClient) => {
  const eventList = await eventRepo.getAllEvent(hostId, hostDb);
  const eventProfit = []; // Khởi tạo mảng chứa kết quả lợi nhuận các sự kiện
  
  for (const event of eventList) {
    // Lấy thông tin thanh toán và dịch vụ của sự kiện
    const eventPayment = await eventpaymentService.getEventPaymentInEvent(event.eventId, hostDb);
    const service = await serviceService.getService(event.eventId, hostDb);

    // Kiểm tra nếu eventPayment và service không phải là mảng hoặc là rỗng
    if (!Array.isArray(eventPayment) || !Array.isArray(service)) {
      continue; // Nếu không có dữ liệu hợp lệ, bỏ qua sự kiện này
    }

    // Tính số lượng vendor hoàn thành
    const numberOfFinishedVendors = eventPayment.filter(payment => payment.status === 'Finished').length;

    // Tính tổng lợi nhuận cho sự kiện
    const totalEvent = eventPayment
      .filter(payment => payment.status === 'Finished')
      .reduce((acc, ep) => {
        const total = ep.totalprofit.toNumber(); 
        const deposit = ep.deposit.toNumber(); 
        if (!isNaN(total) && !isNaN(deposit)) {
          return acc + (total - deposit ); 
        }
        return acc;
      }, 0);

   
    const totalCost = service.reduce((acc, s) => {
      const price = s.price; 
      const quantity = s.quantity; 
      return acc + (price * quantity); 
    }, 0);
    const profit = totalEvent - (totalCost * numberOfFinishedVendors);

    // Lưu lại lợi nhuận của sự kiện
    eventProfit.push({
      eventName: event.name,
      profit: profit || 0, // Đảm bảo profit không bị undefined
    });
  }

  return eventProfit;
}
 const eventService = {
  getAllEvent,
  getEventById,
  profitOfEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventVendorList,
};
export default eventService;
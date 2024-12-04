export const LoginType = { HOST: 'host', VENDOR: 'manager', STAFF: 'staff', ADMIN: 'admin' }

export const DEFAULT_SESSION_DURATION = 30  // 30 
export const RoleType = { ADMIN: 'admin', HOST: 'host', MANAGER: 'manager', STAFF: 'staff' }
export const EventStatus = {
  ongoing: 'upcomming',
  running: 'running',
  past: 'finished',
  cancelled: 'cancelled',
}

export const EventRegisterStatus = {
  REGISTERED: 0,
  CONFIRMED: 1,
  DECLINED: 2,
}
export const TrasactionStatus = { 
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
}
export const LocationStatus = {
  Avialable: 'Available',
  OnHold: 'Onhold',
  Booked: 'Booked', 
}
export const EventPaymentStatus = {
PENDINGDEPOSIT: 'Pending Deposit', 
SUCESSDEPOSIT: 'Success Deposit', 
PENDINGTOTAL: 'Pending Total',
FINISH: 'Refunding Deposit',
FINISHED: 'Finished',
}
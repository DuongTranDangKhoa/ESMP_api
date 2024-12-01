import { staffRepository } from "./staff.repo";
import { HostDbClient } from "../../database/dbClient.db";
import { VendorAccountType, RegisterVendorObject } from "./staff.schema";

const authenticateStaffUser = async (
  username: string,
  password: string,
  hostDb: HostDbClient
) => {
  const { user, staff } = await staffRepository.authenticateStaffUser(
    username,
    password,
    hostDb
  );

  return new VendorAccountType(user, staff);
};

const createStaff = async (
  vendorId: string,
  body: RegisterVendorObject,
  hostDb: HostDbClient
) => {
  const response = await staffRepository.createStaff(vendorId, body, hostDb);
  return response;
};

const getStaffByVendorId = async (vendorId: string, hostDb: HostDbClient) => {
  const staffList = await staffRepository.getStaffByVendorId(vendorId, hostDb);
  return staffList;
};

const updateStaff = async (
  staffId: string,
  body: any,
  hostDb: HostDbClient
) => {
  const response = await staffRepository.updateStaff(staffId, body, hostDb);
  return response;
};

const staffService = {
  authenticateStaffUser,
  createStaff,
  updateStaff,
  getStaffByVendorId,
};

export default staffService;

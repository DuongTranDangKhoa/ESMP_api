import { vendorRepository } from "./vendor.repo";
import { VendorObject, RegisterVendorObject } from "./vendor.schema";
import { HostDbClient } from "../../database/dbClient.db";
import { VendorAccountType } from "./vendor.schema";

// Vendor Service to handle business logic and interact with repository
const vendorService = {
  // Authenticate vendor user
  authenticateVendorUser: async (username: string, password: string, hostDb: HostDbClient): Promise<VendorAccountType> => {
    const { user, vendor } = await vendorRepository.authenticateVendorUser(username, password, hostDb);
    return new VendorAccountType(user, vendor);
  },

  // Get list of all vendors
  getVendorList: async (hostDb: HostDbClient) => {
    const vendors = await vendorRepository.getVendorList(hostDb);
    return vendors.map((vendor) => new VendorObject(vendor));
  },

  // Get a specific vendor by ID
  getVendorById: async (vendorId: string, hostDb: HostDbClient) => {
    const vendorData = await vendorRepository.getVendorById(vendorId, hostDb);
    return vendorData; // Transform to VendorObject if needed
  },
   getVendorByIdHost: async (hostId: string, hostDb: HostDbClient) => {
    const vendorData = await vendorRepository.getVendorByHostId(hostId, hostDb);
    return vendorData;
  },
  // Create a new vendor
  createVendor: async (hostId: string, vendor: RegisterVendorObject, hostDb: HostDbClient) => {
    const vendorData = await vendorRepository.createVendor(hostId, vendor, hostDb);
    return { message: 'Vendor created successfully', vendorId: vendorData.vendorId };
  },

  // Update vendor information
  updateVendor: async (vendorId: string, vendor: VendorObject, hostDb: HostDbClient) => {
    await vendorRepository.updateVendor(vendorId, vendor, hostDb);
    return { message: 'Vendor updated successfully' };
  },

  // Delete a vendor
  deleteVendor: async (vendorId: string, hostDb: HostDbClient) => {
    await vendorRepository.deleteVendor(vendorId, hostDb);
    return { message: 'Vendor deleted successfully' };
  },
};

export default vendorService;

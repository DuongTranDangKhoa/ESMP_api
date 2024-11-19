import { t } from 'elysia';
import { HostDbClient } from '../../database/host.db';
import staffService from './staff.service';
import { GetStaffParams, RegisterStaff, UpdateStaffSchema } from './staff.schema';

export const staffGroup = (app: any) =>
  app
    // Group với vendorId
    .group('/:vendorId', (app: any) =>
      app
        .guard({
          params: GetStaffParams
        })
        .get('/', async ({ params, hostDb }: { params: any; hostDb: HostDbClient }) => {
          const { vendorId } = params;
          const staffList = await staffService.getStaffByVendorId(vendorId, hostDb);
          return staffList;
        })

        .post(
          '/',
          async ({ params, body, hostDb }: { params: any; body: any; hostDb: HostDbClient }) => {
            const { vendorId } = params;
            const response = await staffService.createStaff(vendorId, body, hostDb);
            return response;
          },
          {
            body: RegisterStaff, 
          }
        )
    )
    .group('/:staffid', (app: any) =>
      app
        .guard({
          params: t.Object({
            staffid: t.String({ format: 'uuid', error: 'Invalid Staff ID' }),
          }),
        })
        .put(
          '/',
          async ({ params, body, hostDb }: { params: any; body: any; hostDb: HostDbClient }) => {
            const { staffid } = params;
            const response = await staffService.updateStaff(staffid, body, hostDb);
            return response;
          },
          {
            body: UpdateStaffSchema, // Sử dụng schema cho việc cập nhật nhân viên
          }
        )
    );

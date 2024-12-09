
import { HostDbClient } from "../../database/dbClient.db";
import { ThemeObject } from "./theme.schema";

export const getTheme = async (hostId: string, hostDb: HostDbClient) => {
  return await hostDb.theme.findMany({ where: { hostid: hostId } });
};

export const getThemeById = async (themeId: string, hostDb: HostDbClient) => {
  return await hostDb.theme.findFirst({ where: { themeId } });
};

export const createTheme = async (theme: ThemeObject, hostDb: HostDbClient) => {
     if (!theme.hostid) {
        throw new Error('Theme hostid is required')
    }
  return await hostDb.theme.create({
    data: {
      name: theme.name,
      status: theme.status,
      hostid: theme.hostid,
    },
  });
};

export const updateTheme = async (themeId: string, newTheme: ThemeObject, hostDb: HostDbClient) => {
  return await hostDb.theme.update({
    where: { themeId },
    data: {
      name: newTheme.name,
      status: newTheme.status,
    },
  });
};

export const deleteTheme = async (themeId: string, hostDb: HostDbClient) => {
  return await hostDb.theme.delete({ where: { themeId } });
};

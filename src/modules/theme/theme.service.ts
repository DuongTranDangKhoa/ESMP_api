
import { HostDbClient } from "../../database/dbClient.db";
import { ThemeObject } from "./theme.schema";
import * as themeRepo from "./theme.repo";
import { DatabaseError } from "../../errors/database.error";

const getTheme = async (hostId: string, hostDb: HostDbClient) => {
  try {
    const themes = await themeRepo.getTheme(hostId, hostDb);
    return themes;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const getThemeById = async (themeId: string, hostDb: HostDbClient) => {
  try {
    const theme = await themeRepo.getThemeById(themeId, hostDb);
    if (!theme) {
      throw new Error("Theme not found");
    }
    return theme;
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const createTheme = async (theme: ThemeObject, hostDb: HostDbClient) => {
  try {
    if (!theme.hostid) {
      throw new Error("Theme hostid is required");
    }
    await themeRepo.createTheme(theme, hostDb);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const updateTheme = async (themeId: string, newTheme: ThemeObject, hostDb: HostDbClient) => {
  try {
    await themeRepo.updateTheme(themeId, newTheme, hostDb);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const deleteTheme = async (themeId: string, hostDb: HostDbClient) => {
  try {
    await themeRepo.deleteTheme(themeId, hostDb);
  } catch (err: any) {
    throw new DatabaseError(err.message);
  }
};

const themeService = {
  getTheme,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
};

export default themeService;

import { buildSelector } from "@/shared/lib/store";
import { JsonSettings } from "../types/jsonSettings";

const defaultSettings: JsonSettings = {};

export const [useJsonSettings, getJsonSettings] = buildSelector(
    (state) => state.user?.authData?.jsonSettings ?? defaultSettings
);

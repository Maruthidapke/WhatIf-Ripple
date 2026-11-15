import dotenv from 'dotenv';
dotenv.config();

export interface AppConfig {
  port: number;
  geminiApiKey: string;
  geminiModel: string;
}

let runtimeCustomApiKey = '';
let isKeyVerified = false;

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '5002', 10),
  geminiApiKey: (process.env.GEMINI_API_KEY || '').trim(),
  geminiModel: (process.env.GEMINI_MODEL || 'gemini-3.8-flash').trim(),
};

export const getEffectiveApiKey = (overrideKey?: string): string => {
  if (overrideKey && overrideKey.trim().length > 5) {
    return overrideKey.trim();
  }
  if (runtimeCustomApiKey && runtimeCustomApiKey.trim().length > 5) {
    return runtimeCustomApiKey.trim();
  }
  return config.geminiApiKey;
};

export const setRuntimeApiKey = (key: string, verified = true) => {
  runtimeCustomApiKey = key.trim();
  isKeyVerified = verified;
};

export const markKeyVerified = (verified: boolean) => {
  isKeyVerified = verified;
};

export const hasValidApiKey = (overrideKey?: string): boolean => {
  const key = getEffectiveApiKey(overrideKey);
  const hasKey = key.length > 5 && !key.includes('your_api_key_here');
  // Only declare live mode if the key is present AND has been verified against the API
  return hasKey && isKeyVerified;
};

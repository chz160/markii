/** Base URL for the TaagBack API. Override via environment or app config. */
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:5000';

export interface Hunt {
  id: string;
  name: string;
  description?: string;
  createdByUserId: string;
  createdAt: string;
  updatedAt?: string;
  isActive: boolean;
  stops: HuntStop[];
}

export interface HuntStop {
  id: string;
  huntId: string;
  order: number;
  title: string;
  clue?: string;
  hint?: string;
  qrCodeToken: string;
  createdAt: string;
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(init?.headers ?? {}) },
    ...init,
  });
  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// Hunts
export const huntsApi = {
  getAll: () => request<Hunt[]>('/api/hunts'),
  getById: (id: string) => request<Hunt>(`/api/hunts/${id}`),
  create: (hunt: Partial<Hunt>) =>
    request<Hunt>('/api/hunts', { method: 'POST', body: JSON.stringify(hunt) }),
  update: (id: string, hunt: Partial<Hunt>) =>
    request<Hunt>(`/api/hunts/${id}`, { method: 'PUT', body: JSON.stringify(hunt) }),
  delete: (id: string) =>
    request<void>(`/api/hunts/${id}`, { method: 'DELETE' }),
};

// Hunt Stops
export const stopsApi = {
  getAll: (huntId: string) => request<HuntStop[]>(`/api/hunts/${huntId}/stops`),
  create: (huntId: string, stop: Partial<HuntStop>) =>
    request<HuntStop>(`/api/hunts/${huntId}/stops`, {
      method: 'POST',
      body: JSON.stringify(stop),
    }),
  update: (huntId: string, id: string, stop: Partial<HuntStop>) =>
    request<HuntStop>(`/api/hunts/${huntId}/stops/${id}`, {
      method: 'PUT',
      body: JSON.stringify(stop),
    }),
  delete: (huntId: string, id: string) =>
    request<void>(`/api/hunts/${huntId}/stops/${id}`, { method: 'DELETE' }),
};

// QR scanning
export const scanApi = {
  scan: (token: string) => request<HuntStop>(`/api/scan/${token}`),
};

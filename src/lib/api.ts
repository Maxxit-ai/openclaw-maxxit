import {
  MOCK_AGENTS,
  MOCK_LISTINGS,
  MOCK_ALPHA_CONTENT,
  type AlphaAgent,
  type AlphaListing,
  type AlphaContent,
} from "./mockData";

const API_BASE = process.env.NEXT_PUBLIC_ALPHA_API_URL || "";

function useMock(): boolean {
  return !API_BASE;
}

export async function fetchAgents(filters?: {
  minWinRate?: number;
  minTrades?: number;
  limit?: number;
}): Promise<AlphaAgent[]> {
  if (useMock()) {
    let agents = [...MOCK_AGENTS];
    if (filters?.minWinRate) {
      agents = agents.filter((a) => a.winRate >= filters.minWinRate!);
    }
    if (filters?.minTrades) {
      agents = agents.filter((a) => a.tradeCount >= filters.minTrades!);
    }
    if (filters?.limit) {
      agents = agents.slice(0, filters.limit);
    }
    return agents;
  }

  const params = new URLSearchParams();
  if (filters?.minWinRate) params.set("minWinRate", String(filters.minWinRate));
  if (filters?.minTrades) params.set("minTrades", String(filters.minTrades));
  if (filters?.limit) params.set("limit", String(filters.limit));

  const res = await fetch(`${API_BASE}/alpha/agents?${params}`);
  const data = await res.json();
  return data.agents;
}

export async function fetchListings(filters?: {
  commitment?: string;
  maxPrice?: number;
  limit?: number;
}): Promise<AlphaListing[]> {
  if (useMock()) {
    let listings = [...MOCK_LISTINGS];
    if (filters?.commitment) {
      listings = listings.filter((l) => l.commitment === filters.commitment);
    }
    if (filters?.maxPrice) {
      listings = listings.filter(
        (l) => parseFloat(l.priceUsdc) <= filters.maxPrice!
      );
    }
    if (filters?.limit) {
      listings = listings.slice(0, filters.limit);
    }
    return listings;
  }

  const params = new URLSearchParams();
  if (filters?.commitment) params.set("commitment", filters.commitment);
  if (filters?.maxPrice) params.set("maxPrice", String(filters.maxPrice));
  if (filters?.limit) params.set("limit", String(filters.limit));

  const res = await fetch(`${API_BASE}/alpha/listings?${params}`);
  const data = await res.json();
  return data.listings;
}

export async function purchaseAlpha(
  listingId: string
): Promise<{ success: boolean; alpha?: AlphaContent; paymentRequired?: boolean }> {
  if (useMock()) {
    return { success: true, alpha: MOCK_ALPHA_CONTENT };
  }

  const res = await fetch(`${API_BASE}/alpha/purchase/${listingId}`, {
    headers: { "X-Payment-Verified": "true" },
  });
  const data = await res.json();

  if (res.status === 402) {
    return { success: false, paymentRequired: true };
  }
  return { success: true, alpha: data.alpha };
}

export async function verifyAlpha(
  listingId: string,
  content: AlphaContent
): Promise<{ verified: boolean }> {
  if (useMock()) {
    return { verified: true };
  }

  const res = await fetch(`${API_BASE}/alpha/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ listingId, content }),
  });
  const data = await res.json();
  return { verified: data.verified };
}

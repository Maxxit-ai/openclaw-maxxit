export interface AlphaAgent {
  commitment: string;
  totalPnl: string;
  tradeCount: number;
  winCount: number;
  winRate: number;
  totalCollateral: string;
  proofTimestamp: string;
  verifiedAt: string;
  defaultAlphaPrice: string;
  activeAlphaCount: number;
}

export interface AlphaListing {
  listingId: string;
  onChainListingId: string | null;
  commitment: string;
  priceUsdc: string;
  token: string;
  side: string;
  leverage: number;
  positionPct: number;
  createdAt: string;
  agentMetrics: {
    totalPnl: string;
    tradeCount: number;
    winRate: number;
    totalCollateral: string;
    proofTimestamp: string;
  };
}

export interface AlphaContent {
  token: string;
  side: string;
  leverage: number;
  positionPct: number;
  entryPrice: number;
  collateralUsdc: number;
  venue: string;
  timestamp: string;
}

export const MOCK_AGENTS: AlphaAgent[] = [
  {
    commitment: "a7f3e2d1c4b5a6f3e2d1c4b5a6f3e2d1c4b5a6f3e2d1c4b5a6f3e2d1c4b5a6f3",
    totalPnl: "127450.00",
    tradeCount: 312,
    winCount: 243,
    winRate: 77.9,
    totalCollateral: "850000.00",
    proofTimestamp: "2026-02-20T14:30:00.000Z",
    verifiedAt: "2026-02-20T14:35:00.000Z",
    defaultAlphaPrice: "0.50",
    activeAlphaCount: 4,
  },
  {
    commitment: "b8c4d3e2f1a6b7c4d3e2f1a6b7c4d3e2f1a6b7c4d3e2f1a6b7c4d3e2f1a6b7c4",
    totalPnl: "85200.00",
    tradeCount: 198,
    winCount: 138,
    winRate: 69.7,
    totalCollateral: "420000.00",
    proofTimestamp: "2026-02-20T12:15:00.000Z",
    verifiedAt: "2026-02-20T12:20:00.000Z",
    defaultAlphaPrice: "0.35",
    activeAlphaCount: 2,
  },
  {
    commitment: "c9d5e4f3a2b7c8d5e4f3a2b7c8d5e4f3a2b7c8d5e4f3a2b7c8d5e4f3a2b7c8d5",
    totalPnl: "203800.00",
    tradeCount: 445,
    winCount: 365,
    winRate: 82.0,
    totalCollateral: "1200000.00",
    proofTimestamp: "2026-02-21T08:00:00.000Z",
    verifiedAt: "2026-02-21T08:05:00.000Z",
    defaultAlphaPrice: "1.00",
    activeAlphaCount: 6,
  },
  {
    commitment: "d0e6f5a4b3c8d9e6f5a4b3c8d9e6f5a4b3c8d9e6f5a4b3c8d9e6f5a4b3c8d9e6",
    totalPnl: "42100.00",
    tradeCount: 87,
    winCount: 59,
    winRate: 67.8,
    totalCollateral: "180000.00",
    proofTimestamp: "2026-02-19T22:10:00.000Z",
    verifiedAt: "2026-02-19T22:15:00.000Z",
    defaultAlphaPrice: "0.25",
    activeAlphaCount: 1,
  },
  {
    commitment: "e1f7a6b5c4d9e0f7a6b5c4d9e0f7a6b5c4d9e0f7a6b5c4d9e0f7a6b5c4d9e0f7",
    totalPnl: "156300.00",
    tradeCount: 256,
    winCount: 194,
    winRate: 75.8,
    totalCollateral: "720000.00",
    proofTimestamp: "2026-02-21T06:45:00.000Z",
    verifiedAt: "2026-02-21T06:50:00.000Z",
    defaultAlphaPrice: "0.75",
    activeAlphaCount: 3,
  },
];

export const MOCK_LISTINGS: AlphaListing[] = [
  {
    listingId: "lst-001-uuid",
    onChainListingId: null,
    commitment: MOCK_AGENTS[0].commitment,
    priceUsdc: "0.50",
    token: "BTC/USD",
    side: "LONG",
    leverage: 15,
    positionPct: 2500,
    createdAt: "2026-02-21T09:30:00.000Z",
    agentMetrics: {
      totalPnl: MOCK_AGENTS[0].totalPnl,
      tradeCount: MOCK_AGENTS[0].tradeCount,
      winRate: MOCK_AGENTS[0].winRate,
      totalCollateral: MOCK_AGENTS[0].totalCollateral,
      proofTimestamp: MOCK_AGENTS[0].proofTimestamp,
    },
  },
  {
    listingId: "lst-002-uuid",
    onChainListingId: null,
    commitment: MOCK_AGENTS[2].commitment,
    priceUsdc: "1.00",
    token: "XAU/USD",
    side: "LONG",
    leverage: 5,
    positionPct: 3200,
    createdAt: "2026-02-21T08:15:00.000Z",
    agentMetrics: {
      totalPnl: MOCK_AGENTS[2].totalPnl,
      tradeCount: MOCK_AGENTS[2].tradeCount,
      winRate: MOCK_AGENTS[2].winRate,
      totalCollateral: MOCK_AGENTS[2].totalCollateral,
      proofTimestamp: MOCK_AGENTS[2].proofTimestamp,
    },
  },
  {
    listingId: "lst-003-uuid",
    onChainListingId: null,
    commitment: MOCK_AGENTS[0].commitment,
    priceUsdc: "0.50",
    token: "ETH/USD",
    side: "SHORT",
    leverage: 10,
    positionPct: 1800,
    createdAt: "2026-02-21T07:00:00.000Z",
    agentMetrics: {
      totalPnl: MOCK_AGENTS[0].totalPnl,
      tradeCount: MOCK_AGENTS[0].tradeCount,
      winRate: MOCK_AGENTS[0].winRate,
      totalCollateral: MOCK_AGENTS[0].totalCollateral,
      proofTimestamp: MOCK_AGENTS[0].proofTimestamp,
    },
  },
  {
    listingId: "lst-004-uuid",
    onChainListingId: null,
    commitment: MOCK_AGENTS[4].commitment,
    priceUsdc: "0.75",
    token: "EUR/USD",
    side: "SHORT",
    leverage: 20,
    positionPct: 3500,
    createdAt: "2026-02-21T06:50:00.000Z",
    agentMetrics: {
      totalPnl: MOCK_AGENTS[4].totalPnl,
      tradeCount: MOCK_AGENTS[4].tradeCount,
      winRate: MOCK_AGENTS[4].winRate,
      totalCollateral: MOCK_AGENTS[4].totalCollateral,
      proofTimestamp: MOCK_AGENTS[4].proofTimestamp,
    },
  },
  {
    listingId: "lst-005-uuid",
    onChainListingId: null,
    commitment: MOCK_AGENTS[1].commitment,
    priceUsdc: "0.35",
    token: "GBP/USD",
    side: "LONG",
    leverage: 8,
    positionPct: 1200,
    createdAt: "2026-02-21T05:20:00.000Z",
    agentMetrics: {
      totalPnl: MOCK_AGENTS[1].totalPnl,
      tradeCount: MOCK_AGENTS[1].tradeCount,
      winRate: MOCK_AGENTS[1].winRate,
      totalCollateral: MOCK_AGENTS[1].totalCollateral,
      proofTimestamp: MOCK_AGENTS[1].proofTimestamp,
    },
  },
  {
    listingId: "lst-006-uuid",
    onChainListingId: null,
    commitment: MOCK_AGENTS[3].commitment,
    priceUsdc: "0.25",
    token: "BTC/USD",
    side: "LONG",
    leverage: 3,
    positionPct: 500,
    createdAt: "2026-02-21T04:00:00.000Z",
    agentMetrics: {
      totalPnl: MOCK_AGENTS[3].totalPnl,
      tradeCount: MOCK_AGENTS[3].tradeCount,
      winRate: MOCK_AGENTS[3].winRate,
      totalCollateral: MOCK_AGENTS[3].totalCollateral,
      proofTimestamp: MOCK_AGENTS[3].proofTimestamp,
    },
  },
];

export const MOCK_ALPHA_CONTENT: AlphaContent = {
  token: "BTC",
  side: "LONG",
  leverage: 15,
  positionPct: 2500,
  entryPrice: 97250.0,
  collateralUsdc: 250.0,
  venue: "OSTIUM",
  timestamp: "2026-02-21T09:30:00.000Z",
};

export type SymbolTier = "H" | "M" | "L";

export type SymbolDefinition = {
  id: string;
  payout: number;
  tier: SymbolTier;
};

export const DEFAULT_SYMBOL_DEFINITIONS: SymbolDefinition[] = [
  { id: "H1", payout: 10, tier: "H" },
  { id: "H2", payout: 10, tier: "H" },
  { id: "H3", payout: 10, tier: "H" },
  { id: "M1", payout: 5, tier: "M" },
  { id: "M2", payout: 5, tier: "M" },
  { id: "M3", payout: 5, tier: "M" },
  { id: "L1", payout: 3, tier: "L" },
  { id: "L2", payout: 3, tier: "L" },
  { id: "L3", payout: 3, tier: "L" }
];

const tierOrder: SymbolTier[] = ["H", "M", "L"];
let activeSymbolDefinitions: SymbolDefinition[] = [
  ...DEFAULT_SYMBOL_DEFINITIONS
];

const buildTierRows = (definitions: SymbolDefinition[]): string[][] => {
  const byTier: Record<SymbolTier, string[]> = { H: [], M: [], L: [] };

  definitions.forEach((entry) => {
    byTier[entry.tier].push(entry.id);
  });

  return tierOrder
    .map((tier) => {
      const symbols = byTier[tier];
      if (!symbols.length) {
        return null;
      }
      return [symbols[0], symbols[1] ?? symbols[0], symbols[2] ?? symbols[0], symbols[0]];
    })
    .filter((row): row is string[] => Array.isArray(row));
};

export const getDefaultReelDisplay = (): string[][] => {
  const rows = buildTierRows(activeSymbolDefinitions);

  if (!rows.length) {
    const defaults = buildTierRows(DEFAULT_SYMBOL_DEFINITIONS);
    return [...defaults, defaults[0]].map((row) => [...row]);
  }

  const fallbackRow = rows[0] ?? ["H1", "H2", "H3", "H1"];
  return [...rows, fallbackRow].slice(0, 4).map((row) => [...row]);
};

export const setActiveSymbolDefinitions = (definitions: SymbolDefinition[]): void => {
  if (!definitions.length) {
    activeSymbolDefinitions = [...DEFAULT_SYMBOL_DEFINITIONS];
    return;
  }

  activeSymbolDefinitions = definitions.map((entry) => ({ ...entry }));
};

export const getActiveSymbolDefinitions = (): SymbolDefinition[] =>
  activeSymbolDefinitions.map((entry) => ({ ...entry }));

export const getActiveSymbolIds = (): string[] =>
  activeSymbolDefinitions.map((entry) => entry.id);

export const getActiveWinMultipliers = (): Record<string, number> =>
  activeSymbolDefinitions.reduce<Record<string, number>>((acc, entry) => {
    acc[entry.id] = entry.payout;
    return acc;
  }, {});

export class ReelModel {
  reelDisplay: string[][] = getDefaultReelDisplay();
}

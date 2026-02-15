export type AssetMap = Record<string, string>;

export type ThemeManifest = {
  version?: string | number;
  configPath: string;
  assets: AssetMap;
};

export type SymbolTierKey = "H" | "M" | "L";

export type SymbolDefinitionInput = {
  id: string;
  payout?: number;
  tier?: SymbolTierKey;
};

export type SymbolTiersInput = Partial<
  Record<SymbolTierKey, Array<string | SymbolDefinitionInput>>
>;

export type PaylineCellInput = "X" | "0" | 1 | 0;

export type RuntimeThemeConfig = {
  gameWidth?: number;
  gameHeight?: number;
  reelScale?: number;
  reelSpinSpeed?: number;
  defaultBet?: number;
  betChangeAmount?: number;
  bankBalance?: number;
  useForcedResult?: boolean;
  useForcedResultIndex?: number;
  probabilityFRChosen?: number;
  symbols?: SymbolTiersInput | SymbolDefinitionInput[];
  symbolDefinitions?: SymbolTiersInput | SymbolDefinitionInput[];
  payouts?: Record<string, number>;
  paylines?:
    | Record<string, PaylineCellInput[][]>
    | Array<PaylineCellInput[][]>;
};

export type LoadedRuntimeTheme = {
  manifest: ThemeManifest;
  config: RuntimeThemeConfig | null;
};

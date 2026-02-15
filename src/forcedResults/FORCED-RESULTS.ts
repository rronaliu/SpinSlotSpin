import { deepFreeze } from "../utils/ReelHelper";

export type ForcedResult = {
    label: string;
    result: string[][];
    isWin: boolean;
    winLines: number;
};

export const FORCED_RESULTS: { [key: number]: ForcedResult } = deepFreeze({
    1: {
        label: "all-L1",
        result: [
            ["L1", "L1", "L1", "L1"],
            ["L1", "L1", "L1", "L1"],
            ["L1", "L1", "L1", "L1"],
            ["L1", "L1", "L1", "L1"],
        ],
        isWin: true,
        winLines: 10
    },
    2: {
        label: "all-M1",
        result: [
            ["M1", "M1", "M1", "M1"],
            ["M1", "M1", "M1", "M1"],
            ["M1", "M1", "M1", "M1"],
            ["M1", "M1", "M1", "M1"],
        ],
        isWin: true,
        winLines: 10
    },
    3: {
        label: "all-H1",
        result: [
            ["H1", "H1", "H1", "H1"],
            ["H1", "H1", "H1", "H1"],
            ["H1", "H1", "H1", "H1"],
            ["H1", "H1", "H1", "H1"],
        ],
        isWin: true,
        winLines: 10
    },
    4: {
        label: "all-L2",
        result: [
            ["L2", "L2", "L2", "L2"],
            ["L2", "L2", "L2", "L2"],
            ["L2", "L2", "L2", "L2"],
            ["L2", "L2", "L2", "L2"],
        ],
        isWin: true,
        winLines: 10
    },
    5: {
        label: "all-M2",
        result: [
            ["M2", "M2", "M2", "M2"],
            ["M2", "M2", "M2", "M2"],
            ["M2", "M2", "M2", "M2"],
            ["M2", "M2", "M2", "M2"],
        ],
        isWin: true,
        winLines: 10
    },
    6: {
        label: "all-H2",
        result: [
            ["H2", "H2", "H2", "H2"],
            ["H2", "H2", "H2", "H2"],
            ["H2", "H2", "H2", "H2"],
            ["H2", "H2", "H2", "H2"],
        ],
        isWin: true,
        winLines: 10
    },
    7: {
        label: "diagonal-L1",
        result: [
            ["L1", "H2", "H2", "H3"],
            ["H2", "L1", "H2", "H2"],
            ["H2", "H2", "L1", "H2"],
            ["H3", "H2", "H2", "L1"],
        ],
        isWin: true,
        winLines: 10
    },
    8: {
        label: "two-horizontal-wins",
        result: [
            ["H1", "H1", "H1", "H1"],
            ["L2", "L2", "L2", "L2"],
            ["M1", "M1", "M1", "M1"],
            ["H3", "L1", "M2", "L3"],
        ],
        isWin: true,
        winLines: 2
    },
    9: {
        label: "mixed-symbols-no-win",
        result: [
            ["L1", "M2", "H3", "L2"],
            ["H1", "L3", "M1", "H2"],
            ["M3", "H1", "L2", "M1"],
            ["L3", "M2", "H1", "L1"],
        ],
        isWin: false,
        winLines: 0
    },
    10: {
        label: "single-row-win",
        result: [
            ["H1", "H1", "H1", "H1"],
            ["L2", "M1", "H3", "L1"],
            ["M2", "L3", "H2", "M1"],
            ["L1", "H3", "M2", "L2"],
        ],
        isWin: true,
        winLines: 1
    },
    11: {
        label: "three-different-wins",
        result: [
            ["M1", "M1", "M1", "M1"],
            ["H2", "H2", "H2", "H2"],
            ["L1", "L1", "L1", "L1"],
            ["M3", "L2", "H1", "L3"],
        ],
        isWin: true,
        winLines: 3
    },
    12: {
        label: "diagonal-H2",
        result: [
            ["H2", "L1", "M3", "L2"],
            ["M1", "H2", "L3", "M2"],
            ["L2", "M1", "H2", "L1"],
            ["H3", "L2", "M1", "H2"],
        ],
        isWin: true,
        winLines: 1
    },
    13: {
        label: "scattered-wins",
        result: [
            ["L1", "L1", "L1", "L1"],
            ["M2", "H3", "L2", "M1"],
            ["H1", "M3", "L3", "H2"],
            ["L2", "L2", "L2", "L2"],
        ],
        isWin: true,
        winLines: 2
    },
    14: {
        label: "high-value-mix",
        result: [
            ["H1", "H2", "H3", "H1"],
            ["H2", "H3", "H1", "H2"],
            ["H3", "H1", "H2", "H3"],
            ["H1", "H2", "H3", "H1"],
        ],
        isWin: false,
        winLines: 0
    },
    15: {
        label: "low-value-mix",
        result: [
            ["L1", "L2", "L3", "L1"],
            ["L2", "L3", "L1", "L2"],
            ["L3", "L1", "L2", "L3"],
            ["L1", "L2", "L3", "L1"],
        ],
        isWin: false,
        winLines: 0
    },
    16: {
        label: "mid-value-mix",
        result: [
            ["M1", "M2", "M3", "M1"],
            ["M2", "M3", "M1", "M2"],
            ["M3", "M1", "M2", "M3"],
            ["M1", "M2", "M3", "M1"],
        ],
        isWin: false,
        winLines: 0
    },
    17: {
        label: "four-different-wins",
        result: [
            ["H1", "H1", "H1", "H1"],
            ["M1", "M1", "M1", "M1"],
            ["L1", "L1", "L1", "L1"],
            ["H2", "H2", "H2", "H2"],
        ],
        isWin: true,
        winLines: 4
    },
    18: {
        label: "cross-pattern",
        result: [
            ["H1", "L2", "L2", "H1"],
            ["L2", "H1", "H1", "L2"],
            ["L2", "H1", "H1", "L2"],
            ["H1", "L2", "L2", "H1"],
        ],
        isWin: false,
        winLines: 0
    },
    19: {
        label: "single-column-win",
        result: [
            ["H1", "L2", "M3", "L1"],
            ["H1", "M1", "H2", "L3"],
            ["H1", "L2", "M1", "H3"],
            ["H1", "M2", "L1", "M3"],
        ],
        isWin: true,
        winLines: 1
    },
    20: {
        label: "random-no-win",
        result: [
            ["L1", "M2", "H3", "L2"],
            ["H1", "L3", "M1", "H2"],
            ["M3", "H1", "L2", "M1"],
            ["L3", "M2", "H1", "L1"],
        ],
        isWin: false,
        winLines: 0
    },
    21: {
        label: "all-L3",
        result: [
            ["L3", "L3", "L3", "L3"],
            ["L3", "L3", "L3", "L3"],
            ["L3", "L3", "L3", "L3"],
            ["L3", "L3", "L3", "L3"],
        ],
        isWin: true,
        winLines: 10
    },
    22: {
        label: "all-M3",
        result: [
            ["M3", "M3", "M3", "M3"],
            ["M3", "M3", "M3", "M3"],
            ["M3", "M3", "M3", "M3"],
            ["M3", "M3", "M3", "M3"],
        ],
        isWin: true,
        winLines: 10
    },
    23: {
        label: "all-H3",
        result: [
            ["H3", "H3", "H3", "H3"],
            ["H3", "H3", "H3", "H3"],
            ["H3", "H3", "H3", "H3"],
            ["H3", "H3", "H3", "H3"],
        ],
        isWin: true,
        winLines: 10
    },
    24: {
        label: "L3-scattered-wins",
        result: [
            ["L3", "L3", "L3", "L3"],
            ["H1", "M2", "L1", "H2"],
            ["M1", "H3", "L2", "M3"],
            ["L3", "L3", "L3", "L3"],
        ],
        isWin: true,
        winLines: 2
    },
    25: {
        label: "M3-diagonal",
        result: [
            ["M3", "L1", "H2", "L2"],
            ["H1", "M3", "L3", "M1"],
            ["L2", "M1", "M3", "H3"],
            ["H2", "L1", "M2", "M3"],
        ],
        isWin: true,
        winLines: 1
    },
    26: {
        label: "H3-column-win",
        result: [
            ["H3", "L2", "M1", "L3"],
            ["H3", "M2", "H1", "L1"],
            ["H3", "L1", "M3", "H2"],
            ["H3", "M1", "L2", "M2"],
        ],
        isWin: true,
        winLines: 1
    },
    27: {
        label: "mixed-L3-M3",
        result: [
            ["L3", "M3", "L3", "M3"],
            ["M3", "L3", "M3", "L3"],
            ["L3", "M3", "L3", "M3"],
            ["M3", "L3", "M3", "L3"],
        ],
        isWin: false,
        winLines: 0
    },
    28: {
        label: "H3-H1-mix",
        result: [
            ["H3", "H1", "H3", "H1"],
            ["H1", "H3", "H1", "H3"],
            ["H3", "H1", "H3", "H1"],
            ["H1", "H3", "H1", "H3"],
        ],
        isWin: false,
        winLines: 0
    },
    29: {
        label: "L3-single-row",
        result: [
            ["L3", "L3", "L3", "L3"],
            ["H1", "M2", "L1", "H2"],
            ["M1", "H3", "L2", "M3"],
            ["L1", "M2", "H1", "L2"],
        ],
        isWin: true,
        winLines: 1
    },
    30: {
        label: "M3-three-rows",
        result: [
            ["M3", "M3", "M3", "M3"],
            ["H1", "L2", "M1", "H2"],
            ["M3", "M3", "M3", "M3"],
            ["L1", "H3", "L2", "M1"],
        ],
        isWin: true,
        winLines: 2
    },
    31: {
        label: "H3-four-corners",
        result: [
            ["H3", "L1", "M2", "H3"],
            ["M1", "H2", "L3", "M2"],
            ["L2", "M3", "H1", "L1"],
            ["H3", "L2", "M1", "H3"],
        ],
        isWin: false,
        winLines: 0
    },
    32: {
        label: "L3-M3-H3-mix",
        result: [
            ["L3", "M3", "H3", "L3"],
            ["M3", "H3", "L3", "M3"],
            ["H3", "L3", "M3", "H3"],
            ["L3", "M3", "H3", "L3"],
        ],
        isWin: false,
        winLines: 0
    },
    33: {
        label: "all-symbols-no-win",
        result: [
            ["L1", "L2", "L3", "M1"],
            ["M2", "M3", "H1", "H2"],
            ["H3", "L1", "M1", "L2"],
            ["M2", "H1", "L3", "M3"],
        ],
        isWin: false,
        winLines: 0
    },
    34: {
        label: "L3-M3-double-win",
        result: [
            ["L3", "L3", "L3", "L3"],
            ["M3", "M3", "M3", "M3"],
            ["H1", "L2", "M1", "H2"],
            ["L1", "H3", "M2", "L2"],
        ],
        isWin: true,
        winLines: 2
    },
    35: {
        label: "H3-triple-win",
        result: [
            ["H3", "H3", "H3", "H3"],
            ["L1", "M2", "H1", "L2"],
            ["H3", "H3", "H3", "H3"],
            ["M1", "L3", "M2", "H1"],
        ],
        isWin: true,
        winLines: 2
    },
    36: {
        label: "alternating-L3-M3",
        result: [
            ["L3", "M3", "L3", "M3"],
            ["H1", "L2", "M1", "H2"],
            ["L3", "M3", "L3", "M3"],
            ["M1", "H3", "L1", "M2"],
        ],
        isWin: true,
        winLines: 2
    },
    37: {
        label: "H3-center-pattern",
        result: [
            ["L1", "H3", "H3", "L2"],
            ["M2", "H3", "H3", "M1"],
            ["H1", "H3", "H3", "L3"],
            ["L2", "H3", "H3", "M2"],
        ],
        isWin: false,
        winLines: 0
    },
    38: {
        label: "L3-cross-pattern",
        result: [
            ["L3", "M1", "M1", "L3"],
            ["H2", "L3", "L3", "H1"],
            ["H2", "L3", "L3", "H1"],
            ["L3", "M1", "M1", "L3"],
        ],
        isWin: false,
        winLines: 0
    },
    39: {
        label: "M3-border-pattern",
        result: [
            ["M3", "M3", "M3", "M3"],
            ["M3", "L1", "H2", "M3"],
            ["M3", "H1", "L2", "M3"],
            ["M3", "M3", "M3", "M3"],
        ],
        isWin: true,
        winLines: 2
    },
    40: {
        label: "H3-spiral-pattern",
        result: [
            ["H3", "H3", "H3", "L1"],
            ["M2", "H3", "L2", "H3"],
            ["M1", "L3", "H3", "H3"],
            ["L2", "H3", "H3", "H3"],
        ],
        isWin: false,
        winLines: 0
    },
    41: {
        label: "HORIZONTAL H1, L3, M2",
        result: [
            ["H1", "H1", "H1", "H1"],
            ["L3", "L3", "L3", "L3"],
            ["M2", "M2", "M2", "M2"],
            ["M2", "H1", "M2", "L3"],
        ],
        isWin: true,
        winLines: 3
    }
});

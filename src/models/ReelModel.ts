export enum SYMBOLS {
    H1 = "H1", //IDOL
    H2 = "H2", // RUBY
    H3 = "H3", // RING
    M1 = "M1", // CHEST
    M2 = "M2", // HELMET
    M3 = "M3", // SHIELD
    L1 = "L1", // FIRE
    L2 = "L2", // POTION
    L3 = "L3" // SKULL
}

export enum winMultipliers {
    H1 = 10,
    H2 = 10,
    H3 = 10,
    M1 = 5,
    M2 = 5,
    M3 = 5,
    L1 = 3,
    L2 = 3,
    L3 = 3
}
export class ReelModel {

    reelDisplay: string[][] = [
        
        ["H1", "H2", "H3", "H1"],
        ["M1", "M2", "M3", "M1"],
        ["L1", "L2", "L3", "L1"],
        ["H1", "H2", "H3", "H1"]
     ];

}
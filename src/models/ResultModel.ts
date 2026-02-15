export class Resultmodel {
    isWin: boolean = false;
    
    spinResult: string[][] = [
       ["H1", "H2", "H3", "H1"],
       ["M1", "M2", "M3", "M1"],
       ["L1", "L2", "L3", "L1"],
       ["H1", "H2", "H3", "H1"]
    ];

    linesToAnimate: Array<{reelIndex: number, symbolIndex: number}> = [];

    // Define all 8 possible win lines
    winLines: { [key: string]: string[][] } = {
        "1": [
            ["X","X","X","X"],
            ["0","0","0","0"],
            ["0","0","0","0"],
            ["0","0","0","0"]], // Horizontal top row
        "2": [
            ["0","0","0","0"],
            ["X","X","X","X"],
            ["0","0","0","0"],
            ["0","0","0","0"]], // Horizontal second row
        "3": [
            ["0","0","0","0"],
            ["0","0","0","0"],
            ["X","X","X","X"],
            ["0","0","0","0"]], // Horizontal third row
        "4": [
            ["0","0","0","0"],
            ["0","0","0","0"],
            ["0","0","0","0"],
            ["X","X","X","X"]], // Horizontal bottom row
        "5": [
            ["X","0","0","0"],
            ["X","0","0","0"],
            ["X","0","0","0"],
            ["X","0","0","0"]], // Vertical left column
        "6": [
            ["0","X","0","0"],
            ["0","X","0","0"],
            ["0","X","0","0"],
            ["0","X","0","0"]], // Vertical second column
        "7": [
            ["0","0","X","0"],
            ["0","0","X","0"],
            ["0","0","X","0"],
            ["0","0","X","0"]], // Vertical third column
        "8": [
            ["0","0","0","X"],
            ["0","0","0","X"],
            ["0","0","0","X"],
            ["0","0","0","X"]], // Vertical right column
        "9": [
            ["X","0","0","0"],
            ["0","X","0","0"],
            ["0","0","X","0"],
            ["0","0","0","X"]], // Diagonal top-left to bottom-right
        "10": [
            ["0","0","0","X"],
            ["0","0","X","0"],
            ["0","X","0","0"],
            ["X","0","0","0"]]  // Diagonal top-right to bottom-left
    };
    
    // Store the last win amount
    lastWinAmount: number = 0;
}
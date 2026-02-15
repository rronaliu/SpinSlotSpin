import { Assets, Rectangle, Texture } from "pixi.js";
import { GAME, gameConfig, getReelColumnWidth } from "../GAME";
import { ZAnimatedSprite } from "../pixi/ZAnimatedSprite";
import { XContainer } from "../pixi/XContainer";
import { FORCED_RESULTS, ForcedResult } from "../forcedResults/FORCED-RESULTS";

// Deep freeze utility to make nested objects and arrays read-only
export function deepFreeze<T>(obj: T): T {
    if (obj === null || typeof obj !== 'object') return obj;

    Object.freeze(obj);

    if (Array.isArray(obj)) {
        obj.forEach(item => deepFreeze(item));
    } else {
        Object.values(obj).forEach(value => deepFreeze(value));
    }

    return obj;
}

export function getRandomForcedResult(): ForcedResult {

    const potentialForcedResult = Object.keys(FORCED_RESULTS).map(Number);
    let randomKey;
    if (gameConfig.useForcedResultIndex !== undefined) {

        randomKey = potentialForcedResult[gameConfig.useForcedResultIndex - 1];
    } else {

        randomKey = potentialForcedResult[Math.floor(Math.random() * potentialForcedResult.length)];
    };
    const randomForcedResult = FORCED_RESULTS[randomKey as keyof typeof FORCED_RESULTS];
    return randomForcedResult;
}

export function resetReelContainerPositions(): void {
    // reset the positions of the reel containers
    GAME.containers.reelAContainer.y = 0;
    GAME.containers.reelBContainer.y = 0;
    GAME.containers.reelCContainer.y = 0;
    GAME.containers.reelDContainer.y = 0;
}

export function emptyAllReels(): void {

    GAME.containers.reelAContainer.children.forEach(child => child.destroy());
    GAME.containers.reelBContainer.children.forEach(child => child.destroy());
    GAME.containers.reelCContainer.children.forEach(child => child.destroy());
    GAME.containers.reelDContainer.children.forEach(child => child.destroy());

    GAME.containers.reelAContainer.removeChildren();
    GAME.containers.reelBContainer.removeChildren();
    GAME.containers.reelCContainer.removeChildren();
    GAME.containers.reelDContainer.removeChildren();
}

export function getSymbolFrames(symbol: string): any {
    const stripFrameMap: Record<string, { key: string; group: number }> = {
        H1: { key: "high_symbol_strip", group: 0 },
        H2: { key: "high_symbol_strip", group: 1 },
        H3: { key: "high_symbol_strip", group: 2 },
        M1: { key: "mid_symbol_strip", group: 0 },
        M2: { key: "mid_symbol_strip", group: 1 },
        M3: { key: "mid_symbol_strip", group: 2 },
        L1: { key: "low_symbol_strip", group: 0 },
        L2: { key: "low_symbol_strip", group: 1 },
        L3: { key: "low_symbol_strip", group: 2 }
    };

    const stripConfig = stripFrameMap[symbol];
    if (stripConfig) {
        const stripFrames = getStripSymbolFrames(stripConfig.key, stripConfig.group);
        if (stripFrames.length) {
            return stripFrames;
        }
    }

    // Legacy json spritesheet fallback.
    // If these assets are not bundled (e.g. Vite-hashed build on Pages), return empty frames.
    try {
        let frames = [];
        let sheet: any;
        switch (symbol) {
            case "H1":
                sheet = Assets.get("high_symbol_animations");
                frames = sheet?.animations?.IDOL || [];
                break;
            case "H2":
                sheet = Assets.get("high_symbol_animations");
                frames = sheet?.animations?.RUBY || [];
                break;
            case "H3":
                sheet = Assets.get("high_symbol_animations");
                frames = sheet?.animations?.RING || [];
                break;
            case "M1":
                sheet = Assets.get("mid_symbol_animations");
                frames = sheet?.animations?.CHEST || [];
                break;
            case "M2":
                sheet = Assets.get("mid_symbol_animations");
                frames = sheet?.animations?.HELMET || [];
                break;
            case "M3":
                sheet = Assets.get("mid_symbol_animations");
                frames = sheet?.animations?.SHIELD || [];
                break;
            case "L1":
                sheet = Assets.get("low_symbol_animations");
                frames = sheet?.animations?.FIRE || [];
                break;
            case "L2":
                sheet = Assets.get("low_symbol_animations");
                frames = sheet?.animations?.POTION || [];
                break;
            case "L3":
                sheet = Assets.get("low_symbol_animations");
                frames = sheet?.animations?.SKULL || [];
                break;
        }
        return frames;
    } catch {
        return [];
    }
}

const STRIP_FRAME_SIZE = 128;
const STRIP_FRAMES_PER_SYMBOL = 4;
const stripCache: Record<string, Texture[][]> = {};

function getStripSymbolFrames(stripKey: string, symbolGroupIndex: number): Texture[] {
    if (!stripCache[stripKey]) {
        const stripTexture = Assets.get(stripKey) as Texture | undefined;
        if (!stripTexture) return [];

        const totalFrames = Math.floor(stripTexture.height / STRIP_FRAME_SIZE);
        const totalSymbols = Math.floor(totalFrames / STRIP_FRAMES_PER_SYMBOL);
        const symbols: Texture[][] = [];

        for (let symbolIndex = 0; symbolIndex < totalSymbols; symbolIndex++) {
            const frames: Texture[] = [];
            for (let frameOffset = 0; frameOffset < STRIP_FRAMES_PER_SYMBOL; frameOffset++) {
                const y = (symbolIndex * STRIP_FRAMES_PER_SYMBOL + frameOffset) * STRIP_FRAME_SIZE;
                frames.push(
                    new Texture({
                        source: stripTexture.source,
                        frame: new Rectangle(0, y, STRIP_FRAME_SIZE, STRIP_FRAME_SIZE)
                    })
                );
            }
            symbols.push(frames);
        }

        stripCache[stripKey] = symbols;
    }

    return stripCache[stripKey][symbolGroupIndex] || [];
}

export function createSymbol(frames: any, yPosition?: number): ZAnimatedSprite | null {
    // makes a symbol
    if (!frames || frames.length === 0) {
        console.error("No frames provided for symbol");
        return null;
    }
    const { animation_default } = GAME.config.getConfig();
    animation_default.textures = frames;

    // If yPosition is provided, create a custom y formula that returns the fixed position
    if (yPosition !== undefined) {

        animation_default.y = () => yPosition;
    }

    const symbol = new ZAnimatedSprite(animation_default);
    symbol.gotoAndStop(0); // Show first frame but don't animate
    return symbol;
}

export function createAnimatedSymbol(frames: any, yPosition?: number): ZAnimatedSprite | null {
    // makes an animated symbol that can be animated after creation
    if (!frames || frames.length === 0) {
        console.error("No frames provided for animated symbol");
        return null;
    }
    const { animation_default } = GAME.config.getConfig();
    animation_default.textures = frames;

    // If yPosition is provided, create a custom y formula that returns the fixed position
    if (yPosition !== undefined) {
        animation_default.y = () => yPosition;
    }

    const symbol = new ZAnimatedSprite(animation_default);
    symbol.gotoAndStop(0); // Show first frame but don't animate initially
    return symbol;
}

export function setupReel(reelNumber: number, reelContainer: XContainer, models: any): void {
    
    const allReels = models.reel.reelDisplay.length;

    // remove previous symbols from reel
    reelContainer.children.forEach(child => {

        if (child instanceof ZAnimatedSprite) {
            // cleanup prevents listener errors trying to effect a destroyed object
            child.cleanup();
            child.destroy();
        }
    });

    reelContainer.removeChildren();

    for (var y = 0; y < allReels; y++) {
        const reelToBuild = models.reel.reelDisplay[y][reelNumber];
        const frames = getSymbolFrames(reelToBuild);
        const symbolHeight = getReelColumnWidth(); // Same as animation_default height
        const yPosition = symbolHeight * y;
        const symbol = createSymbol(frames, yPosition);

        if (symbol) {
            reelContainer.addChild(symbol);
        }
    }
}

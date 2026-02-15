import { AnimatedSprite, Texture } from "pixi.js";
import { CustomEvent } from "../events/CustomEvent";
import { GAME } from "../GAME";

export interface ZAnimatedSpriteInput {
    label: string;
    textures: Texture[];
    x: () => number;
    y: () => number;
    width: () => number;
    height: () => number;
    animationSpeed?: number;
    loop?: boolean;
    altEvent?: CustomEvent<void>;
}

export class ZAnimatedSprite extends AnimatedSprite {
    label: string;
    xFormula: () => number;
    yFormula: () => number;
    widthFormula: () => number;
    heightFormula: () => number;
    altEvent?: CustomEvent<void>;
    private boundRedraw: () => void;

    constructor(input: ZAnimatedSpriteInput) {
        super(input.textures);
        
        this.label = input.label;
        this.xFormula = input.x;
        this.yFormula = input.y;
        this.widthFormula = input.width;
        this.heightFormula = input.height;
        this.altEvent = input.altEvent;

        // Set initial properties
        this.position.x = this.xFormula();
        this.position.y = this.yFormula();
        this.width = this.widthFormula();
        this.height = this.heightFormula();
        
        // Set animation properties
        this.animationSpeed = input.animationSpeed || 0.1;
        this.loop = input.loop !== undefined ? input.loop : true;

        // Store bound function reference for proper cleanup
        this.boundRedraw = this.redraw.bind(this);
        
        // Subscribe to redraw events
        if (this.altEvent) {
            this.altEvent.add(this.boundRedraw);
        } else {
            GAME.events.redraw.add(this.boundRedraw);
        }
    }

    redraw(): void {
        this.position.x = this.xFormula();
        this.position.y = this.yFormula();
        this.width = this.widthFormula();
        this.height = this.heightFormula();
    }

    // Method to update textures/frames at runtime
    updateTextures(textures: Texture[]): void {
        this.textures = textures;
        this.gotoAndPlay(0); // Restart animation with new frames
    }

    // Method to cleanup event listeners before destroying
    cleanup(): void {
        GAME.events.redraw.remove(this.boundRedraw);
        if (this.altEvent) {
            this.altEvent.remove(this.boundRedraw);
        }
    }
} 
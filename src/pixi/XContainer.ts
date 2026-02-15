import { Container } from "pixi.js";
import { CustomEvent } from "../events/CustomEvent";
import { GAME } from "../GAME";

export interface XContainerInput {

    label: string;
    x: () => number;
    y: () => number;
    altEvent?: CustomEvent<void>;
}

export class XContainer extends Container {

    label: string;
    xFormula: () => number;
    yFormula: () => number;
    altEvent?: CustomEvent<void>;
    private boundRedraw: () => void;

    constructor(input: XContainerInput) {

        super();
        
        this.label = input.label;
        this.xFormula = input.x;
        this.yFormula = input.y;
        this.altEvent = input.altEvent;

        // Set initial position
        this.position.x = this.xFormula();
        this.position.y = this.yFormula();

        this.boundRedraw = this.redraw.bind(this);

        GAME.events.redraw.add(this.boundRedraw);
        if (this.altEvent) {
            this.altEvent.add(this.boundRedraw);
        }
    }

    redraw(): void {

        this.position.x = this.xFormula();
        this.position.y = this.yFormula();
    }

    destroy(options?: Parameters<Container["destroy"]>[0]) {
        GAME.events.redraw.remove(this.boundRedraw);
        if (this.altEvent) {
            this.altEvent.remove(this.boundRedraw);
        }
        super.destroy(options);
    }
}

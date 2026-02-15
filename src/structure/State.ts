import { GAME, gameConfig, GAME_MODELS } from "../GAME";
import { Block } from "./Block";
import { Models } from "../models/Models";

export abstract class State {
    blocks: Block[] = [];
    protected models: Models;
    private boundPlayThrough?: () => void;

    constructor() {
        this.models = GAME_MODELS;
    }

    enterState(): void {

        this._setupBlockLoopEvent();
        this.setupEvents();
        this.modelChanges();
        this.setupBlocks();
        this._playThroughBlocks(); //exit state called from playThroughBlocks
    }
    
    private _setupBlockLoopEvent(): void {

        this.boundPlayThrough = this._playThroughBlocks.bind(this);
        GAME.events.blockComplete.add(this.boundPlayThrough);
    }

    abstract setupEvents(): void;

    abstract modelChanges(): void;

    abstract setupBlocks(): void;

    private _playThroughBlocks(): void {

        if (this.blocks.length > 0) {
            const currentBlock = this.blocks.shift();
            if (!currentBlock) {
                this._removeBlockLoopEvent();
                this.removeEvents();
                this.exitState();
                return;
            }
            gameConfig.showBlockConsole ? console.log(currentBlock.name) : null;
            currentBlock.start(); // current block calls the blockComplete event at the end of its tasks            
        } 
        else {
            this._removeBlockLoopEvent();
            this.removeEvents();
            this.exitState();
        }
    }
    
    private _removeBlockLoopEvent(): void {

        if (this.boundPlayThrough) {
            GAME.events.blockComplete.remove(this.boundPlayThrough);
        }
    }

    abstract removeEvents(): void;

    abstract exitState(): void;
}

import { Block } from "../../Block";
import { emptyAllReels } from "../../../utils/ReelHelper";

export class CleanUpGame extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this._emptyContainers();
        this.end();
    }

    private _emptyContainers(): void {

        emptyAllReels();
    }
}

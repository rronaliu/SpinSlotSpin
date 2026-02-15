import { Block } from "../../Block";

export class WontContinue extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this.end();
    }
    
    override end(): void {
        // no block complete so game wont continue
    }
}

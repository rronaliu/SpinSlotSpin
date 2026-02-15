import { Block } from "../../Block";
import { GAME } from "../../../GAME";

export class AnimateOccasional extends Block {

    constructor(name: string) {
        super(name);
    }

    start() {

        this._animateOccasional();
        this.end();
    }
 
    private _animateOccasional(): void {

        const shouldAnimate = Math.random() < 0.3;

        if (!shouldAnimate) {
            return;
        }

        const reelContainers = [
            GAME.containers.reelAContainer,
            GAME.containers.reelBContainer,
            GAME.containers.reelCContainer,
            GAME.containers.reelDContainer
        ];
        
        // Randomly select one of the 4 reel containers
        const randomContainerIndex = Math.floor(Math.random() * 4);
        const selectedContainer = reelContainers[randomContainerIndex];
        
        if (selectedContainer.children.length === 0) {

            return;
        }
        
        // Randomly select a child from the container
        const randomChildIndex = Math.floor(Math.random() * selectedContainer.children.length);
        const selectedChild = selectedContainer.children[randomChildIndex] as any;

        // Check if the child is an animated sprite and animate it
        if (selectedChild && typeof selectedChild.gotoAndPlay === 'function') {

            selectedChild.gotoAndPlay(0);
        }
    }
}

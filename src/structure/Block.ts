import { GAME, GAME_MODELS } from "../GAME";
import { Models } from "../models/Models";

// Deep readonly utility type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

export abstract class Block {
  name: string = "Step";
  protected readonly models: DeepReadonly<Models>;

  constructor(name: string) {
    this.name = name;
    this.models = GAME_MODELS;
  }

  abstract start(): void; // visual manipulation goes here and can be overridden

  end(): void {
    GAME.events.blockComplete.dispatch();
  }
}

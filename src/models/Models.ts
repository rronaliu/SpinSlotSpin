import { BetModel } from "./BetModel";
import { ReelModel } from "./ReelModel";
import { Resultmodel } from "./ResultModel";
import { ProgressModel } from "./ProgressModel";

export class Models {
  bet: BetModel = new BetModel();
  reel: ReelModel = new ReelModel();
  result: Resultmodel = new Resultmodel();
  progress: ProgressModel = new ProgressModel();
} 
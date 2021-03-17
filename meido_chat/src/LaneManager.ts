import {useDispatch} from "react-redux";
import * as Constants from "constants";
import {LANE_NUM} from "./Constants";


class LaneManager {
    currentLaneNum: number
    oldLaneNum: number

    constructor() {
        this.currentLaneNum = -1
        this.oldLaneNum = -100
    }

    getNextLaneNumber(): number {
        //現在のナンバー
        if (this.currentLaneNum < 0) {
            console.log("Process 1")
            this.currentLaneNum = 1
            return this.currentLaneNum
        }
        else if(this.oldLaneNum < 0){
            console.log("Process 2")

            this.oldLaneNum = this.currentLaneNum
            //1回目は2～8レーンを自動的に
            const randNum = Math.floor(Math.random()*(LANE_NUM-2)+2);
            return randNum
        }
        else{
            console.log("Process 3")

            this.oldLaneNum = this.currentLaneNum
            let randNum = -1
            //do-whileがあるか分からないので最初は外で
            randNum = Math.floor(Math.random()*(LANE_NUM-1)+1);

            //前のレーン以外を引く
            while(randNum === this.oldLaneNum)
             randNum = Math.floor(Math.random()*(LANE_NUM-1)+1);

            return randNum
        }
    }
}


export default new LaneManager()
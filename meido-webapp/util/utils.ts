import { MYOUJIS,NAMES } from "../constants";

export function getRandom(minNum:number,maxNum:number):number{
    return Math.floor(Math.random()*(maxNum-minNum)+minNum);
}

export function getRandomUserName(): string {
    return MYOUJIS[getRandom(MYOUJIS.length-1,0)] + " " + NAMES[getRandom(NAMES.length-1,0)]
}

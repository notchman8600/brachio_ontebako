export const LANE_NUM: number = 6
export const evilSpacing = (num: number): string => {
    let str = ""
    for (let i = 0; i < num; i++) {
        str += " "
    }
    // console.log("hoge" + str + "piyo")
    return str
}
export const myLiffId = process.env.REACT_APP_LIFF_ID || "";
export const dummyIcon = '/dummyicon.svg';
export const adjustValue = 0.3;
// import liff from '@line/liff';
// import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
// import { myLiffId, dummyIcon } from "./Constants";
//
// liff.init({ liffId: myLiffId }).catch(console.error);
//
// type LiffInfoContextValue = {
//   loggedIn: boolean;
//   name: string;
//   image: string;
// }
//
// const LiffInfoContext = createContext<LiffInfoContextValue>({
//   loggedIn: false,
//   name: '',
//   image: dummyIcon,
// });
//
// export const LiffInfoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [loggedIn, setLoggedIn] = useState(liff.isLoggedIn());
//   const [name, setName] = useState('Unknown User');
//   const [image, setImage] = useState(dummyIcon);
//   useEffect(() => {
//     console.log("Try login")
//    if (loggedIn) {
//      liff.getProfile().then((prof) => {
//        setName(prof.displayName);
//        setImage(prof.pictureUrl ?? dummyIcon);
//      });
//    } else if (process.env.NODE_ENV !== 'development') {
//      liff.login();
//      setLoggedIn(liff.isLoggedIn());
//    }
//   }, [loggedIn]);
//
//   return (
//     <LiffInfoContext.Provider value={{ loggedIn, name, image }}>
//       { children }
//     </LiffInfoContext.Provider>
//   )
// };
//
// export const useLiffInfo = (): LiffInfoContextValue => {
//   return useContext(LiffInfoContext)
// };
//

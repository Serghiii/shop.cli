import React, { Dispatch, RefObject, SetStateAction, useContext, useRef, useState } from "react";

interface IStore {
   stateProfile: [boolean, Dispatch<SetStateAction<boolean>>]
   stateCart: [boolean, Dispatch<SetStateAction<boolean>>]
   Categories: RefObject<HTMLDivElement|null>
   mainSwiper: RefObject<HTMLDivElement|null>
   scrollUp: RefObject<HTMLDivElement|null>
};

const MainContext = React.createContext<IStore | undefined>(undefined)
type Props = {
   children?: React.ReactNode
};
const MainProvider: React.FC<Props> = ({ children }) => {
   const [stateProfile, setStateProfile] = useState<boolean>(false); // стан для профіля
   const [stateCart, setStateCart] = useState<boolean>(false); // стан для категорій
   const Categories = useRef<HTMLDivElement>(null);
   const mainSwiper = useRef<HTMLDivElement>(null);
   const scrollUp = useRef<HTMLDivElement>(null);

   const store: IStore = {
      stateProfile: [stateProfile, setStateProfile],
      stateCart: [stateCart, setStateCart],
      Categories: Categories,
      mainSwiper: mainSwiper,
      scrollUp: scrollUp,
   };
   return (
      <MainContext.Provider value={store} >
         {children}
      </MainContext.Provider>
   )
}

export const useMainContext = () => {
   const mainContext = useContext(MainContext)
   if (!mainContext) {
      throw new Error('useMainContext must be used within the MainContext.Provider');
   }
   return mainContext;
}

export default MainProvider
import axios from "axios";
import React, { Dispatch, RefObject, SetStateAction, useContext, useRef, useState } from "react";
import useSWR from "swr";

interface IStore {
   stateProfile: [boolean, Dispatch<SetStateAction<boolean>>];
   stateCart: [boolean, Dispatch<SetStateAction<boolean>>];
   Categories: RefObject<HTMLDivElement>;
   mainSwiper: RefObject<HTMLDivElement>;
   scrollUp: RefObject<HTMLDivElement>;
   categoryItems: any;
   groupItems: any;
};

const fetcherCategories = async (url: string) => await axios.get(url).then(response => response.data)
const fetcherGroups = async (url: string) => await axios.get(url).then(response => response.data)

const MainContext = React.createContext<IStore | undefined>(undefined);
type Props = {
   children?: React.ReactNode
};
const MainProvider: React.FC<Props> = ({ children }) => {
   const [stateProfile, setStateProfile] = useState<boolean>(false); // стан для профіля
   const [stateCart, setStateCart] = useState<boolean>(false); // стан для категорій
   const Categories = useRef<HTMLDivElement>(null);
   const mainSwiper = useRef<HTMLDivElement>(null);
   const scrollUp = useRef<HTMLDivElement>(null);
   const categoryItems = useSWR('categories', fetcherCategories).data;
   const groupItems = useSWR('groups', fetcherGroups).data;
   const store: IStore = {
      stateProfile: [stateProfile, setStateProfile],
      stateCart: [stateCart, setStateCart],
      Categories: Categories,
      mainSwiper: mainSwiper,
      scrollUp: scrollUp,
      categoryItems: categoryItems,
      groupItems: groupItems,
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
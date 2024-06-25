"use client";

import { createContext, useContext, useState } from "react";
import React from "react";

type SearchProviderProps = {
  children: React.ReactNode;
};

const SearchContext = createContext<any | undefined>(undefined);

const useMovieContext = () => useContext(SearchContext);

const SearchProvider = (props: SearchProviderProps) => {
  const { children } = props;

  return <SearchContext.Provider value={}>{children}</SearchContext.Provider>;
};

export default SearchProvider;

export { useMovieContext };

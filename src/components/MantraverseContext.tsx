import { createContext, useContext, useState, type ReactNode } from "react";

type Ctx = { mantraverse: boolean; toggle: () => void };
const MantraverseCtx = createContext<Ctx>({ mantraverse: false, toggle: () => {} });

export function MantraverseProvider({ children }: { children: ReactNode }) {
  const [mantraverse, setMantraverse] = useState(false);
  return (
    <MantraverseCtx.Provider value={{ mantraverse, toggle: () => setMantraverse((v) => !v) }}>
      {children}
    </MantraverseCtx.Provider>
  );
}

export const useMantraverse = () => useContext(MantraverseCtx);
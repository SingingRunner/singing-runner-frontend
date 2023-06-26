import { SetStateAction, createContext, Dispatch, useState } from "react";

interface IPollingContext {
  isPolling: boolean;
  setIsPolling: Dispatch<SetStateAction<boolean>>;
}

export const PollingContext = createContext<IPollingContext>({
  isPolling: false,
  setIsPolling: () => {},
});

interface PollingProviderProps {
  children: React.ReactNode;
}

export const PollingProvider = ({ children }: PollingProviderProps) => {
  const [isPolling, setIsPolling] = useState<boolean>(false);

  return (
    <PollingContext.Provider value={{ isPolling, setIsPolling }}>
      {children}
    </PollingContext.Provider>
  );
};

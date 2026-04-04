import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

type RegistrationContextValue = {
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const RegistrationContext = createContext<RegistrationContextValue | null>(null);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const value = useMemo(
    () => ({ modalOpen, openModal, closeModal }),
    [modalOpen, openModal, closeModal]
  );

  return <RegistrationContext.Provider value={value}>{children}</RegistrationContext.Provider>;
}

/** Hook for opening the registration modal from anywhere under the provider. */
// eslint-disable-next-line react-refresh/only-export-components -- hook colocated with provider
export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error('useRegistration must be used within RegistrationProvider');
  return ctx;
}

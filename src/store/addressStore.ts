import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AddressState = {
    addressId: string | null;
};

type AddressActions = {
    setAddressId: (addressId: string | null) => void;
    resetAddress: () => void;
};

type AddressStore = AddressState & AddressActions;

const useAddressStore = create<AddressStore>()(
    devtools(
        persist(
            (set) => ({
                addressId: null,
                setAddressId: (addressId: string | null) => set({ addressId }),
                resetAddress: () => set({ addressId: null }),
            }),
            {
                name: "address-storage",
                storage: {
                    getItem: (name: string) => {
                        const str = sessionStorage.getItem(name);
                        return str ? JSON.parse(str) : null;
                    },
                    setItem: (name: string, value: unknown) => {
                        sessionStorage.setItem(name, JSON.stringify(value));
                    },
                    removeItem: (name: string) =>
                        sessionStorage.removeItem(name),
                },
                partialize: (state) => ({ addressId: state.addressId }),
            }
        ),
        { name: "AddressStore" }
    )
);

export default useAddressStore;

export const useAddressState = () => {
    const addressId = useAddressStore((s) => s.addressId);
    return { addressId };
};

export const useAddressActions = () => {
    const setAddressId = useAddressStore((s) => s.setAddressId);
    const resetAddress = useAddressStore((s) => s.resetAddress);
    return { setAddressId, resetAddress };
};

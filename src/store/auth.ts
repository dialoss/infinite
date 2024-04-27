import {create} from "zustand";

export const useAuth = create((set) => ({
    token: '',
    setToken: (token) => set({token}),
}))

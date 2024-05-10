"use client";
import { create } from "zustand";
import { produce } from "immer";

type AuthState = {
  userData: any;
  token: any;

  setUserData: (payload: any) => void;
  setRole: (payload: any) => void;
  setToken: (payload: any) => void;
};

const useAuthStore = create<AuthState>((set) => {
  let initialToken = null;
  let initialUserData = null;

  if (typeof window !== "undefined") {
    const tokenFromLocalStorage = localStorage.getItem("token");
    initialToken = tokenFromLocalStorage ? tokenFromLocalStorage : null;
    const userDataFromLocalStorage = localStorage.getItem("userData");
    initialUserData = userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : null;
  }

  return {
    userData: initialUserData,
    token: initialToken,
    provider: null,

    setUserData: (payload) => {
      set({userData: payload})
    },

    setRole: (payload) => {
      set(
        produce((state) => {
          state.userData.role = payload
        })
      );
    },

    setToken: (payload) => {
      set({token: payload})
    },
  };
});

export const {
  token,
  setToken,
  userData,
  setUserData,
  setRole,
} = useAuthStore.getState();

export default useAuthStore;

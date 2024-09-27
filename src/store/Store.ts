import { create } from 'zustand'

interface GetUsersUpdate {
    toggleCount: number
    setToggleCount: (value: number) => void
}

export const updateUserList = create<GetUsersUpdate>((set) => ({
    toggleCount: 0,
    setToggleCount: (value: number) => set({ toggleCount: value }),
}))

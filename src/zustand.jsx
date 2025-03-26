import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// const userStore = create((set) => ({
//   user: null,
//   token: "",
//   refresh: "",
//   setUser: (userData) =>
//     set({
//       user: userData.user,
//       token: userData.access,
//       refresh: userData.refresh,
//     }),
//   removeUser: () => set({ user: null, access: "", refresh: "" }),
// }));
// export default userStore;

const userStore = create(
  persist(
    (set) => ({
      user: null,
      token: "",
      refresh: "",
      setUser: (userData) =>
        set({
          user: userData.user,
          token: userData.access,
          refresh: userData.refresh,
        }),
      removeUser: () => set({ user: null, token: "", refresh: "" }),
    }),
    {
      name: "userstore",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default userStore;

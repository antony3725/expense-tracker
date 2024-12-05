import { defineStore } from "pinia";

// Define or import the User type
interface User {
  id: number;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  token: string | null;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
    token: null,
  }),
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    setToken(token: string | null) {
      this.token = token;
    },
    login(userData: { user: User; token: string }) {
      this.setUser(userData.user);
      this.setToken(userData.token);
    },
    logout() {
      this.setUser(null);
      this.setToken(null);
    },
  },
  getters: {
    isAuthenticated: (state: UserState): boolean => !!state.token,
    getUser: (state: UserState): User | null => state.user,
    getToken: (state: UserState): string | null => state.token,
  },
});

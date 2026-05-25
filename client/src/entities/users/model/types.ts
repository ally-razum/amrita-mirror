export type UserRole = "admin" | "manager" | "user";

export interface User {
  id: number;
  userFullName: string;
  userLogin: string;
  userRole: UserRole;
}

export interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
}
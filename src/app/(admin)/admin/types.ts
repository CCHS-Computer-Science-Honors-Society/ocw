export interface User {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: "admin" | "user";
}

export interface Course {
  id: string;
  name: string;
  description?: string;
}

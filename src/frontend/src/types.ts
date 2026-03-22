export interface Design {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  gradient: string;
  badge?: string;
  image?: string;
}

export interface Order {
  id: string;
  designId: string;
  designName: string;
  designCategory: string;
  customerName: string;
  phone: string;
  whatsapp: string;
  preferredDate: string;
  notes: string;
  status: "pending" | "confirmed" | "in-progress" | "completed";
  createdAt: string;
  uploadedFile?: string;
}

export interface User {
  email: string;
  name: string;
  isAdmin: boolean;
}

export type ViewType = "home" | "designs" | "admin";

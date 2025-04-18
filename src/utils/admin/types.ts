
export interface User {
  id: string;
  name: string;
  email: string;
  role: "konsulent" | "admin";
  avatar?: string;
}

export interface Customer {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  customerId: string;
  name: string;
  description: string;
  status: "planlagt" | "pågående" | "fullført" | "avbrutt";
  createdAt: string;
  updatedAt: string;
  designSpec?: any;
  generatedComponents?: Array<{name: string, code: string}>;
  repositoryUrl?: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  service: "lovable" | "github" | "openai" | "claude";
  createdAt: string;
  active: boolean;
}

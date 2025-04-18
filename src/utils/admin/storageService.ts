
import { User, Customer, Project, ApiKey } from "./types";
import { v4 as uuidv4 } from "uuid";

// Hjelpefunksjoner for lagring
const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error retrieving ${key}:`, error);
    return defaultValue;
  }
};

const setItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key}:`, error);
  }
};

// Innlogging/Autentisering
const CURRENT_USER_KEY = "n60_current_user";
const USERS_KEY = "n60_users";

export const initializeUsers = (): void => {
  const users = getItem<User[]>(USERS_KEY, []);
  
  if (users.length === 0) {
    // Opprett standard brukere hvis ingen eksisterer
    const defaultUsers: User[] = [
      {
        id: uuidv4(),
        name: "Admin Bruker",
        email: "admin@n60ai.no",
        role: "admin",
      },
      {
        id: uuidv4(),
        name: "Konsulent Bruker",
        email: "konsulent@n60ai.no",
        role: "konsulent",
      },
    ];
    
    setItem(USERS_KEY, defaultUsers);
  }
};

export const loginUser = (email: string): User | null => {
  const users = getItem<User[]>(USERS_KEY, []);
  const user = users.find(u => u.email === email);
  
  if (user) {
    setItem(CURRENT_USER_KEY, user);
    return user;
  }
  
  return null;
};

export const getCurrentUser = (): User | null => {
  return getItem<User | null>(CURRENT_USER_KEY, null);
};

export const logoutUser = (): void => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

// API-nøkler
const API_KEYS_KEY = "n60_api_keys";

export const getApiKeys = (): ApiKey[] => {
  return getItem<ApiKey[]>(API_KEYS_KEY, []);
};

export const saveApiKey = (apiKey: Omit<ApiKey, "id" | "createdAt">): ApiKey => {
  const apiKeys = getApiKeys();
  
  const newApiKey: ApiKey = {
    ...apiKey,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  
  apiKeys.push(newApiKey);
  setItem(API_KEYS_KEY, apiKeys);
  return newApiKey;
};

export const updateApiKey = (id: string, updates: Partial<ApiKey>): ApiKey | null => {
  const apiKeys = getApiKeys();
  const index = apiKeys.findIndex(key => key.id === id);
  
  if (index !== -1) {
    apiKeys[index] = { ...apiKeys[index], ...updates };
    setItem(API_KEYS_KEY, apiKeys);
    return apiKeys[index];
  }
  
  return null;
};

export const deleteApiKey = (id: string): boolean => {
  const apiKeys = getApiKeys();
  const filteredKeys = apiKeys.filter(key => key.id !== id);
  
  if (filteredKeys.length < apiKeys.length) {
    setItem(API_KEYS_KEY, filteredKeys);
    return true;
  }
  
  return false;
};

// Kunder
const CUSTOMERS_KEY = "n60_customers";

export const getCustomers = (): Customer[] => {
  return getItem<Customer[]>(CUSTOMERS_KEY, []);
};

export const getCustomerById = (id: string): Customer | undefined => {
  const customers = getCustomers();
  return customers.find(customer => customer.id === id);
};

export const saveCustomer = (customer: Omit<Customer, "id" | "createdAt" | "updatedAt">): Customer => {
  const customers = getCustomers();
  const now = new Date().toISOString();
  
  const newCustomer: Customer = {
    ...customer,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  
  customers.push(newCustomer);
  setItem(CUSTOMERS_KEY, customers);
  return newCustomer;
};

export const updateCustomer = (id: string, updates: Partial<Omit<Customer, "id" | "createdAt">>): Customer | null => {
  const customers = getCustomers();
  const index = customers.findIndex(c => c.id === id);
  
  if (index !== -1) {
    customers[index] = {
      ...customers[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    setItem(CUSTOMERS_KEY, customers);
    return customers[index];
  }
  
  return null;
};

export const deleteCustomer = (id: string): boolean => {
  const customers = getCustomers();
  const filteredCustomers = customers.filter(c => c.id !== id);
  
  if (filteredCustomers.length < customers.length) {
    setItem(CUSTOMERS_KEY, filteredCustomers);
    
    // Også slett alle prosjekter tilknyttet kunden
    const projects = getProjects();
    const filteredProjects = projects.filter(p => p.customerId !== id);
    setItem(PROJECTS_KEY, filteredProjects);
    
    return true;
  }
  
  return false;
};

// Prosjekter
const PROJECTS_KEY = "n60_projects";

export const getProjects = (): Project[] => {
  return getItem<Project[]>(PROJECTS_KEY, []);
};

export const getProjectsByCustomerId = (customerId: string): Project[] => {
  const projects = getProjects();
  return projects.filter(project => project.customerId === customerId);
};

export const getProjectById = (id: string): Project | undefined => {
  const projects = getProjects();
  return projects.find(project => project.id === id);
};

export const saveProject = (project: Omit<Project, "id" | "createdAt" | "updatedAt">): Project => {
  const projects = getProjects();
  const now = new Date().toISOString();
  
  const newProject: Project = {
    ...project,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  
  projects.push(newProject);
  setItem(PROJECTS_KEY, projects);
  return newProject;
};

export const updateProject = (id: string, updates: Partial<Omit<Project, "id" | "createdAt">>): Project | null => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index !== -1) {
    projects[index] = {
      ...projects[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    setItem(PROJECTS_KEY, projects);
    return projects[index];
  }
  
  return null;
};

export const deleteProject = (id: string): boolean => {
  const projects = getProjects();
  const filteredProjects = projects.filter(p => p.id !== id);
  
  if (filteredProjects.length < projects.length) {
    setItem(PROJECTS_KEY, filteredProjects);
    return true;
  }
  
  return false;
};

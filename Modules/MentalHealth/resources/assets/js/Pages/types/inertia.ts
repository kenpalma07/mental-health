export interface PageProps {
  auth?: {
    user?: {
      id: number;
      name: string;
      email: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  errors?: Record<string, string>;
  flash?: {
    success?: string;
    error?: string;
    [key: string]: any;
  };
  [key: string]: any; 
}

export interface User {
  id: number;
  code: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  mf: string;
  ville: string;
  role: string[];
  status: string;
  adress: {
    id: number;
    street: string;
    houseNumber: string;
    zipCode: string;
  };
}
export interface RegistrationDTO {
    email: string;
    password: string;
  }
  export interface Adress {
    id: number;
    street: string;
    houseNumber: string;
    zipCode: string;
  }
   export interface RegistrationDTO {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthDate: string; 
    phoneNumber: string;
    adress: Adress;
  }
  
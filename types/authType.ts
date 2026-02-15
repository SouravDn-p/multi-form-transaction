export interface RegisterRequest {
  nprenom: string;
  email: string;
  phone: string;
  mdp: string;
  pays: string;
  fname: string;
}

export interface RegisterResponse {
  message: string;
  access_token: string;
  token_type: "Bearer";
}

export interface LoginRequest {
  email: string;
  mdp: string;
}

export interface User {
  userID: number;
  agID: number | null;
  cpt: string | null;
  nprenom: string;
  email: string;
  phone: string;
  mdp: string;
  pays: string;
  solde: string | null;
  activationDATE: string | null;
  ville: string | null;
  identId: string | null;
  fname: string;
  rate: string | null;
  balance: string | null;
  statut: string;
  socialId: string | null;
  ratemc: string | null;
  refcode: string | null;
  comm: string | null;
  refmaster: string | null;
  regular_otp: string | null;
  remember_token: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface LoginResponse {
  access_token: string;
  token_type: "Bearer";
  user: User;
}

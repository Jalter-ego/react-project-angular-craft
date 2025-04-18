// auth.ts (corregido)
import { api } from "../api/index";

export const fetchLoginGoogle = async (response: any): Promise<any> => {
  const serverResponse = await fetch(api + "/auth/google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: response.credential }),
  });

  const data = await serverResponse.json();
  return data;
};

export const fetchLogin = async (email: string, password: string) => {
  const serverResponse = await fetch(api + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });

  const data = await serverResponse.json();
  return data;
};

export const fetchRegister = async (email: string, password: string) => {
    const serverResponse = await fetch(api + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
  
    const data = await serverResponse.json();
    return data;
  };

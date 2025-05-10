import { API } from "../../environment";

export const registerService = async (body:any) => {
    try {  
      const query = 'auth/register';
  
      const response = await fetch(`${API}/${query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
      });
  
      return await response.json();
       
    } catch (error) {
      console.error('Error en registerService:', error);
      throw error;
    }
  };
          
  export const loginService = async (body:any) => {
    try {        
      const query = 'auth/login';
  
      const response = await fetch(`${API}/${query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(body)
      });
  
      
      if (!response.ok) {
        throw new Error("Credenciales incorrectas o usuario no encontrado");
      }
      const json = await response.json();
  
      const token = json.accessToken;
  
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('session', body.email);
      }
  
      return response;
    } catch (error) {
      console.error('Error en loginService:', error);
      throw error;
    }
  };
  
    
  
  
  export const logoutService = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('session');
  }
  
  export const getSessionService = () => {
      return localStorage.getItem('session');
  }
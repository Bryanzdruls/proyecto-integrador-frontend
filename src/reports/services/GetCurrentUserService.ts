import { API } from "../../environment";
import { UserInterface } from "../../shared/interfaces/UserInterface";

interface ResponseGetCurrentUser {
    ok:boolean;
    data: UserInterface
    message?: string;
    status?: number;
}

export const getCurrentUserService = async ():Promise<ResponseGetCurrentUser> => {
    const userEmail = localStorage.getItem('session');
    if (!userEmail) {
        throw new Error('No user email found in local storage');
    }
    
    const response = await fetch(`${API}/users/email/${userEmail}`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,           
        }       
    } );
    
    return await response.json();
}
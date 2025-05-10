import { API } from "../../environment";
import { UserInterface } from "../../shared/interfaces/UserInterface";


interface ResponseGetCurrentUser {
    ok:boolean;
    data: UserInterface[]
    message?: string;
    status?: number;
}

export const getAllUsersService = async ():Promise<ResponseGetCurrentUser> => {    
    const response = await fetch(`${API}/users`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,           
        }       
    } );
    
    return await response.json();
}
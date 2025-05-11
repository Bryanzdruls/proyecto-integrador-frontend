import { API } from "../../environment";
import { UserInterface } from "../../shared/interfaces/UserInterface";


interface ResponseUpdateUserUser {
    ok:boolean;
    data: UserInterface[]
    message?: string;
    status?: number;
}

export const updateUsersService = async (id:number,body:UserInterface):Promise<ResponseUpdateUserUser> => {   
    const userMapped = {
        name: body.name,
        email: body.email,
        score: body.score,
        role: body.role,
        rewardValue: body.rewardValue? body.rewardValue : 0,
    } 
    const response = await fetch(`${API}/users/${id}`,{
        method: 'PUT',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  
            'Content-Type': 'application/json',                    
        },
        body: JSON.stringify(userMapped)
    } );
    
    return await response.json();
}
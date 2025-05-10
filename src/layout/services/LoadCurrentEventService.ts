import { API } from "../../environment";
import { CurrentEventResponseInterface } from "../../shared/interfaces/events/CurrentEventResponseinterface";

export const getCurrentEventService = async ():Promise<CurrentEventResponseInterface> => {
    
    const response = await fetch(`${API}/events/1`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,           
        }       
    } );
    
    return await response.json();
}
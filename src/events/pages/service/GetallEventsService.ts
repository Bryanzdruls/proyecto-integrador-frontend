
import { API } from "../../../environment";
import { EventsResponseInterface } from "../../../shared/interfaces/events/CurrentEventResponseinterface";

export const getAllEventsService = async ():Promise<EventsResponseInterface> => {    
    const response = await fetch(`${API}/events`,{
        method: 'GET',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,           
        }       
    } );
    
    return await response.json();
}
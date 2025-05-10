import { API } from "../../../environment";
import { EventDataInterface } from "../../../shared/interfaces/events/CurrentEventResponseinterface";


interface ResponseUpdateEvent {
    ok:boolean;
    data: EventDataInterface
    message?: string;
    status?: number;
}

export const updateEventsService = async (id:number,body:EventDataInterface):Promise<ResponseUpdateEvent> => {   
    const response = await fetch(`${API}/events/${id}`,{
        method: 'PUT',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  
            'Content-Type': 'application/json',                    
        },
        body: JSON.stringify(body)
    } );
    
    return await response.json();
}
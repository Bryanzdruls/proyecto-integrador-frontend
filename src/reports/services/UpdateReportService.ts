import { API } from "../../environment";
import { UserInterface } from "../../shared/interfaces/UserInterface";
import { ReportInterface } from "../interfaces/ReportFormDataInterface";


interface ResponseUpdateReportInterface {
    ok:boolean;
    data: UserInterface[]
    message?: string;
    status?: number;
}

export const updateReportService = async (id:number,body:ReportInterface):Promise<ResponseUpdateReportInterface> => {   
    const response = await fetch(`${API}/reports/${id}`,{
        method: 'PUT',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,  
            'Content-Type': 'application/json',                    
        },
        body: JSON.stringify(body)
    } );
    
    return await response.json();
}
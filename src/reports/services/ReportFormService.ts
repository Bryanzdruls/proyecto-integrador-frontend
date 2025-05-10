import { API } from "../../environment";
import { ReportFormDataInterface } from "../interfaces/ReportFormDataInterface";

export const createReportService = async (body:ReportFormDataInterface):Promise<any> => {  
    const formData = new FormData();
    formData.append("report", new Blob([JSON.stringify(body)], { type: "application/json" }));
    if (body.attachment) {
        formData.append("attachment", body.attachment);
    }
    
    const response = await fetch(`${API}/reports`,{
        method: 'POST',
        headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`,           
        },
        body:formData,
    } );
    
    return await response.json();
}
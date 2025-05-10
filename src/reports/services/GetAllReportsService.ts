import { API } from "../../environment";
import { ReportResponseInterface } from "../interfaces/ReportFormDataInterface";

export const getAllReportsService = async (): Promise<ReportResponseInterface> => {
    const startTime = performance.now();

    const response = await fetch(`${API}/reports`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
    });

    const endTime = performance.now();
    const duration = endTime - startTime;

    console.log(`⏱️ Tiempo de respuesta: ${duration.toFixed(2)} ms`);

    return await response.json();
}

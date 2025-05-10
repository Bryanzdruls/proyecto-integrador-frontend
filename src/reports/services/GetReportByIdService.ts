// src/modules/reports/services/GetReportByIdService.ts
import { API } from '../../environment';
import { ReportInterface } from '../interfaces/ReportFormDataInterface';

interface ResponseGetReportById {
    ok: boolean;
    data: ReportInterface;
    message?: string;
    status?: number;
}
export const getReportByIdService = async (id: number): Promise<ResponseGetReportById> => {
  const response = await fetch(`${API}/reports/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener el reporte');
  return await response.json();
};

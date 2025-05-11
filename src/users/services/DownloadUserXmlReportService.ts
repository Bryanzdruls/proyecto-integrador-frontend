import { API } from "../../environment";

export const downloadUserXmlReportService = async (): Promise<void> => {
  const response = await fetch(`${API}/users/generate-xml-report`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Error al descargar el reporte XML');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'usuarios_reporte.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

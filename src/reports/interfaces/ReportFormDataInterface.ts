export interface ReportFormDataInterface {
    idReport?: number;
    userId: number;
    title: string;
    description: string;
    date: Date | undefined; // O puedes usar Date si prefieres manejar las fechas como objetos Date
    type: string;
    companyContactNumber: string;
    urgency: string;
    attachment: string | null; // Si prefieres manejar el archivo como objeto File, cambia a File
    id_event: number;
  }
export interface ReportInterface extends ReportFormDataInterface {
  idReport: number;  
}
  
export interface ReportResponseInterface {
  ok: boolean;
  data: ReportInterface[];
  message?: string;
  status?: number;
}
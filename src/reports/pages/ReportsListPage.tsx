import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
} from '@mui/material';
import CustomSnackBar from '../../shared/modals/CustomSnackBar';
import { ReportInterface } from '../interfaces/ReportFormDataInterface';
import { getAllReportsService } from '../services/GetAllReportsService';
import { getReportByIdService } from '../services/GetReportByIdService';
import { updateReportService } from '../services/UpdateReportService';
export default function ReportListPage() {
  const [reports, setReports] = useState<ReportInterface[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportInterface | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success',
  });

  const handleEditClick = async (report: ReportInterface) => {
    try {
      const response = await getReportByIdService(report.idReport);
      setSelectedReport(response.data);
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Error al obtener el reporte con adjunto',
        severity: 'error',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedReport((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

   const handleSave = async() => {
      if (selectedReport) {
        try {
          const response = await updateReportService(selectedReport.idReport, selectedReport);
          if (response.ok) {
            setReports((prev) =>
              prev.map((r) => (r.idReport === selectedReport.idReport ? selectedReport : r))
            );      
            setSelectedReport(null);
            setSnackbar({
              open: true,
              message: 'Reporte editado correctamente',
              severity: 'success',
            });          
          }else{
            setSnackbar({
              open: true,
              message: 'Error al editar el Reporte: ' + response.message,
              severity: 'error',
            });
          }
        } catch (error) {
          console.log('Error al editar el Reporte:', error);        
          setSnackbar({
            open: true,
            message: 'Algo salió mal al editar el Reporte.',
            severity: 'error',
          });
        }   
      }   
    };
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getAllReportsService();
        if (response.ok) {
          setReports(response.data);
        } else {
          setSnackbar({
            open: true,
            message: 'Error al obtener reportes',
            severity: 'error',
          });
        }
      } catch (error) {
        console.error('Error al obtener reportes:', error);
        setSnackbar({
          open: true,
          message: 'Error al obtener reportes'+ error,
          severity: 'error',
        });
      }
    };

    fetchReports();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <CustomSnackBar
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />

      {selectedReport && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">Editar Reporte</Typography>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <TextField
              label="Email Usuario"
              name="title"
              value={selectedReport.userEmail}
              onChange={handleChange}
              disabled
              fullWidth
            />
            <TextField
              label="Título"
              name="title"
              value={selectedReport.title}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Descripción"
              name="description"
              value={selectedReport.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              label="Fecha"
              name="date"
              type="date"
              value={selectedReport.date}
              onChange={handleChange}
              fullWidth              
              slotProps={{inputLabel: { shrink: true }}}
            />
            <TextField
              label="Tipo"
              name="type"
              value={selectedReport.type}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Número de contacto"
              name="companyContactNumber"
              value={selectedReport.companyContactNumber}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Urgencia"
              name="urgency"
              value={selectedReport.urgency}
              onChange={handleChange}
              fullWidth
            />
             {selectedReport.attachment && (
              <a href={selectedReport.attachment} target="_blank" rel="noopener noreferrer">
              Ver adjunto
              </a>
            )}
            <Box>
              <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
                Guardar
              </Button>
              <Button onClick={() => setSelectedReport(null)} variant="outlined">
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <Typography variant="h4" gutterBottom>
        Lista de Reportes
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Urgencia</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.idReport}>
                <TableCell>{report.title}</TableCell>
                <TableCell>{report.description}</TableCell>
                <TableCell>{report.date?.toString() ?? 'No aplica'}</TableCell>
                <TableCell>{report.type}</TableCell>
                <TableCell>{report.urgency}</TableCell>
                <TableCell>                
                  {
                    selectedReport ? 
                    (
                      <Button onClick={() => setSelectedReport(null)} variant="outlined">
                        Cancelar
                      </Button>
                    ):
                    (
                      <Button onClick={() => handleEditClick(report)} variant="contained">
                        Editar
                      </Button>
                    )
                  } 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

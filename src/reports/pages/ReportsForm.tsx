import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Input,
  FormHelperText,
  FormControl,
  Select,
} from '@mui/material';

import { ReportFormDataInterface } from '../interfaces/ReportFormDataInterface';
import { validateForm } from '../validations/ValidateForm';
import { createReportService } from '../services/ReportFormService';
import { UserInterface } from '../../shared/interfaces/UserInterface';
import { getCurrentUserService } from '../services/GetCurrentUserService';
import CustomSnackBar from '../../shared/modals/CustomSnackBar';

const urgencyLevels = ['BAJO', 'MEDIO', 'ALTO'];
const types = ['DESECHOS'];

export default function ReportForm() {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success',
  });
  const [user, setUser] = useState<UserInterface|null>(null);  
  const [formData, setFormData] = useState<ReportFormDataInterface>({
    userId: 1,
    title: '',
    description: '',
    date: undefined,
    type: '',
    companyContactNumber: '',
    urgency: '',
    attachment: null,
    id_event: 1,
  });

  const [errors, setErrors] = useState<any>({
    title: '',
    description: '',
    date: '',
    type: '',
    companyContactNumber: '',
    urgency: '',
    attachment: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData(prev => ({
      ...prev,
      attachment: file,
    }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();   
    const { formErrors, isValid } = validateForm(formData);
    setErrors(formErrors);

    if (!isValid) return;

    try {
      const response = await createReportService(formData);
      if (response.ok) {
        console.log('Reporte creado exitosamente');
        setFormData({
          userId: user?.idUser ?? 1,
          title: '',
          description: '',
          date: undefined,
          type: '',
          companyContactNumber: '',
          urgency: '',
          attachment: null,
          id_event: 1,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        setSnackbar({
          open: true,
          message: 'Reporte creado exitosamente',
          severity: 'success',
        });
      } else {
        console.error('Error al crear el reporte: ', response.message);     
        setSnackbar({
          open: true,
          message: 'Error al crear el reporte: '+ response.message,
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSnackbar({
        open: true,
        message: 'Error al enviar el formulario',
        severity: 'error',
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUserService();
        if (response.ok) {
          const userData = response.data;
          setUser(userData);
          setFormData(prev => ({
            ...prev,
            userId: userData.idUser,
          }));
        } else {
          console.error('Error al capturar el usuario actual: ', response.message);
          setSnackbar({
            open: true,
            message: 'Error al capturar el usuario actual: ' + response.message,
            severity: 'error',
          });
        }
      } catch (error) {
        console.error('Error capturando el usuario actual:', error);
        setSnackbar({
          open: true,
          message: 'Error capturando el usuario actual',
          severity: 'error',
        });
      }
    };
  
    fetchUser();
  }, []);
  
  return (
    <>
    <CustomSnackBar
      open={snackbar.open}
      onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      message={snackbar.message}
      severity={snackbar.severity}
    />  
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Crear Reporte
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 2 }}>
        <FormControl fullWidth>          
          <Select
            disabled
            name="userId"
            value={formData.userId}
            fullWidth
          >
            <MenuItem value={formData.userId}>{user?.name}</MenuItem>
          </Select>
        </FormControl>       
        <TextField
          label="Título"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          error={!!errors.title}
          helperText={errors.title}
        />
        <TextField
          label="Descripción"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          label="Fecha"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          slotProps={{inputLabel: {shrink: true}}}
          fullWidth
          error={!!errors.date}
          helperText={errors.date}
        />
        <TextField
          label="Tipo"
          name="type"
          select
          value={formData.type}
          onChange={handleChange}
          fullWidth
          error={!!errors.type}
          helperText={errors.type}
        >
          {types.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Teléfono de contacto"
          name="companyContactNumber"
          value={formData.companyContactNumber}
          onChange={handleChange}
          fullWidth
          error={!!errors.companyContactNumber}
          helperText={errors.companyContactNumber}
        />
        <TextField
          label="Urgencia"
          name="urgency"
          select
          value={formData.urgency}
          onChange={handleChange}
          fullWidth
          error={!!errors.urgency}
          helperText={errors.urgency}
        >
          {urgencyLevels.map(level => (
            <MenuItem key={level} value={level}>
              {level}
            </MenuItem>
          ))}
        </TextField>

        <FormControl fullWidth error={!!errors.attachment}>
          <Input
            inputRef={fileInputRef}
            type="file"
            name="attachment"
            onChange={handleFileChange}
            inputProps={{ accept: 'application/pdf, image/*' }}
          />
          {errors.attachment && (
            <FormHelperText>{errors.attachment}</FormHelperText>
          )}
        </FormControl>

        <Button type="submit" variant="contained">
          Enviar Reporte
        </Button>
      </Box>
    </Paper>
    </>
  );
}

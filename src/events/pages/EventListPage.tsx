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
import { EventDataInterface } from '../../shared/interfaces/events/CurrentEventResponseinterface';
import { getAllEventsService } from './service/GetallEventsService';
import { updateEventsService } from './service/UpdateEventService';

export default function EventListPage() {
  const [events, setEvents] = useState<EventDataInterface[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventDataInterface | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error' as 'error' | 'success',
  });

  const handleEditClick = (event: EventDataInterface) => {
    setSelectedEvent(event);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSelectedEvent((prev) =>
      prev
        ? {
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
          }
        : prev
    );
  };

  const handleSave = async() => {
    if (selectedEvent) {
       try {
              const response = await updateEventsService(selectedEvent.id, selectedEvent);
              if (response.ok) {
                setEvents((prev) =>
                  prev.map((e) => (e.id === selectedEvent.id ? selectedEvent : e))
                );  
                setSnackbar({
                  open: true,
                  message: 'Evento actualizado exitosamente',
                  severity: 'success',
                });
                setSelectedEvent(null);         
              }else{
                setSnackbar({
                  open: true,
                  message: 'Error al editar el evento: ' + response.message,
                  severity: 'error',
                });
              }
            } catch (error) {
              console.log('Error al editar el evento:', error);        
              setSnackbar({
                open: true,
                message: 'Algo salió mal al editar el evento.',
                severity: 'error',
              });
            }      
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
        try {            
            const response = await getAllEventsService();                    
            if (response.ok) {
              setEvents(response.data);
            } else {
              console.error('Error al obtener eventos', response.message);
              setSnackbar({
                open: true,
                message: 'Error al obtener eventos: ' + response.message,
                severity: 'error',
              });
            }
        } catch (error) {    
            console.error('Error al obtener eventos:', error);        
            setSnackbar({
              open: true,
              message: 'Error al obtener eventos',
              severity: 'error',
            });
        }
    };

    fetchEvents();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <CustomSnackBar
        open={snackbar.open}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        message={snackbar.message}
        severity={snackbar.severity}
      />

      {selectedEvent && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6">Editar Evento</Typography>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <TextField
              label="Nombre"
              name="name"
              value={selectedEvent.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Descripción"
              name="description"
              value={selectedEvent.description}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={3}
            />
            <TextField
              label="Fecha Inicio"
              name="startDate"
              type="date"
              value={selectedEvent.startDate}
              onChange={handleChange}
              fullWidth
              slotProps={{inputLabel: {shrink: true}}}
            />
            <TextField
              label="Fecha Fin"
              name="endDate"
              type="date"
              value={selectedEvent.endDate}
              onChange={handleChange}
              fullWidth
              slotProps={{inputLabel: {shrink: true}}}
            />            
            <Box>
              <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
                Guardar
              </Button>
              <Button onClick={() => setSelectedEvent(null)} variant="outlined">
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      <Typography variant="h4" gutterBottom>
        Lista de Eventos
      </Typography>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Inicio</TableCell>
              <TableCell>Fin</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.name}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.startDate}</TableCell>
                <TableCell>{event.endDate}</TableCell>
                <TableCell>{event.active ? 'Sí' : 'No'}</TableCell>
                <TableCell>
                  {selectedEvent?.id === event.id ? (
                    <Button onClick={() => setSelectedEvent(null)} variant="outlined">
                      Cancelar
                    </Button>
                  ) : (
                    <Button onClick={() => handleEditClick(event)} variant="contained">
                      Editar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

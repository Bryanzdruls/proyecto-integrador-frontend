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
import { getAllUsersService } from '../services/GetAllUsersServices';
import { UserInterface } from '../../shared/interfaces/UserInterface';
import CustomSnackBar from '../../shared/modals/CustomSnackBar';
import { updateUsersService } from '../services/UpdateUserService';

export default function UserListPage() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInterface | null>(null);
  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'error' as 'error' | 'success',
    });
  const handleEditClick = (user: UserInterface) => {
    setSelectedUser(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSave = async() => {
    if (selectedUser) {
      try {
        const response = await updateUsersService(selectedUser.idUser, selectedUser);
        if (response.ok) {
          setUsers((prev) =>
            prev.map((u) => (u.idUser === selectedUser.idUser ? selectedUser : u))
          );      
          setSelectedUser(null);
          setSnackbar({
            open: true,
            message: 'Usuario editado correctamente',
            severity: 'success',
          });          
        }else{
          setSnackbar({
            open: true,
            message: 'Error al editar el usuario: ' + response.message,
            severity: 'error',
          });
        }
      } catch (error) {
        console.log('Error al editar el usuario:', error);        
        setSnackbar({
          open: true,
          message: 'Algo salió mal al editar el usuario.',
          severity: 'error',
        });
      }   
    }   
  };

  useEffect(() => {
    const fetchUser = async () => {
          try {
            const response = await getAllUsersService();
            if (response.ok) {
              const userData = response.data;
              setUsers(userData);
            } else {
              console.error('Error al obtener los usuarios', response.message);
              setSnackbar({
                open: true,
                message: 'Error al obtener los usuarios: ' + response.message,
                severity: 'error',
              });
            }
          } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            setSnackbar({
              open: true,
              message: 'Error al obtener los usuarios',
              severity: 'error',
            });
          }
        };
      
        fetchUser();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <CustomSnackBar
            open={snackbar.open}
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            message={snackbar.message}
            severity={snackbar.severity}
          /> 
            {selectedUser && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Editar Usuario</Typography>
          <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
            <TextField
              label="Nombre"
              name="name"
              value={selectedUser.name}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Email"
              name="email"
              value={selectedUser.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Puntaje"
              name="score"
              value={selectedUser.score}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Rol de usuario"
              name="role"
              value={selectedUser.role}
              onChange={handleChange}
              fullWidth
            />
            <Box>
              <Button onClick={handleSave} variant="contained" sx={{ mr: 2 }}>
                Guardar
              </Button>
              <Button onClick={() => setSelectedUser(null)} variant="outlined">
                Cancelar
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
      <Typography variant="h4" gutterBottom>
        Lista de Usuarios
      </Typography>

      <Paper sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Puntaje</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.idUser}>
                <TableCell>{user.name ?? 'No registra'}</TableCell>
                <TableCell>{user.email ?? 'No registra'}</TableCell>
                <TableCell>{user.score ?? 'No registra'}</TableCell>
                <TableCell>{user.role ?? 'No registra'}</TableCell>
                <TableCell>
                  {
                    selectedUser ? 
                    (
                      <Button onClick={() => setSelectedUser(null)} variant="outlined">
                        Cancelar
                      </Button>
                    ):
                    (
                      <Button onClick={() => handleEditClick(user)} variant="contained">
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

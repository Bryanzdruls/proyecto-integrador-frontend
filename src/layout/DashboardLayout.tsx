import { AppProvider, AppTheme, Router } from '@toolpad/core/AppProvider';
import { extendTheme,  } from '@mui/material/styles';
import { DashboardLayout } from '@toolpad/core';
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router';
import React, { useState } from 'react';
import { PageContainer } from '@toolpad/core/PageContainer';
import { getCurrentEventService } from './services/LoadCurrentEventService';
import { EventDataInterface } from '../shared/interfaces/events/CurrentEventResponseinterface';
import CustomSnackBar from '../shared/modals/CustomSnackBar';
import { getNavigationByRoleService } from './services/GetNavigationByRoleService';

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(): Router {
    const navigate = useNavigate();
    const location = useLocation();
  
    const router = React.useMemo(() => ({
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => navigate(String('/dashboard'+path)),
    }), [location, navigate]);
  
    return router;
  }


export default function DashboardLayoutBasic() {
  const router = useDemoRouter();
  const navigate = useNavigate();
  const { role } = useOutletContext<{role:'string'}>();
  const [event, setEvent] = useState<EventDataInterface | null>(null)
  const [snackbar, setSnackbar] = useState({
      open: false,
      message: '',
      severity: 'error' as 'error' | 'success',
      vertical: 'top' as 'top' | 'bottom',
      horizontal: 'center' as 'left' | 'center' | 'right',
    });
  const [session, setSession] = React.useState<any>({
    user: {
      name: 'Usuario',
      email: "whatever",
      image: 'https://avatars.githubusercontent.com/u/19550456',
    },
  });


  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getCurrentEventService();        
        const event = response.data;
        setEvent(event);
        if (event.active) {
          const mensaje = `${event.active && '¡Activo!'} "${event.name}". ${event.description} Vigente del ${event.startDate} al ${event.endDate}.`;
          setSnackbar({
            open: true,
            message: mensaje,
            severity: 'success',
            vertical: 'top',
            horizontal: 'center',
          });
        }else{
          setSnackbar({
            open: true,
            message: "No hay eventos activos.",
            severity: 'error',
            vertical: 'top',
            horizontal: 'center',
          });
        }        
      } catch (error) {
        console.error('Error al obtener eventos:', error);
        setSnackbar({
          open: true,
          message: 'Error al obtener eventos.',
          severity: 'error',
          vertical: 'top',
          horizontal: 'center',
        });
      }
    };

    fetchEvents();
  }, []);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {       
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem('session');
        localStorage.removeItem('token');
        navigate('/auth/login');
      },
    };
  }, []);
  return (
    <AppProvider
      navigation={getNavigationByRoleService(role)}
      router={router}
      theme={demoTheme as AppTheme}
      branding={{
        title: 'Cultura Ambiental Poli',
        homeUrl: '/reports',
      }}
      session={session}
      authentication={authentication}
    >        
      <CustomSnackBar
            open={snackbar.open}
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            message={snackbar.message}
            severity={snackbar.severity}
            vertical={snackbar.vertical}
            horizontal={snackbar.horizontal}
        />  
      <DashboardLayout>
        <PageContainer >        
          <Outlet context={event}/>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

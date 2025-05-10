import { Description, Event, Person2Rounded, Report } from "@mui/icons-material";
import { Navigation } from "@toolpad/core";

export function getNavigationByRoleService(role: string): Navigation {
    const baseNav: Navigation = [
      {
        kind: 'header',
        title: 'Acciones',
      },
      {
        segment: 'reports',
        title: 'Creacion de Reporte',
        icon: <Report />,    
      },
      {
        kind: 'divider',
      },
    ];
  
    const adminNav: Navigation = [
      {
        kind: 'header',
        title: 'Administrative',
      },  
      {
        segment: 'Users',
        title: 'Gestión de Usuarios',
        icon: <Person2Rounded />,
      },
      {
        segment: 'manage-reports',
        title: 'Gestión de Reportes',
        icon: <Description />,
      },
      {
        segment: 'Events',
        title: 'Gestión de Eventos',
        icon: <Event />,
      },
    ];
  
    return role.toUpperCase() === 'ADMIN' ? [...baseNav, ...adminNav] : baseNav;
  }
  
// src/shared/modals/CustomSnackBar.tsx
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

const SlideTransition = (props: any) => {
  return <Slide {...props} direction="left" />;
};

export default function CustomSnackBar({
  open,
  onClose,
  message,
  severity = 'info',
  vertical= 'bottom',
  horizontal = 'right',
}: {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: 'success' | 'error' | 'info' | 'warning';
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={7000}
      onClose={onClose}
      
      slots={{transition: SlideTransition}}
      anchorOrigin={{  vertical, horizontal }}
    >
      <MuiAlert 
        elevation={6} 
        variant="filled" 
        severity={severity}
        sx={{
          fontSize: '1.2rem',
          padding: '16px 24px',
          borderRadius: '8px',
        }}
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

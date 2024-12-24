import { Alert } from '@mui/material';

const ErrorAlert = ({ open, message }) => {
   if (!open) return null;

   return (
      <Alert variant="outlined" severity="warning">
         {message}
      </Alert>
   );
};

export default ErrorAlert;

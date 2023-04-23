import { AlertColor, Snackbar, Alert } from "@mui/material";
import { createContext, useState, useContext } from "react";

class Snack {
    message?: string;
    color?: AlertColor;
    autoHideDuration?: number;
    open: boolean;
  
    constructor(data: Snack) {
      this.message = data.message || '';
      this.color = data.color || 'info';
      this.autoHideDuration = data.autoHideDuration || 3000;
      this.open = data.open;
    }
  }
  
  export {Snack};
  
  type SnackDefaultValue = {
    snack: Snack,
    setSnack: React.Dispatch<React.SetStateAction<Snack>>
  };
  
  export const SnackbarContext = createContext<SnackDefaultValue>({snack: new Snack({open: false}), setSnack: () => {}});
  
  const SomeComponent: React.FC = (props) => {
    const [snack, setSnack] = useState(new Snack({open: false}));
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setSnack(new Snack({color: snack.color, open:false}));
    };
  
    return (
      <SnackbarContext.Provider value={{snack, setSnack}}>
        {/*Other components*/}
        <Snackbar open={snack.open} autoHideDuration={snack.autoHideDuration} onClose={handleClose}>
          <Alert severity={snack.color}>
            {snack.message || ''}
          </Alert>
        </Snackbar>
      </SnackbarContext.Provider>
    );
  }
  
  function someChildComponent() {
    const {snack, setSnack} = useContext(SnackbarContext);
  
    // Some event
    setSnack(new Snack({message: 'Some message', color:'success', autoHideDuration:1500, open: true}))
  }
    
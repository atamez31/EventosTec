import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "./form";

export default class FormDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    // if (this.validateForm()) {
    //     // Create firebase order and redirect to /app/deliver
    //     database.ref(`orders`).push(this.state).then((ref) => {
    //         customHistory.push('/app/deliver');
    //     });

    // } else {
    //     alert('Please check your order, remember that the minimum tip is of $5');
    // }
  };
  handleFormSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    // if (this.validateForm()) {
    //     // Create firebase order and redirect to /app/deliver
    //     database.ref(`orders`).push(this.state).then((ref) => {
    //         customHistory.push('/app/deliver');
    //     });

    // } else {
    //     alert('Please check your order, remember that the minimum tip is of $5');
    // }
  };

  render() {
    return (
      <div>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          Crear Evento
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Crear Evento</DialogTitle>
          <DialogContent>
            <Form submit={this.handleFormSubmit} />
          </DialogContent>
          <DialogActions>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Form from "./form";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
export default class FormDialog extends React.Component {
  state = {
    open: false,
    type: this.props.type,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleFormSubmit = e => {
    e.preventDefault();
  };
  handleFormSubmit = e => {
    e.preventDefault();
  };

  chooseIcon = () => {
    if(this.props.type === "Add") {
      return <AddIcon />
    }
    else {
      return <EditIcon fontSize="small" />;
    }
  }

  render() {
    return (
      <div>
        <Button
          variant={this.props.icon}
          color="primary"
          aria-label={this.props.type}
          onClick={this.handleClickOpen}
        >
          {this.chooseIcon()}
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Crear Evento</DialogTitle>
          <DialogContent>
            <Form
              type={this.props.type}
              row={this.props.row}
              data={this.props.data}
            />
          </DialogContent>
          <DialogActions />
        </Dialog>
      </div>
    );
  }
}

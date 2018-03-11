import React from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ConfirmModal extends React.Component {

  constructor(props) {
      super(props)
      console.log("props: ", props);
      this.state = {
        open: false,
      };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseWithAction = () => {
    //callback for closing the modal
    //TODO: deleting ...
    this.props.onPrimaryAction(() => {
      //TODO: if we use the open false inside here we have
      // an error
    });
    this.setState({ open: false });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {

    return (
      <div>
        <Button onClick={this.handleClickOpen}>Delete</Button>

        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.props.title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {this.props.body}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {this.props.secondaryButtonText}
            </Button>
            <Button onClick={this.handleCloseWithAction} color="primary">
              {this.props.primaryButtonText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmModal;
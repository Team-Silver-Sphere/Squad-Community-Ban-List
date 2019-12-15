import React from 'react';

class AdvancedModal extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isOpen: props.isOpen !== undefined ? props.isOpen : true
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({ isOpen: true });
    if (this.props.onOpen) this.props.onOpen();
  }

  close() {
    this.setState({ isOpen: false });
    if (this.props.onClose) this.props.onClose();
  }

  render() {
    return (
      <>
        {this.props.children({
          isOpen: this.state.isOpen,
          open: this.open,
          close: this.close
        })}
      </>
    );
  }
}

export default AdvancedModal;

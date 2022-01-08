import React from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = ({ openModal, closeModal }) => {
  return (
    <Modal basic open={openModal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input fluid label="File Types: jpg, png" name="file" type="file" />
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted>
          <Icon name="checkmark" /> Send
        </Button>
        <Button color="red" inverted onClick={closeModal}>
          <Icon name="remove" /> Cancel
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default FileModal;

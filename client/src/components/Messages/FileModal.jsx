import React, { useState } from "react";
import { Modal, Input, Button, Icon } from "semantic-ui-react";

const FileModal = ({ openModal, closeModal, sendPicture }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const authorized = ["image/jpeg", "image/png"];

  const addFile = (e) => {
    setError("");
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      if (!authorized.includes(uploadedFile.type)) {
        setError("File must be an image (png, jpg)");
      }
    }
  };

  const sendFile = () => {
    if (file && !error) {
      sendPicture(file);
      setFile(null);
      closeModal();
    }
  };
  return (
    <Modal basic open={openModal} onClose={closeModal}>
      <Modal.Header>Select an Image File</Modal.Header>
      <Modal.Content>
        <Input
          onChange={addFile}
          fluid
          label="File Types: jpg, png"
          name="file"
          type="file"
        />

        <p>{error}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={sendFile} color="green" inverted>
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

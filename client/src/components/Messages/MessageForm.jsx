import React, { useState } from "react";
import { Segment, Button, Input, Form } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateChannelMessages,
  updateChannelImage,
} from "../../redux/channel/channel-actions";
import FileModal from "./FileModal";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const currentChannel = useSelector((state) => state.channel.current);
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();

  const sendMessage = () => {
    if (message) {
      dispatch(
        updateChannelMessages(currentChannel._id, {
          content: message,
          user: user._id,
        })
      );
      setMessage("");
    }
  };

  const sendPicture = (file) => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("user", user._id);
    dispatch(updateChannelImage(currentChannel._id, formData));
  };

  return (
    <Segment className="message__form">
      <Form onSubmit={sendMessage}>
        <Input
          fluid
          value={message}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          style={{ marginBottom: "0.7em" }}
          label={<Button icon="add" />}
          labelPosition="left"
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={sendMessage}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            onClick={() => setOpenModal(true)}
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
          <FileModal
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            sendPicture={sendPicture}
          />
        </Button.Group>
      </Form>
    </Segment>
  );
};

export default MessageForm;

import React, { useState } from "react";
import { Segment, Button, Input } from "semantic-ui-react";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (message) {
      
    }
  };

  return (
    <Segment className="message__form">
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
          content="Upload Media"
          labelPosition="right"
          icon="cloud upload"
        />
      </Button.Group>
    </Segment>
  );
};

export default MessageForm;

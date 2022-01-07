import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import { useSelector } from "react-redux";

const Messages = () => {
  const messages = useSelector(
    (state) => state.channel.current && state.channel.current.messages
  );
  return (
    <div>
      <MessagesHeader />
      <Segment>
        <Comment.Group className="messages">
          {messages &&
            messages.map((message) => (
              <Message
                key={message._id}
                content={message.content}
                user={message.user}
                timestamp={message.createdAt}
              />
            ))}
        </Comment.Group>
      </Segment>

      <MessageForm />
    </div>
  );
};

export default Messages;

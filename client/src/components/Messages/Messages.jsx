import React, { useEffect } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { updateChannel } from "../../redux/channel/channel-actions";

const Messages = () => {
  const messages = useSelector(
    (state) => state.channel.current && state.channel.current.messages
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let socket = io("/");

    socket.on("message recieved", (channel) => {
      dispatch(updateChannel(channel));
    });

    return () => {
      socket.disconnect();
    };
  });
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

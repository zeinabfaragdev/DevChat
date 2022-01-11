import React, { useEffect, useState } from "react";
import { Segment, Comment } from "semantic-ui-react";
import MessageForm from "./MessageForm";
import MessagesHeader from "./MessagesHeader";
import Message from "./Message";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { updateChannel } from "../../redux/channel/channel-actions";

const Messages = () => {
  const messages = useSelector((state) => state.channel.current.messages);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let socket = io("/");

    socket.on("message recieved", (channel) => {
      dispatch(updateChannel(channel));
    });

    return () => {
      socket.disconnect();
    };
  });

  const onSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const regex = new RegExp(searchTerm, "gi");

  const filteredMessages = searchTerm
    ? messages.filter(
        (message) =>
          (message.content && message.content.match(regex)) ||
          message.user.username.match(regex)
      )
    : messages;

  return (
    <div>
      <MessagesHeader
        searchTerm={searchTerm}
        onSearchTermChange={onSearchTermChange}
      />
      <Segment>
        <Comment.Group className="messages">
          {filteredMessages.map((message) => (
            <Message
              key={message._id}
              content={message.content}
              user={message.user}
              timestamp={message.createdAt}
              image={message.image}
            />
          ))}
        </Comment.Group>
      </Segment>

      <MessageForm />
    </div>
  );
};

export default Messages;

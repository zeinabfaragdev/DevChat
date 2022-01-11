import React from "react";
import { Comment, Image } from "semantic-ui-react";
import { useSelector } from "react-redux";
import moment from "moment";

const Message = ({ content, user, timestamp, image }) => {
  const currentUserId = useSelector((state) => state.user.data._id);
  const isOwnMessage = (messageUserId) => {
    return messageUserId === currentUserId ? "message__self" : "";
  };

  const timeFromNow = (time) => {
    return moment(time).fromNow();
  };

  return (
    <Comment>
      <Comment.Avatar src={user.avatar} />
      <Comment.Content className={isOwnMessage(user._id)}>
        <Comment.Author as="a">{user.username}</Comment.Author>
        <Comment.Metadata>{timeFromNow(timestamp)}</Comment.Metadata>
        {image ? (
          <Image src={image} className="message__image" />
        ) : (
          <Comment.Text>{content}</Comment.Text>
        )}
      </Comment.Content>
    </Comment>
  );
};

export default Message;

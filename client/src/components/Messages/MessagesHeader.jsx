import React from "react";
import { Header, Segment, Input, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
const MessagesHeader = () => {
  const currentChannel = useSelector((state) => state.channel.current);
  const messages = useSelector((state) => state.channel.current.messages);

  let uniqueUsers = [...new Set(messages.map((item) => item.user._id))];

  const calcNumUsers = () => {
    if (uniqueUsers.length === 0) {
      return "No Users";
    } else if (uniqueUsers.length === 1) {
      return "1 User";
    } else {
      return `${uniqueUsers.length} Users`;
    }
  };

  return (
    <Segment clearing>
      <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
        <span>
          #{currentChannel.name}
          <Icon name="star outline" color="black" />
        </span>
        <Header.Subheader>{calcNumUsers()}</Header.Subheader>
      </Header>
      <Header floated="right">
        <Input
          size="mini"
          icon="search"
          name="searchTerm"
          placeholder="Search Messages"
        />
      </Header>
    </Segment>
  );
};

export default MessagesHeader;

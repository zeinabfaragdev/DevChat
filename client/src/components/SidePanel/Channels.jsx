import React, { useState, useEffect } from "react";
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addChannelRequest,
  getChannels,
  setCurrentChannel,
} from "../../redux/channel/channel-actions";

const Channels = () => {
  const [channelName, setChannelName] = useState("");
  const [channelDetails, setChannelDetails] = useState("");
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.data._id);
  const channels = useSelector((state) => state.channel.all);
  const currentChannel = useSelector((state) => state.channel.current);

  useEffect(() => {
    dispatch(getChannels());
  }, [dispatch]);

  const handleChannelSubmit = (e) => {
    e.preventDefault();
    let data = {
      name: channelName,
      details: channelDetails,
      createdBy: userId,
    };
    if (channelName && channelDetails) {
      dispatch(addChannelRequest(data));
      setModal(false);
      setError("");
      setChannelName("");
      setChannelDetails("");
    } else {
      setError("Please add both channel name and details");
    }
  };
  return (
    <div>
      <Menu.Menu style={{ paddingBottom: "2em" }}>
        <Menu.Item>
          <span>
            <Icon name="exchange" /> CHANNELS
          </span>{" "}
          ({channels.length}) <Icon name="add" onClick={() => setModal(true)} />
        </Menu.Item>

        {channels.map((channel) => (
          <Menu.Item
            key={channel._id}
            onClick={() => dispatch(setCurrentChannel(channel))}
            name={channel.name}
            style={{ opacity: 0.7 }}
            active={channel._id === currentChannel._id}
          >
            #{channel.name}
          </Menu.Item>
        ))}
      </Menu.Menu>

      <Modal basic open={modal} onClose={() => setModal(false)}>
        <Modal.Header>Add a Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleChannelSubmit}>
            <Form.Field>
              <Input
                fluid
                label="Name of Channel"
                name="channelName"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                required
              />
            </Form.Field>
            <Form.Field>
              <Input
                fluid
                label="About the Channel"
                name="channelDetails"
                value={channelDetails}
                onChange={(e) => setChannelDetails(e.target.value)}
                required
              />
            </Form.Field>
            <button type="submit" style={{ display: "none" }}></button>
          </Form>
          {error && <p> {error}</p>}
        </Modal.Content>

        <Modal.Actions>
          <Button color="green" inverted onClick={handleChannelSubmit}>
            <Icon name="checkmark" /> Add
          </Button>
          <Button color="red" inverted onClick={() => setModal(false)}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default Channels;

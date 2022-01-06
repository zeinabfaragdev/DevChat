import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/user/user-actions";

const UserPanel = () => {
  const username = useSelector((state) => state.user.data.username);
  const avatar = useSelector((state) => state.user.data.avatar);

  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOut());
  };
  const dropDownOptions = () => {
    return [
      {
        key: "user",
        text: (
          <span>
            Signed in as <strong>{username}</strong>
          </span>
        ),
        disabled: true,
      },
      {
        key: "avatar",
        text: <span>Change Avatar</span>,
      },
      {
        key: "signout",
        text: <span onClick={() => handleSignOut()}>Sign Out</span>,
      },
    ];
  };
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          <Header inverted floated="left" as="h2">
            <Icon name="code" />
            <Header.Content>DevChat</Header.Content>
          </Header>
          <Header style={{ padding: "0.25em" }} as="h4" inverted>
            <Dropdown
              trigger={
                <span>
                  <Image src={avatar} spaced="right" avatar />
                  {username}
                </span>
              }
              options={dropDownOptions()}
            ></Dropdown>
          </Header>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};

export default UserPanel;

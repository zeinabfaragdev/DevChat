import React from "react";
import { Grid } from "semantic-ui-react";
import ColorPanel from "../components/ColorPanel";
import SidePanel from "../components/SidePanel";
import Messages from "../components/Messages";
import MetaPanel from "../components/MetaPanel";

const HomePage = () => {
  return (
    <div>
      <Grid columns="equal" className="home" style={{ background: "#eee" }}>
        <ColorPanel />
        <SidePanel />
        <Grid.Column style={{ marginLeft: 320 }}>
          <Messages />
        </Grid.Column>

        <Grid.Column width={4}>
          <MetaPanel />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default HomePage;

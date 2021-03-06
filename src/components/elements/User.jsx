import React from "react";
import { Card, Row, Col, Icon, Typography, Button } from "antd";
import { withRouter } from "react-router-dom";
import { addDoctor } from "../../actions";

const User = ({ profile, history }) => {
  const onAddClick = async () => {
    await addDoctor(profile.user._id);
  };

  return (
    <Card style={{ width: "100%", cursor: "pointer" }}>
      <Row type="flex" align="middle">
        <Col
          span={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Icon type="user" style={{ fontSize: 24 }} />
        </Col>
        <Col span={20}>
          <Row type="flex" justify="space-between">
            <Col span={10}>
              <Typography.Title style={{ fontSize: 24 }}>
                {profile.user.name}
              </Typography.Title>
            </Col>
            <Col span={10} style={{ textAlign: "right" }}>
              <Typography.Text style={{ fontSize: 16 }}>
                @{profile.handle}
              </Typography.Text>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={5} style={{ textTransform: "capitalize" }}>
              {profile.identity}
            </Col>
            <Col>
              <Button type="primary" onClick={onAddClick}>
                Add
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default withRouter(User);

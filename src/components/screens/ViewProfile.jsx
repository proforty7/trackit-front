import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Card,
  Button,
  message,
  Icon,
  Badge,
  Tag,
  Divider,
  Collapse
} from "antd";
import Container from "../elements/Container";
import { getProfile } from "../../actions";

const ViewProfile = props => {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState(null);
  const id = props.match.params.userId || props.id;

  const currentUser = id === props.user._id ? true : false;

  useEffect(() => {
    const fetchData = async () => {
      let response = await getProfile(id);
      setProfile(response.data);
    };
    fetchData();
  }, [id, currentUser]);

  return (
    <Container>
      {!profile ? (
        <Card loading />
      ) : (
        <Card>
          <Row type="flex" align="middle">
            <Col span={24}>
              <div
                style={{
                  textAlign: "center"
                }}
              >
                <Avatar icon="user" size={160} />
              </div>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <h1>{profile.user.name}</h1>
                </Col>
              </Row>
              <div style={{ fontSize: 20 }}>@{profile.handle}</div>
              <Divider />
              <div>{profile.bio}</div>
            </Col>
          </Row>
          <Row type="flex" justify="space-between" style={{ marginTop: 30 }}>
            <Col span={11}>
              <Badge
                status="processing"
                text={
                  <span style={{ fontSize: 20 }}>
                    <span style={{ fontWeight: "bold" }}>Gender: </span>
                    <span style={{ textTransform: "capitalize" }}>
                      {profile.gender}
                    </span>
                  </span>
                }
              />
            </Col>
            <Col span={11}>
              {profile.age ? (
                <Badge
                  status="processing"
                  text={
                    <span style={{ fontSize: 20 }}>
                      <span style={{ fontWeight: "bold" }}>
                        <Icon type="age" />
                      </span>
                      <span>Age: {profile.age}</span>
                    </span>
                  }
                />
              ) : null}
            </Col>
            <Col span={24} style={{ marginTop: 20, marginBottom: 20 }}>
              <Badge
                status="processing"
                text={
                  <span style={{ fontSize: 20 }}>
                    <span style={{ fontWeight: "bold" }}>Issues: </span>
                    <span>
                      {profile.issues.map((issue, idx) => (
                        <Tag
                          color="blue"
                          style={{
                            fontSize: 16,
                            padding: 7,
                            borderRadius: 25
                          }}
                          key={idx}
                        >
                          {issue}
                        </Tag>
                      ))}
                    </span>
                  </span>
                }
              />
            </Col>
            <Col span={24}>
              <Badge
                status="processing"
                text={
                  <span style={{ fontSize: 20 }}>
                    <span style={{ fontWeight: "bold" }}>From: </span>
                    <span>{profile.location}</span>
                  </span>
                }
              />
            </Col>
          </Row>
        </Card>
      )}
    </Container>
  );
};

export default withRouter(ViewProfile);

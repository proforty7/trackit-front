import React from "react";
import _ from "lodash";
import {
  Row,
  Col,
  Avatar,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Select,
  message,
  Icon
} from "antd";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "../elements/Container";
import { LOCATIONS } from "../../utils";
import { createProfile } from "../../actions";

const CreateProfile = ({ form, history }) => {
  const user = useSelector(state => state.auth.user);

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields(async (err, formProps) => {
      if (!err) {
        const data = _.pickBy(formProps, _.identity);
        try {
          await createProfile(data);
          message.success("Profile updated successfully");
          return history.push("/dashboard");
        } catch (err) {
          if (err.response.status === 400) {
            message.error("Username already taken");
          } else {
            message.error("Internal server error");
          }
        }
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
    <Container>
      <Card>
        <Form onSubmit={onSubmit}>
          <Typography.Title>{user.name}</Typography.Title>
          <Form.Item>
            {getFieldDecorator("bio")(
              <Input.TextArea
                placeholder="Add any previous treatments, prescriptions (if any)"
                rows={5}
              />
            )}
          </Form.Item>

          <Row type="flex" justify="space-between">
            <Col span={11}>
              <Form.Item>
                {getFieldDecorator("handle", {
                  rules: [{ required: true, message: "Username is required" }]
                })(
                  <Input
                    addonBefore={<Icon type="user" />}
                    size="large"
                    placeholder="Set username/handle"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item>
                {getFieldDecorator("location")(
                  <Select size="large" placeholder="Select your location">
                    {LOCATIONS.map(location => (
                      <Select.Option key={location} value={location}>
                        {location}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row type="flex" justify="space-between">
            <Col span={7}>
              <Form.Item>
                {getFieldDecorator("identity", {
                  rules: [{ required: true, message: "Identity is required" }]
                })(
                  <Select size="large" placeholder="Select an identity">
                    <Select.Option key="doctor" value="doctor">
                      Doctor
                    </Select.Option>
                    <Select.Option key="patient" value="patient">
                      Patient
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item>
                {getFieldDecorator("age")(
                  <Input
                    addonBefore={<Icon type="age" />}
                    size="large"
                    placeholder="Enter your age"
                    type="number"
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item>
                {getFieldDecorator("gender", {
                  rules: [{ required: true, message: "Gender is required" }]
                })(
                  <Select size="large" placeholder="Select a gender">
                    <Select.Option key="male" value="male">
                      Male
                    </Select.Option>
                    <Select.Option key="female" value="female">
                      Female
                    </Select.Option>
                    <Select.Option key="other" value="other">
                      Other
                    </Select.Option>
                  </Select>
                )}
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                {getFieldDecorator("issues", {
                  rules: [
                    { required: true, message: "Atleast one issue is required" }
                  ]
                })(
                  <Input
                    size="large"
                    placeholder="Add issues (separated by commas) "
                  />
                )}
              </Form.Item>
            </Col>

            <Button
              htmlType="submit"
              type="primary"
              shape="round"
              size="large"
              style={{ marginTop: 25 }}
            >
              Create Profile
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
};

export default withRouter(Form.create()(CreateProfile));

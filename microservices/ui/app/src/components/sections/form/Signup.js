import React, { Component } from "react";
import "antd/dist/antd.css";
import axios from "axios";

import "./Signup.css";
import { Form, Icon, Input, Button, Checkbox, DatePicker } from "antd";
const FormItem = Form.Item;

class Signup extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const values = {
          ...fieldsValue,
          dob: fieldsValue["date-picker"].format("YYYY-MM-DD")
        };
        delete values["date-picker"];
        // Update the first parameter of axios.post() with the webhook URL of our cluster
        axios.post('https://app.asthmatic70.hasura-app.io/signup', JSON.stringify(values)).then(response => {            alert("The server says: " + JSON.stringify(response));
      });       
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
<div>
      <Form onSubmit={this.handleSubmit} className="signup-form">
        <FormItem>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Please input your Name!" }]
          })(<Input placeholder="Your name" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input your username!" }]
          })(<Input placeholder="Username" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("email", {
            rules: [
              {
                type: "email",
                message: "The input is not valid E-mail!"
              },
              {
                required: true,
                message: "Please input your E-mail!"
              }
            ]
          })(<Input placeholder="Email" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(<Input type="password" placeholder="Password" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("date-picker", {
            rules: [
              { type: "object", required: true, message: "Please select date!" }
            ]
          })(<DatePicker placeholder="Select DOB" className="date-picker" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("city", {
            rules: [{ required: true, message: "Please enter your city!" }]
          })(<Input type="text" placeholder="City" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator("phone", {
            rules: [
              { required: true, message: "Please input your Contact no!" }
            ]
          })(<Input type="tel" placeholder="Phone" />)}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            Register
          </Button>
          Or <a href="">Sign in</a>
        </FormItem>
      </Form>
      <div id="response"></div>
</div>
    );
  }
}

const Sign_up = Form.create()(Signup);

export default Sign_up;

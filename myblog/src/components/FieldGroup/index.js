import React from "react";

import { Col, Form, Input } from "antd";
// import { FormattedMessage } from "react-intl";

const FormItem = Form.Item;

const view = ({ label, labelColor, help, validateStatus, ...props }) => {
  return (
    <FormItem
      style={{ color: labelColor }}
      validateStatus={validateStatus}
      label={label}
      help={help}
    >
      <Col sm={24}>
        <Input {...props} />
      </Col>
    </FormItem>
  );
};

export { view };

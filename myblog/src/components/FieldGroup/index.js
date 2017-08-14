import React from 'react';

import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';

const view = ({label, help, validationState, ...props}) => {
  return (
    <FormGroup
      validationState={validationState}
    >
      <Col sm={12}>
        <ControlLabel>{label}</ControlLabel>
      </Col>
      <Col sm={6}>
        <FormControl {...props} />
      </Col>
      <Col sm={12}>
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>

    </FormGroup>
  );
}

export { view };

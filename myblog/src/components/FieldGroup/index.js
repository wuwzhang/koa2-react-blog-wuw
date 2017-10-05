import React from 'react';

import {
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Col
} from 'react-bootstrap';

import { FormattedMessage } from 'react-intl';

const view = ({label, labelColor, defaultMessage, help, validationState, ...props}) => {
  return (
    <FormGroup
      style={{color: labelColor}}
      validationState={validationState}
    >
      <Col sm={12}>
        <ControlLabel>
          <FormattedMessage
            id={label}
            defaultMessage={defaultMessage}
          />
        </ControlLabel>
      </Col>
      <Col sm={12}>
        <FormControl {...props} />
      </Col>
      <Col sm={12}>
        {help && <HelpBlock>{help}</HelpBlock>}
      </Col>

    </FormGroup>
  );
}

export { view };

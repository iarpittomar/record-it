import { Alert, AlertIcon } from '@chakra-ui/core';
import React, { FC } from 'react';

const Warning = () => {
  return (
    <div>
      <Alert onClick={showVideo} status="warning">
        <AlertIcon />
        There is some problem with the deployment.
      </Alert>
    </div>
  );
};

const showVideo = () => {
  return <div>I am here</div>;
};

export default Warning;

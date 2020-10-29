import { Button, Flex, PseudoBox } from '@chakra-ui/core';
import React from 'react';

const Recorder = () => {
  return (
    <Flex align="center" justify="center" m="60px 0 40px">
      <Button
        size="md"
        height="60px"
        width="60px"
        bg="#e3f6f5"
        cursor="pointer"
        borderRadius="50%"
        border="0"
      >
        <PseudoBox
          bg="#f25042"
          borderRadius="50%"
          display="inline-block"
          height="24px"
          verticalAlign="middle"
          width="24px"
          transition="all 0.3s ease-out"
        ></PseudoBox>
      </Button>
      <PseudoBox m="0 0 0 15px" textAlign="center" width="80px">
        00:00:00
      </PseudoBox>
    </Flex>

    // .recorder-counter {
    //     margin: 0 0 0 15px;
    //     text-align: center;
    //     width: 80px;
    //     opacity: 0.5;
    //     transition: opacity 0.3s ease-out;
    //   }
  );
};

export default Recorder;

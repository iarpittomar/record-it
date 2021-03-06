import { Box, Button, Flex, PseudoBox } from '@chakra-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  start,
  stop,
  selectorDateStart,
  pause,
  selectorCount,
} from '../../redux/recorder.reducer';
import { createUserEvent } from '../../redux/user-events.reducer';
import { MdPlayArrow, MdPause } from 'react-icons/md';

const addZero = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const Recorder = () => {
  const dispatch = useDispatch();
  const dateStart = useSelector(selectorDateStart);
  const countFromState = useSelector(selectorCount);
  const started = dateStart !== '';
  let interval = useRef<number>(0);
  let [count, setCount] = useState<number>(countFromState);
  const [isPaused, setPause] = useState<Boolean>(false);

  const handleClick = () => {
    if (started) {
      window.clearInterval(interval.current);
      dispatch(createUserEvent());
      setPause(false);
      dispatch(stop());
    } else {
      dispatch(start());
      setPause(true);
      interval.current = window.setInterval(() => {
        setCount((count) => count + 1);
      }, 1000);
    }
  };

  const handlePause = () => {
    let lastCount = count;
    if (!!isPaused) {
      setPause(false);
      window.clearInterval(interval.current);
    } else {
      setPause(true);
      dispatch(start());
      interval.current = window.setInterval(() => {
        lastCount = lastCount + 1;
        setCount(lastCount);
      }, 1000);
    }
  };

  useEffect(() => {
    return () => {
      window.clearInterval(interval.current);
    };
  }, []);

  let seconds = started
    ? Math.floor((Date.now() - new Date(dateStart).getTime()) / 1000)
    : 0;

  const hours = seconds ? Math.floor(seconds / 60 / 60) : 0;
  seconds = seconds - hours * 60 * 60;
  const minutes = seconds ? Math.floor(seconds / 60) : 0;
  seconds = seconds - minutes * 60;

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
        onClick={handleClick}
      >
        <PseudoBox
          bg="#f25042"
          borderRadius={started ? '0' : '50%'}
          display="inline-block"
          height={started ? '22px' : '24px'}
          verticalAlign="middle"
          width={started ? '22px' : '24px'}
          transition="all 0.3s ease-out"
        ></PseudoBox>
      </Button>
      <Button
        size="md"
        height="60px"
        width="60px"
        bg="#e3f6f5"
        ml="10px"
        cursor="pointer"
        borderRadius="50%"
        border="0"
        onClick={handlePause}
      >
        {!isPaused ? (
          <Box as={MdPlayArrow} size="40px" color="green.400"></Box>
        ) : (
          <Box as={MdPause} size="40px" color="red.400"></Box>
        )}
      </Button>
      <PseudoBox m="0 0 0 15px" textAlign="center" width="80px">
        {addZero(hours)}:{addZero(minutes)}:{addZero(seconds)}
      </PseudoBox>
    </Flex>
  );
};

export default Recorder;

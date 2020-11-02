import React, { useEffect } from 'react';
import { Button, Flex, PseudoBox, Text } from '@chakra-ui/core';
import { RootState } from '../../redux/store';
import {
  selectUserEventsArray,
  loadUserEvents,
  IUserEvent,
} from '../../redux/user-events.reducer';
import { connect, ConnectedProps } from 'react-redux';
import { addZero } from '../../lib/utils';
import { create } from 'domain';

const mapState = (state: RootState) => ({
  events: selectUserEventsArray(state),
});

const mapDispatch = {
  loadUserEvents,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface IProps extends PropsFromRedux {}

const createDateKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  return `${addZero(year)}-${addZero(month)}-${addZero(day)}`;
};

const groupEventsByDay = (events: IUserEvent[]) => {
  const groups: Record<string, IUserEvent[]> = {};

  const addToGroup = (dateKey: string, event: IUserEvent) => {
    if (groups[dateKey] === undefined) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(event);
  };

  events.forEach((event) => {
    const dateStartKey = createDateKey(new Date(event.dateStart));
    const dateEndKey = createDateKey(new Date(event.dateEnd));

    addToGroup(dateStartKey, event);

    if (dateEndKey !== dateStartKey) {
      addToGroup(dateStartKey, event);
    }
  });

  return groups;
};

const Calendar: React.FC<IProps> = ({ events, loadUserEvents }) => {
  useEffect(() => {
    loadUserEvents();
  }, []);

  let groupedEvents: ReturnType<typeof groupEventsByDay> | undefined;

  let sortedGroupKeys: string[] | undefined;

  if (events.length) {
    groupedEvents = groupEventsByDay(events);
    sortedGroupKeys = Object.keys(groupedEvents).sort(
      (date1, date2) => +new Date(date2) - +new Date(date1)
    );
  }
  // return groupedEvents && sortedGroupKeys ? (
  //   <Flex direction="row-reverse" m="0 15px" p="20px 0" overflowX="auto">
  //     {sortedGroupKeys.map((dayKey) => {
  //       const events = groupedEvents![dayKey];
  //       const groupDate = new Date(dayKey);
  //       const day = groupDate.getDate();
  //       const month = groupDate.toLocaleString(undefined, { month: 'long' });
  //       return (
  //         <PseudoBox flex="0 0 300px" p="0 20px">
  //           <PseudoBox fontSize="16px" m="0 0 15px" textAlign="center">
  //             <Text
  //               bg="#bae8e8"
  //               borderRadius="4px"
  //               color="#272343"
  //               display="inline-block"
  //               fontWeight="bold"
  //               p="4px 8px"
  //             >
  //               {day} {month}
  //             </Text>
  //           </PseudoBox>
  //           <PseudoBox>
  //             {events.map((event) => {
  //               return (
  //                 <Flex
  //                   key={event.id}
  //                   justify="space-between"
  //                   flexWrap="wrap"
  //                   m="0 0 10px"
  //                   p="8px 14px"
  //                   align="flex-start"
  //                   bg="#e3f6f5"
  //                   borderRadius="4px"
  //                 >
  //                   <PseudoBox flex="1 64%" lineHeight="23px">
  //                     <Text fontSize="0.8em">10:00 - 12:00</Text>
  //                     <Text>{event.title}</Text>
  //                   </PseudoBox>
  //                   <Button
  //                     appearance="none"
  //                     bg="none"
  //                     border="0"
  //                     cursor="pointer"
  //                     flexShrink="initial"
  //                     height="23px"
  //                     fontSize="18px"
  //                     lineHeight="20px"
  //                     m="0 0 0 10px"
  //                     p="0"
  //                     width="23px"
  //                   >
  //                     &times;
  //                   </Button>
  //                 </Flex>
  //               );
  //             })}
  //           </PseudoBox>
  //         </PseudoBox>
  //       );
  //     })}
  //   </Flex>
  // ) : (
  //   <p>Loading...</p>
  // );
  return (
    <Flex direction="row-reverse" m="0 15px" p="20px 0" overflowX="auto">
      <PseudoBox flex="0 0 300px" p="0 20px">
        <PseudoBox fontSize="16px" m="0 0 15px" textAlign="center">
          <Text
            bg="#bae8e8"
            borderRadius="4px"
            color="#272343"
            display="inline-block"
            fontWeight="bold"
            p="4px 8px"
          >
            16 Nov
          </Text>
        </PseudoBox>
        <PseudoBox>
          <Flex
            justify="space-between"
            flexWrap="wrap"
            m="0 0 10px"
            p="8px 14px"
            align="flex-start"
            bg="#e3f6f5"
            borderRadius="4px"
          >
            <PseudoBox flex="1 64%" lineHeight="23px">
              <Text fontSize="0.8em">10:00 - 12:00</Text>
              <Text>Water the plants</Text>
            </PseudoBox>
            <Button
              appearance="none"
              bg="none"
              border="0"
              cursor="pointer"
              flexShrink="initial"
              height="23px"
              fontSize="18px"
              lineHeight="20px"
              m="0 0 0 10px"
              p="0"
              width="23px"
            >
              &times;
            </Button>
          </Flex>
        </PseudoBox>
      </PseudoBox>

      <PseudoBox flex="0 0 300px" p="0 20px">
        <PseudoBox fontSize="16px" m="0 0 15px" textAlign="center">
          <Text
            bg="#bae8e8"
            borderRadius="4px"
            color="#272343"
            display="inline-block"
            fontWeight="bold"
            p="4px 8px"
          >
            14 Nov
          </Text>
        </PseudoBox>
        <PseudoBox>
          <Flex
            justify="space-between"
            flexWrap="wrap"
            m="0 0 10px"
            p="8px 14px"
            align="flex-start"
            bg="#e3f6f5"
            borderRadius="4px"
          >
            <PseudoBox flex="1 64%" lineHeight="23px">
              <Text fontSize="0.8em">10:00 - 12:00</Text>
              <Text>Birthday Party</Text>
            </PseudoBox>
            <Button
              appearance="none"
              bg="none"
              border="0"
              cursor="pointer"
              flexShrink="initial"
              height="23px"
              fontSize="18px"
              lineHeight="20px"
              m="0 0 0 10px"
              p="0"
              width="23px"
            >
              &times;
            </Button>
          </Flex>
        </PseudoBox>
      </PseudoBox>
    </Flex>
  );
};

export default connector(Calendar);

import React from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import EventCard from '../components/EventCard';
import { Stack } from 'react-bootstrap';

const Events = () => {
  return (
    <Stack>
      <EventCard />
    </Stack>
  );
};

export default Events;

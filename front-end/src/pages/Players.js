import React from 'react';
import 'bootswatch/dist/lux/bootstrap.min.css';
import PlayerCard from '../components/PlayerCard';
import { Stack } from 'react-bootstrap';

const Players = () => {
  return (
    <Stack>
      <PlayerCard />
    </Stack>
  );
};

export default Players;

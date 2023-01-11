import { Skeleton, Stack } from '@mui/material';
import React from 'react';

function ListLoading() {
  return (
    <Stack width='80%' height='100%'>
      <Skeleton width='100%' height='25%' />
      <Skeleton width='100%' height='25%' />
      <Skeleton width='100%' height='25%' />
      <Skeleton width='100%' height='25%' />
      <Skeleton width='100%' height='25%' />
      <Skeleton width='100%' height='25%' />
    </Stack>
  )
}

export default ListLoading;

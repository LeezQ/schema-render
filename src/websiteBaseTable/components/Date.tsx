import dayjs from 'dayjs';
import React from 'react';

export default function Text(val: string) {
  return <span>{dayjs(val).format('YYYY-MM-DD hh:mm')}</span>;
}

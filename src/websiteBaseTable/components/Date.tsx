import dayjs from 'dayjs';
import React from 'react';

export default function Date(value: any, record: any, rowIndex: number) {
  return <span>{dayjs(record.value).format('YYYY-MM-DD hh:mm')}</span>;
}

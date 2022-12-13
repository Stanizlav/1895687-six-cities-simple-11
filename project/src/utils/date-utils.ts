import dayjs from 'dayjs';

export const getFormatedDate = (date: string) => dayjs(date).format('MMMM YYYY');

export const getDateTime = (date: string) => dayjs(date).format('YYYY-MM-DD');

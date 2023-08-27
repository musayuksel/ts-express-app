import { FormatResponseInterface } from './formatResponse.interface';

export const formatResponse = <T>({ success, data, message }: FormatResponseInterface<T>) => ({
  success,
  data,
  message,
});

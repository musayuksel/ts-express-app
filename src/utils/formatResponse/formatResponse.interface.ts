export interface FormatResponseInterface<T> {
  success: boolean;
  data?: T;
  message?: string;
}

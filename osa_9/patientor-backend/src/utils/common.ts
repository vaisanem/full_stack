const isString = (data: unknown): data is string => {
  return typeof data === 'string' || data instanceof String;
};

export const parseString = (data: unknown): string => {
  if (!isString(data)) {
    throw new Error('Expected a string: ' + data);
  }
  return data;
};

export const parseDate = (data: unknown): string => {
  if (!Date.parse(parseString(data))) {
    throw new Error('Invalid date: ' + data);
  }
  return isString(data) ? data : 'BORN-NO-IS';
};

export const isObject = (data: unknown): data is object => {
  return data !== null && typeof data === 'object';
};
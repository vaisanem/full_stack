const isString = (data: unknown): data is string => {
  return typeof data === 'string' || data instanceof String;
};

export const parseString = (data: unknown, error: string = ''): string => {
  if (!isString(data)) {
    throw new Error('Expected a string' + error + ': ' + data);
  }
  return data;
};

export const notEmpty = (data: string, property: string): string => {
  if (!data || data.length === 0) {
    throw new Error(property + ' is missing');
  }
  return data;
};

export const parseNumberOrString = (data: unknown): number | string => {
  if (!isNaN(Number(data))) {
    return Number(data);
  }
  return parseString(data, " or a number");
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
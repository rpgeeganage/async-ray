import { Handler } from './handler/handler';

function getAsyncArray(input: Handler | []): Handler {
  return new Handler(input);
}

export { getAsyncArray as AsyncArray };

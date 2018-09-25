import { Handler } from './handler/handler';

function getAsyncRay(input: Handler | []): Handler {
  return new Handler(input);
}

export { getAsyncRay as AsyncRay };

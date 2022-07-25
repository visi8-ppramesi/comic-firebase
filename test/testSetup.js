import dotenv from 'dotenv'

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
process.env = {
    ...process.env,
    ...dotenv.config().parsed
}
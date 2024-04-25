import { Stream } from '../../utils/stream';

export interface iStreamMessage {
    id: string;
    data: unknown;
}

export const $IOStream = new Stream<iStreamMessage>();

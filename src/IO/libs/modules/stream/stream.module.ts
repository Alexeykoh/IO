import { IO } from '../../../IO';
import { Stream, StreamSubscriber } from '../../../utils/stream';

export interface iStreamMessage {
    id: string;
    data: unknown;
}

export const $IOStream = new Stream<iStreamMessage>();

export class StreamModule {
    private readonly _node: IO;
    protected readonly _$stream: Stream<iStreamMessage>;
    protected $subscriber: StreamSubscriber<iStreamMessage> | null;

    constructor(node: IO) {
        this._node = node;
        this._$stream = $IOStream;
        this.$subscriber = null;
    }

    public stream<T>() {
        // global stream
        // subscribe to global stream
        const subscribe = (id: string, effect?: (data: T) => void) => {
            this.$subscriber = new StreamSubscriber<iStreamMessage>(this._$stream, (message) => {
                if (message.id === id) {
                    if (effect) {
                        effect(message.data as T);
                    }
                    this._node.forceUpdate();
                }
            });
        };
        // notify global stream
        const notify = (id: string, data?: T) => {
            $IOStream.notify({ id: id, data: data });
        };
        return { subscribe, notify };
    }
}

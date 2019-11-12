import { BinaryReader } from 'stream-binary';
import { BinarySerializer } from 'ts-buffer-serializer';
import { packetTypes } from './packet.decorator';

export class StreamPacketReceiver {
    private extra: Buffer = Buffer.alloc(0);

    constructor(
        public readonly isServer: boolean,
    ) {
    }

    public getPacketsFromBuffer(buffer: Buffer): any[] {
        const output: any[] = [];
        const tmp = Buffer.alloc(this.extra.length + buffer.length);
        this.extra.copy(tmp, 0);
        buffer.copy(tmp, this.extra.length);
        const br = new BinaryReader(tmp, false);

        do {
            const packetTypeId = br.readShort();
            const messageSize = br.readShort();

            if (tmp.length < messageSize + br.offset) {
                br.seek(br.offset - 4);
                break;
            }

            br.seek(br.offset - 2);

            const packetBuffer = br.readBuffer();
            const packets = this.isServer ? packetTypes.client : packetTypes.server;
            const packetType = packets[packetTypeId];

            output.push(BinarySerializer.deserialize<any>(packetType, packetBuffer));
        } while (tmp.length > br.offset + 1);

        this.extra = Buffer.alloc(tmp.length - br.offset);
        tmp.copy(this.extra, 0, br.offset);

        return output;
    }

}

import { BinaryWriter } from 'stream-binary';
import { BinarySerializer } from 'ts-buffer-serializer';

export class StreamPacketGenerator {
    static generate(packet: any): Buffer {
        const bw = new BinaryWriter();
        bw.writeShort(packet.constructor.__packetType__);
        bw.writeBuffer(BinarySerializer.serialize<any>(packet));
        return bw.getBuffer();
    }
}

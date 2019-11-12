// tslint:disable: max-classes-per-file

import { ClientPacket, ServerPacket } from './packet.decorator';
import { fields } from 'ts-buffer-serializer';
import { StreamPacketGenerator } from './generator.stream-packet';
import { assert } from 'chai';

describe('Generate server packets', () => {
    it('Generate a simple server packet', () => {
        @ServerPacket(1)
        class LoginResultPacket {
            @fields.Byte() result: number;
        }

        const packet = new LoginResultPacket();
        packet.result = 1;

        const result = StreamPacketGenerator.generate(packet);
        assert.equal(result.toString('hex'), '0001000101');
    });

});

describe('Generate client packets', () => {
    it('Generate a simple client packet', () => {
        @ClientPacket(1)
        class LoginPacket {
            @fields.String() username: string;
            @fields.String() password: string;
        }

        const packet = new LoginPacket();
        packet.username = 'serializer';
        packet.password = 'Cami0n01';

        const result = StreamPacketGenerator.generate(packet);
        assert.equal(result.toString('hex'), '00010016000a73657269616c697a6572000843616d69306e3031');
    });
});

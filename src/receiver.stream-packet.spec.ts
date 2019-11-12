// // tslint:disable: max-classes-per-file

// import { assert } from 'chai';
// import { StreamPacketReceiver } from './receiver.stream-packet';
// import { fields } from 'ts-buffer-serializer';
// import { ServerPacket, ClientPacket } from './packet.decorator';

// describe('Server process packets', () => {

//     it('Server receives packet complete from client', () => {
//         @ClientPacket(1)
//         class LoginPacket {
//             @fields.String() username: string;
//             @fields.String() password: string;
//         }

//         const receiver = new StreamPacketReceiver(true);
//         const buffer = Buffer.from('00010016000a73657269616c697a6572000843616d69306e3031', 'hex');
//         const packets = receiver.getPacketsFromBuffer(buffer);

//         assert.lengthOf(packets, 1);
//         assert.instanceOf(packets[0], LoginPacket);
//         assert.equal((packets[0] as LoginPacket).username, 'serializer');
//         assert.equal((packets[0] as LoginPacket).password, 'Cami0n01');
//     });

//     it('Server receives multiple packets complete from client', () => {
//         @ClientPacket(1)
//         class LoginPacket {
//             @fields.String() username: string;
//             @fields.String() password: string;
//         }

//         const receiver = new StreamPacketReceiver(true);
//         const buffer = Buffer.from('00010016000a73657269616c697a6572000843616d69306e303100010016000a73657269616c697a6572000843616d69306e3031', 'hex');
//         const packets = receiver.getPacketsFromBuffer(buffer);

//         assert.lengthOf(packets, 2);
//         assert.instanceOf(packets[0], LoginPacket);
//         assert.equal((packets[0] as LoginPacket).username, 'serializer');
//         assert.equal((packets[0] as LoginPacket).password, 'Cami0n01');

//         assert.instanceOf(packets[1], LoginPacket);
//         assert.equal((packets[1] as LoginPacket).username, 'serializer');
//         assert.equal((packets[1] as LoginPacket).password, 'Cami0n01');
//     });

//     it('Server receives packet partial from client', () => {
//         @ClientPacket(1)
//         class LoginPacket {
//             @fields.String() username: string;
//             @fields.String() password: string;
//         }

//         const receiver = new StreamPacketReceiver(true);

//         const buffer1 = Buffer.from('00010016000a736572', 'hex');
//         const packets1 = receiver.getPacketsFromBuffer(buffer1);

//         const buffer2 = Buffer.from('69616c697a6572000843616d69306e3031', 'hex');
//         const packets2 = receiver.getPacketsFromBuffer(buffer2);

//         assert.lengthOf(packets1, 0);
//         assert.lengthOf(packets2, 1);

//         assert.instanceOf(packets2[0], LoginPacket);
//         assert.equal((packets2[0] as LoginPacket).username, 'serializer');
//         assert.equal((packets2[0] as LoginPacket).password, 'Cami0n01');
//     });

//     it('Server receives packet complete and other partial from client', () => {
//         @ClientPacket(1)
//         class LoginPacket {
//             @fields.String() username: string;
//             @fields.String() password: string;
//         }

//         const receiver = new StreamPacketReceiver(true);

//         const buffer1 = Buffer.from('00010016000a73657269616c697a6572000843616d69306e303100010016000a736572', 'hex');
//         const packets1 = receiver.getPacketsFromBuffer(buffer1);

//         const buffer2 = Buffer.from('69616c697a6572000843616d69306e3031', 'hex');
//         const packets2 = receiver.getPacketsFromBuffer(buffer2);

//         assert.lengthOf(packets1, 1);
//         assert.lengthOf(packets2, 1);

//         assert.instanceOf(packets1[0], LoginPacket);
//         assert.equal((packets1[0] as LoginPacket).username, 'serializer');
//         assert.equal((packets1[0] as LoginPacket).password, 'Cami0n01');

//         assert.instanceOf(packets2[0], LoginPacket);
//         assert.equal((packets2[0] as LoginPacket).username, 'serializer');
//         assert.equal((packets2[0] as LoginPacket).password, 'Cami0n01');
//     });
// });

// describe('Client process packets', () => {
//     it('Client receives packet complete from server', () => {
//         @ServerPacket(1)
//         class LoginResultPacket {
//             @fields.Byte() result: number;
//         }

//         const receiver = new StreamPacketReceiver(false);
//         const buffer = Buffer.from('0001000101', 'hex');
//         const packets = receiver.getPacketsFromBuffer(buffer);

//         assert.lengthOf(packets, 1);
//         assert.instanceOf(packets[0], LoginResultPacket);
//         assert.equal((packets[0] as LoginResultPacket).result, 1);
//     });

//     it('Client receives packet partial from server', () => {
//         @ServerPacket(1)
//         class LoginResultPacket {
//             @fields.Byte() result: number;
//         }

//         const receiver = new StreamPacketReceiver(false);

//         const buffer1 = Buffer.from('00010001', 'hex');
//         const packets1 = receiver.getPacketsFromBuffer(buffer1);

//         const buffer2 = Buffer.from('01', 'hex');
//         const packets2 = receiver.getPacketsFromBuffer(buffer2);

//         assert.lengthOf(packets1, 0);
//         assert.lengthOf(packets2, 1);

//         assert.instanceOf(packets2[0], LoginResultPacket);
//         assert.equal((packets2[0] as LoginResultPacket).result, 1);
//     });

// });

# Stream Packet

## Overview
Transform objects into binary representations to reduce the size of packet delivery over the network.


## Installing in your project...
npm:
```
npm install stream-packet
```
yarn:
```
yarn add stream-packet
```

## Example packet generator
```ts
 @ClientPacket(1)
class LoginPacket {
    @fields.String() username: string;
    @fields.String() password: string;
}

const packet = new LoginPacket();
packet.username = 'serializer';
packet.password = 'Cami0n01';

const result = StreamPacketGenerator.generate(packet); // 00010016000a73657269616c697a6572000843616d69306e3031
```

## Example packet receiver
```ts
@ServerPacket(1)
class LoginResultPacket {
    @fields.Byte() result: number;
}

const receiver = new StreamPacketReceiver(false);
const buffer = Buffer.from('0001000101', 'hex');
const packets = receiver.getPacketsFromBuffer(buffer); // one packet of LoginResultPacket
```


## Example chunked packet receiver
```ts
@ServerPacket(1)
class LoginResultPacket {
    @fields.Byte() result: number;
}

const receiver = new StreamPacketReceiver(false);

const buffer1 = Buffer.from('00010001', 'hex');
const packets1 = receiver.getPacketsFromBuffer(buffer1); // return 0 packets, not received completed data

const buffer2 = Buffer.from('01', 'hex');
const packets2 = receiver.getPacketsFromBuffer(buffer2); // return a packet LoginPacketResult
```

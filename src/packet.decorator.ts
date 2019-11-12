interface Packets { [packetId: number]: any; }

interface PacketTypes {
    server: Packets;
    client: Packets;
}

export const packetTypes: PacketTypes = {
    server: {},
    client: {},
};

export const ServerPacket = (packetType: number) => {
    return (target: any) => {
        target.__packetType__ = packetType;
        packetTypes.server[packetType] = target;
    };
};

export const ClientPacket = (packetType: number) => {
    return (target: any) => {
        target.__packetType__ = packetType;
        packetTypes.client[packetType] = target;
    };
};

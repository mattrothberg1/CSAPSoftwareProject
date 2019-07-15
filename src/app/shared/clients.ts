export class Clients {
    id: string;
    mac: string;
    description: string;
    mdnsName: string;
    dhcpHostname: string;
    ip: string;
    vlan: number;
    policy: string; 
    manufacturer: string; 
    show: boolean;
    networkID: string; 
    policies : Policies;
}

export class Policies {
    groupPolicyId: string;
    name: string;
}
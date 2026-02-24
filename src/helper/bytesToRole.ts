const roleMap: Record<string, string> = {
  "0x0000000000000000000000000000000000000000000000000000000000000000": "Default Admin",
  "0xb19546dff01e856fb3f010c267a7b1c60363cf8a4664e21cc89c26224620214e": "Owner",
  "0x189ab7a9244df0848122154315af71fe140f3db0fe014031783b0946b8c9d2e3": "Upgrader",
  "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6": "Minter",
  "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a": "Pauser",
  "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775": "Admin",
};

export function bytesToRole(roleHash: string): string {
  return roleMap[roleHash] || "Unknown Role";
}

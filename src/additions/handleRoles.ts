import { role } from "../../schemas/ponder.schema.additions";
import { bytesToRole } from "../helper/bytesToRole";

export const handleGrantedRoles = async (context: any, event: any, contractName: string) => {
  const contractAddress = event.log.address;
  await context.db
    .insert(role)
    .values({
      id: `${context.chain.id}-${contractAddress}-${contractName}-${bytesToRole(event.args.role)}-${
        event.args.account
      }`,
      account: event.args.account,
      role: bytesToRole(event.args.role),
      type: contractName,
      contractAddress: contractAddress,
      contractChainId: context.chain.id,
    })
    .onConflictDoNothing();
};

export const handleRevokedRoles = async (context: any, event: any, contractName: string) => {
  const contractAddress = event.log.address;
  await context.db.delete(role, {
    id: `${context.chain.id}-${contractAddress}-${contractName}-${bytesToRole(event.args.role)}-${event.args.account}`,
  });
};

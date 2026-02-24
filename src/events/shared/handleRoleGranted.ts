import { roleGranted } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { bytesToRole } from "../../helper/bytesToRole";
import { handleGrantedRoles } from "../../additions/handleRoles";

export const handleRoleGranted = async (event: any, context: any, contractType: string) => {
  await context.db.insert(roleGranted).values({
    id: event.id,
    contractType,
    contractAddress: event.log.address,
    role: event.args.role,
    roleName: bytesToRole(event.args.role),
    account: event.args.account,
    sender: event.args.sender,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });

  await handleGrantedRoles(context, event, contractType);
};

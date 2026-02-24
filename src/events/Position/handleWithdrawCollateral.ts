import { withdrawCollateral } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export async function handleWithdrawCollateral(event: any, context: any) {
  await context.db.insert(withdrawCollateral).values({
    id: event.id,
    lendingPoolAddress: event.log.address, // In this case, it's the Position contract address
    user: event.args.user,
    amount: event.args.amount,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
}

import { tokenPriceFeedSet } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";

export const handleTokenPriceFeedSet = async (event: any, context: any) => {
  await context.db.insert(tokenPriceFeedSet).values({
    id: event.id,
    token: event.args.token,
    priceFeed: event.args.priceFeed,
    contractChainId: context.chain.id,
    txHash: event.transaction.hash,
    timestamp: event.block.timestamp,
    datetime: datetimeFormatter(event.block.timestamp),
    date: dateFormatter(event.block.timestamp),
    time: timeFormatter(event.block.timestamp),
  });
};

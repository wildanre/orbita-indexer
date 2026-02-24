import { feedUpdated } from "ponder:schema";
import { datetimeFormatter } from "../../helper/datetimeFormatter";
import { dateFormatter } from "../../helper/dateFormatter";
import { timeFormatter } from "../../helper/timeFormatter";
import { answerOracleFormatter } from "../../helper/answerOracleFormatter";

export const handleFeedUpdated = async (event: any, context: any, tokenFormatted: string) => {
  // Round timestamp to 1 minute buckets (60 seconds)
  const tenMinutesInSeconds = 60;
  const timeBucket = Math.floor(Number(event.block.timestamp) / tenMinutesInSeconds);

  const uniqueId = `${tokenFormatted}-${timeBucket}`;

  await context.db
    .insert(feedUpdated)
    .values({
      id: uniqueId,
      tokenFormatted: tokenFormatted,
      oracleAddress: event.log.address,
      answerFormatted: answerOracleFormatter(event.args.answer),
      answer: event.args.answer,
      contractChainId: context.chain.id,
      txHash: event.transaction.hash,
      timestamp: event.block.timestamp,
      datetime: datetimeFormatter(event.block.timestamp),
      date: dateFormatter(event.block.timestamp),
      time: timeFormatter(event.block.timestamp),
    })
    .onConflictDoUpdate({
      answer: event.args.answer,
      answerFormatted: answerOracleFormatter(event.args.answer),
      contractChainId: context.chain.id,
      txHash: event.transaction.hash,
      timestamp: event.block.timestamp,
      datetime: datetimeFormatter(event.block.timestamp),
      date: dateFormatter(event.block.timestamp),
      time: timeFormatter(event.block.timestamp),
    });
};

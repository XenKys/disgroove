import type { RawPoll, Poll } from "../types/poll";

export class Polls {
  static pollFromRaw(poll: RawPoll): Poll {
    return {
      question: poll.question,
      answers: poll.answers.map((answer) => ({
        answerID: answer.answer_id,
        pollMedia: answer.poll_media,
      })),
      expiry: poll.expiry,
      allowMultiselect: poll.allow_multiselect,
      layoutType: poll.layout_type,
      results:
        poll.results !== undefined
          ? {
              isFinalized: poll.results.is_finalized,
              answerCounts: poll.results.answer_counts.map((answerCount) => ({
                id: answerCount.id,
                count: answerCount.count,
                meVoted: answerCount.me_voted,
              })),
            }
          : undefined,
    };
  }

  static pollToRaw(poll: Poll): RawPoll {
    return {
      question: poll.question,
      answers: poll.answers.map((answer) => ({
        answer_id: answer.answerID,
        poll_media: answer.pollMedia,
      })),
      expiry: poll.expiry,
      allow_multiselect: poll.allowMultiselect,
      layout_type: poll.layoutType,
      results:
        poll.results !== undefined
          ? {
              is_finalized: poll.results.isFinalized,
              answer_counts: poll.results.answerCounts.map((answerCount) => ({
                id: answerCount.id,
                count: answerCount.count,
                me_voted: answerCount.meVoted,
              })),
            }
          : undefined,
    };
  }
}

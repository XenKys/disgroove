import type { LayoutType } from "../constants";
import type { Emoji, RawEmoji } from "./emoji";

/** https://discord.com/developers/docs/resources/poll#poll-object-poll-object-structure */
export interface RawPoll {
  question: RawPollMedia;
  answers: Array<RawPollAnswer>;
  expiry: string | null;
  allow_multiselect: boolean;
  layout_type: LayoutType;
  results?: RawPollResults;
}

/** https://discord.com/developers/docs/resources/poll#poll-create-request-object-poll-create-request-object-structure */
export interface RawPollCreateParams {
  question: RawPollMedia;
  answers: Array<RawPollAnswer>;
  duration?: number;
  allow_multiselect?: boolean;
  layout_type?: LayoutType;
}

/** https://discord.com/developers/docs/resources/poll#poll-media-object-poll-media-object-structure */
export interface RawPollMedia {
  text?: string;
  emoji?: Pick<RawEmoji, "id" | "name">;
}

/** https://discord.com/developers/docs/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface RawPollAnswer {
  answer_id: number;
  poll_media: RawPollMedia;
}

/** https://discord.com/developers/docs/resources/poll#poll-results-object-poll-results-object-structure */
export interface RawPollResults {
  is_finalized: boolean;
  answer_counts: Array<RawPollAnswerCount>;
}

/** https://discord.com/developers/docs/resources/poll#poll-results-object-poll-answer-count-object-structure */
export interface RawPollAnswerCount {
  id: number;
  count: number;
  me_voted: boolean;
}

/** https://discord.com/developers/docs/resources/poll#poll-object-poll-object-structure */
export interface Poll {
  question: PollMedia;
  answers: Array<PollAnswer>;
  expiry: string | null;
  allowMultiselect: boolean;
  layoutType: LayoutType;
  results?: PollResults;
}

/** https://discord.com/developers/docs/resources/poll#poll-create-request-object-poll-create-request-object-structure */
export interface PollCreateParams {
  question: PollMedia;
  answers: Array<PollAnswer>;
  duration?: number;
  allowMultiselect?: boolean;
  layoutType?: LayoutType;
}

/** https://discord.com/developers/docs/resources/poll#poll-media-object-poll-media-object-structure */
export interface PollMedia {
  text?: string;
  emoji?: Pick<Emoji, "id" | "name">;
}

/** https://discord.com/developers/docs/resources/poll#poll-answer-object-poll-answer-object-structure */
export interface PollAnswer {
  answerId: number;
  pollMedia: PollMedia;
}

/** https://discord.com/developers/docs/resources/poll#poll-results-object-poll-results-object-structure */
export interface PollResults {
  isFinalized: boolean;
  answerCounts: Array<PollAnswerCount>;
}

/** https://discord.com/developers/docs/resources/poll#poll-results-object-poll-answer-count-object-structure */
export interface PollAnswerCount {
  id: number;
  count: number;
  meVoted: boolean;
}

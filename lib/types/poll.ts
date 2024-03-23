import type { LayoutType } from "../constants";
import type { Emoji, RawEmoji } from "./emoji";

export interface RawPoll {
  question: RawPollMedia;
  answers: Array<RawPollAnswer>;
  expiry: string;
  allow_multiselect: boolean;
  layout_type: LayoutType;
  results: RawPollResults;
}

export interface RawPollMedia {
  text?: string;
  emoji?: Pick<RawEmoji, "id" | "name">;
}

export interface RawPollAnswer {
  answer_id: number;
  poll_media: RawPollMedia;
}

export interface RawPollResults {
  is_finalized: boolean;
  answer_counts: Array<RawPollAnswerCount>;
}

export interface RawPollAnswerCount {
  id: number;
  count: number;
  me_voted: boolean;
}

export interface Poll {
  question: PollMedia;
  answers: Array<PollAnswer>;
  expiry: string;
  allowMultiselect: boolean;
  layoutType: LayoutType;
  results: PollResults;
}

export interface PollMedia {
  text?: string;
  emoji?: Pick<Emoji, "id" | "name">;
}

export interface PollAnswer {
  answerId: number;
  pollMedia: PollMedia;
}

export interface PollResults {
  isFinalized: boolean;
  answerCounts: Array<PollAnswerCount>;
}

export interface PollAnswerCount {
  id: number;
  count: number;
  meVoted: boolean;
}

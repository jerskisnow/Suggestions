interface HelpFields {
  title: string;
  description: string;
}

interface Blacklist {
  helpDescription: string;
  helpFields: HelpFields[];
  alreadyOnBlacklist: string;
  notOnBlacklist: string;
  invalidMember: string;
  invalidBlacklist: string;
  blacklistUpdated: string;
  blacklistsUpdated: string;
}

interface HelpFields {
  title: string;
  description: string;
}

interface Config {
  helpDescription: string;
  helpFields: HelpFields[];
  prefixUpdated: string;
  invalidLanguage: string;
  languageUpdated: string;
  invalidRole: string;
  roleUpdated: string;
  invalidChannel: string;
  suggestionChannelUpdated: string;
  reportChannelUpdated: string;
  logChannelUpdated: string;
  approveEmojiUpdated: string;
  rejectEmojiUpdated: string;
  invalidNumberOption: string;
  autoApproveUpdated: string;
  autoRejectUpdated: string;
  invalidToggleOption: string;
  deleteApprovedUpdated: string;
  deleteRejectedUpdated: string;
}

interface Movereport {
  helpDescription: string;
  invalidReport: string;
  invalidChannel: string;
  invalidMessage: string;
  locationUpdated: string;
}

interface Report {
  helpDescription: string;
  onBlacklist: string;
  invalidChannel: string;
  reportDescription: string;
  reportSent: string;
}

interface Resolve {
  helpDescription: string;
  invalidReport: string;
  statusUpdated: string;
}

interface Approve {
  helpDescription: string;
  invalidSuggestion: string;
  statusUpdated: string;
}

interface Consider {
  helpDescription: string;
  invalidSuggestion: string;
  statusUpdated: string;
}

interface List {
  helpDescription: string;
  noSuggestionsFound: string;
  noReportsFound: string;
  suggestionListDescription: string;
  reportListDescription: string;
}

interface Movesuggestion {
  helpDescription: string;
  invalidSuggestion: string;
  invalidChannel: string;
  invalidMessage: string;
  locationUpdated: string;
}

interface Reject {
  helpDescription: string;
  invalidSuggestion: string;
  statusUpdated: string;
}

interface Suggest {
  helpDescription: string;
  onBlacklist: string;
  invalidChannel: string;
  suggestionDescription: string;
  suggestionSent: string;
}

interface Donate {
  description: string;
}

interface Fields {
  title: string;
  description: string;
}

interface Help {
  description: string;
  fields: Fields[];
}

interface Invite {
  description: string;
}

interface Vote {
  description: string;
}

interface BlacklistLogs {
  addedToSuggestion: string;
  removedFromSuggestion: string;
  addedToReport: string;
  removedFromReport: string;
  addedToAll: string;
  removedFromAll: string;
  clearedSuggestion: string;
  clearedReport: string;
  clearedAll: string;
  isOnSuggestion: string;
  isOnReport: string;
}

interface Logs {
  blacklistLogs: BlacklistLogs;
  prefixUpdated: string;
  languageUpdated: string;
  roleUpdated: string;
  suggestionChannelUpdated: string;
  reportChannelUpdated: string;
  logChannelUpdated: string;
  approveEmojiUpdated: string;
  rejectEmojiUpdated: string;
  autoApproveUpdated: string;
  autoRejectUpdated: string;
  deleteApprovedUpdated: string;
  deleteRejectedUpdated: string;
  reportCreated: string;
  reportResolved: string;
  reportMoved: string;
  suggestionApproved: string;
  suggestionUnderConsideration: string;
  suggestionRejected: string;
  suggestionCreated: string;
  suggestionMoved: string;
  autoApproved: string;
  autoRejected: string;
}

interface Additional {
  invalidStaffRole: string;
  roleRequired: string;
  permRequired: string;
  openStatus: string;
  considerstatus: string;
  approvedStatus: string;
  rejectedStatus: string;
  resolvedStatus: string;
  guildDisabled: string;
}

export default interface Language {
  name: string;
  country: string;
  authors: string[];
  blacklist: Blacklist;
  config: Config;
  movereport: Movereport;
  report: Report;
  resolve: Resolve;
  approve: Approve;
  consider: Consider;
  list: List;
  movesuggestion: Movesuggestion;
  reject: Reject;
  suggest: Suggest;
  donate: Donate;
  help: Help;
  invite: Invite;
  vote: Vote;
  logs: Logs;
  additional: Additional;
}
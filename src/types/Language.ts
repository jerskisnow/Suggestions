export default interface Language {
  name: string
  country: string
  authors: string[]
  blacklist: Blacklist
  config: Config
  movereport: Movereport
  report: Report
  resolve: Resolve
  approve: Approve
  consider: Consider
  reopen: Reopen
  list: List
  movesuggestion: Movesuggestion
  reject: Reject
  suggest: Suggest
  donate: Donate
  help: Help
  invite: Invite
  vote: Vote
  allowdm: Allowdm
  logs: Logs
  additional: Additional
}

export interface Blacklist {
  helpDescription: string
  helpFields: HelpField[]
  alreadyOnBlacklist: string
  notOnBlacklist: string
  invalidMember: string
  invalidBlacklist: string
  blacklistUpdated: string
  blacklistsUpdated: string
}

export interface HelpField {
  title: string
  description: string
}

export interface Config {
  helpDescription: string
  helpFields: HelpField2[]
  prefixUpdated: string
  invalidLanguage: string
  languageUpdated: string
  invalidRole: string
  roleUpdated: string
  invalidChannel: string
  suggestionChannelUpdated: string
  reportChannelUpdated: string
  logChannelUpdated: string
  approveEmojiUpdated: string
  rejectEmojiUpdated: string
  invalidNumberOption: string
  autoApproveUpdated: string
  autoRejectUpdated: string
  invalidToggleOption: string
  deleteApprovedUpdated: string
  deleteRejectedUpdated: string
}

export interface HelpField2 {
  title: string
  description: string
}

export interface Movereport {
  helpDescription: string
  invalidReport: string
  invalidChannel: string
  invalidMessage: string
  locationUpdated: string
}

export interface Report {
  helpDescription: string
  onBlacklist: string
  invalidChannel: string
  reportDescription: string
  reportSent: string
}

export interface Resolve {
  helpDescription: string
  invalidReport: string
  statusUpdated: string
}

export interface Approve {
  helpDescription: string
  invalidSuggestion: string
  statusUpdated: string
}

export interface Consider {
  helpDescription: string
  invalidSuggestion: string
  statusUpdated: string
}

export interface Reopen {
  helpDescription: string
  invalidSuggestion: string
  alreadyOpen: string
  statusUpdated: string
}

export interface List {
  helpDescription: string
  noSuggestionsFound: string
  noReportsFound: string
  suggestionListDescription: string
  reportListDescription: string
}

export interface Movesuggestion {
  helpDescription: string
  invalidSuggestion: string
  invalidChannel: string
  invalidMessage: string
  locationUpdated: string
}

export interface Reject {
  helpDescription: string
  invalidSuggestion: string
  statusUpdated: string
}

export interface Suggest {
  helpDescription: string
  onBlacklist: string
  invalidChannel: string
  suggestionDescription: string
  suggestionSent: string
}

export interface Donate {
  description: string
}

export interface Help {
  title: string
  description: string
  fields: Fields
}

export interface Fields {
  user: User
  staff: Staff
  admin: Admin
}

export interface User {
  title: string
  descriptions: Descriptions
}

export interface Descriptions {
  suggest: string
  report: string
  list: string
  donate: string
  invite: string
  vote: string
  allowdm: string
  help: string
}

export interface Staff {
  title: string
  descriptions: Descriptions2
}

export interface Descriptions2 {
  approve: string
  reject: string
  consider: string
  reopen: string
  resolve: string
  list: string
  movesuggestion: string
  movereport: string
}

export interface Admin {
  title: string
  descriptions: Descriptions3
}

export interface Descriptions3 {
  config: string
  blacklist: string
}

export interface Invite {
  description: string
}

export interface Vote {
  description: string
}

export interface Allowdm {
  invalidToggleOption: string
  allowDMUpdated: string
}

export interface Logs {
  blacklistLogs: BlacklistLogs
  prefixUpdated: string
  languageUpdated: string
  roleUpdated: string
  suggestionChannelUpdated: string
  reportChannelUpdated: string
  logChannelUpdated: string
  approveEmojiUpdated: string
  rejectEmojiUpdated: string
  autoApproveUpdated: string
  autoRejectUpdated: string
  deleteApprovedUpdated: string
  deleteRejectedUpdated: string
  reportCreated: string
  reportResolved: string
  reportMoved: string
  suggestionApproved: string
  suggestionReopened: string
  suggestionUnderConsideration: string
  suggestionRejected: string
  suggestionCreated: string
  suggestionMoved: string
  autoApproved: string
  autoRejected: string
}

export interface BlacklistLogs {
  addedToSuggestion: string
  removedFromSuggestion: string
  addedToReport: string
  removedFromReport: string
  addedToAll: string
  removedFromAll: string
  clearedSuggestion: string
  clearedReport: string
  clearedAll: string
  isOnSuggestion: string
  isOnReport: string
}

export interface Additional {
  invalidStaffRole: string
  roleRequired: string
  permRequired: string
  openStatus: string
  considerstatus: string
  approvedStatus: string
  rejectedStatus: string
  resolvedStatus: string
  underConstruction: string
}

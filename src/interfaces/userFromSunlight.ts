export type UserGroups = {
  name: string;
  group_id: string;
};

export type User = {
  userId?: string;
  groups?: UserGroups[];
  email?: string;
  userName?: string;
};

export type Urls = {
  sunlight: string,
  sunlightsupport: string
  guide: string
}

export type dataUrls = {
  URLs: Array<Urls>,
}

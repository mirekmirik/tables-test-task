type Country =
  | "USA"
  | "Germany"
  | "Sweden"
  | "Finland"
  | "Norway"
  | "France"
  | "Austria"
  | "Canada"
  | "UK";

type Marketplace = "eBay" | "Etsy" | "Amazon" | "Aliexpress" | "Shopify";

interface Account {
  accountId: number;
  email: string;
  authToken: string;
  creationDate: Date;
}

interface Profile {
  profileId: number;
  accountId: number;
  country: Country;
  marketplace: Marketplace;
}

interface Campaign {
  campaignId: number;
  profileId: number;
  clicks: number;
  cost: number;
  date: Date;
}

interface CombinedEntity {
  accounts: Account[];
  profiles: Profile[];
  campaigns: Campaign[];
}


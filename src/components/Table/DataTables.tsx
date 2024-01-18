import React, { useState } from "react";
import AccountsTable from "./AccountsTable/AccountsTable";
import CampaignsTable from "./CampaignsTable/CampaignsTable";
import ProfilesTable from "./ProfilesTable/ProfilesTable";

interface DataTablesProps {
  data: CombinedEntity;
}

enum Tab {
  Accounts = "accounts",
  Profiles = "profiles",
  Campaigns = "campaigns",
}

const DataTables: React.FC<DataTablesProps> = ({ data }) => {
  // state picked ids
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null
  );
  const [selectedProfileId, setSelectedProfileId] = useState<number | null>(
    null
  );
  // state picked tab
  const [selectedTab, setSelectedTab] = useState<Tab>(Tab.Accounts);

  // reset picked ids
  const resetStateIds = () => {
    setSelectedAccountId(null);
    setSelectedProfileId(null);
  };
  // select tab and reset picked ids
  const selectPage = (tab: Tab) => {
    setSelectedTab(tab);
    resetStateIds();
  };

  // render jsx depending on conditions
  const renderJsx = () => {
    switch (true) {
      case Boolean(selectedProfileId):
        return (
          <CampaignsTable
            campaigns={data.campaigns.filter(
              (campaign) => campaign.profileId === selectedProfileId
            )}
            onRowClick={(row) => setSelectedProfileId(row.profileId)}
          />
        );
      case Boolean(selectedAccountId):
        return (
          <ProfilesTable
            profiles={data.profiles.filter(
              (profile) => profile.accountId === selectedAccountId
            )}
            onRowClick={(row) => setSelectedProfileId(row.profileId)}
          />
        );
      default:
        switch (selectedTab) {
          case Tab.Accounts:
            return (
              <AccountsTable
                accounts={data.accounts}
                onRowClick={(row) => setSelectedAccountId(row.accountId)}
              />
            );
          case Tab.Profiles:
            return (
              <ProfilesTable
                profiles={data.profiles}
                onRowClick={(row) => setSelectedProfileId(row.profileId)}
              />
            );
          case Tab.Campaigns:
            return (
              <CampaignsTable
                campaigns={data.campaigns}
                onRowClick={(row) => setSelectedProfileId(row.profileId)}
              />
            );
          default:
            return null;
        }
    }
  };

  const style = (tab: Tab) => {
    return selectedTab === tab
      ? { backgroundColor: "blue" }
      : { backgroundColor: "black" };
  };

  return (
    <>
      <div
        style={{ display: "flex", columnGap: "20px", justifyContent: "center" }}
      >
        <button
          onClick={() => selectPage(Tab.Accounts)}
          style={style(Tab.Accounts)}
        >
          Accounts
        </button>
        <button
          onClick={() => selectPage(Tab.Profiles)}
          style={style(Tab.Profiles)}
        >
          Profiles
        </button>
        <button
          onClick={() => selectPage(Tab.Campaigns)}
          style={style(Tab.Campaigns)}
        >
          Campaigns
        </button>
      </div>
      {renderJsx()}
    </>
  );
};

export default DataTables;

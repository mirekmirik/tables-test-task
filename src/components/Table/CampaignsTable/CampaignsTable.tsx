import BaseTable from "../BaseTable";

interface CampaignsTableProps {
  campaigns: Campaign[];
  onRowClick: (row: Campaign) => void;
}

const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaigns,
  onRowClick,
}) => {
  return (
    <>
      <h1>Campaigns</h1>
      <BaseTable data={campaigns} onRowClick={onRowClick} />;
    </>
  );
};

export default CampaignsTable;

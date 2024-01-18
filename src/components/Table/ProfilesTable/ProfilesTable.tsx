import BaseTable from "../BaseTable";

interface ProfilesTableProps {
  profiles: Profile[];
  onRowClick: (row: Profile) => void;
}

const ProfilesTable: React.FC<ProfilesTableProps> = ({
  profiles,
  onRowClick,
}) => {
  return (
    <>
      <h1>Profiles</h1>
      <BaseTable data={profiles} onRowClick={onRowClick} />;
    </>
  );
};

export default ProfilesTable;

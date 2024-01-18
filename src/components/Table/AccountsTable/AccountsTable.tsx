import BaseTable from "../BaseTable";

interface AccountsTableProps {
  accounts: Account[];
  onRowClick: (row: Account) => void;
}

const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts,
  onRowClick,
}) => {
  return (
    <>
      <h1>Accounts</h1>
      <BaseTable data={accounts} onRowClick={onRowClick} />;
    </>
  );
};

export default AccountsTable;

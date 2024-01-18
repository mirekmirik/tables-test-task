import Pagination from "react-bootstrap/Pagination";

interface PaginationBaseProps {
  active: number;
  items: any[];
  setPage: React.Dispatch<React.SetStateAction<number>>
}

const PaginationBase: React.FC<PaginationBaseProps> = ({ active, items,setPage }) => {
  const totalPages = Math.ceil(items.length / 3);
  const updatedItems = []
  for (let number = 1; number <= totalPages; number++) {
    updatedItems.push(
      <Pagination.Item key={number} active={number === active} onClick={() => setPage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  const paginationBasic = (
    <div>
      <Pagination>{updatedItems}</Pagination>
    </div>
  );

  return paginationBasic;
};

export default PaginationBase;

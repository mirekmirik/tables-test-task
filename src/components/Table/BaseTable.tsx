import React, { useEffect, useMemo, useState } from "react";
import { Form, InputGroup, Table } from "react-bootstrap";
import PaginationBase from "../Pagination/PaginationBase";

interface BaseTableProps<T> {
  data: T[];
  onRowClick: (row: T) => void;
}

type FilterProps = {
  name: string;
  value: string;
};

const BaseTable: React.FC<BaseTableProps<any>> = ({ data, onRowClick }) => {
  // We memoized headers, for prevent calling sortingState in our JSX code every render.
  if (!data.length) {
    return <h1>There are no data</h1>;
  }
  const headers = useMemo(() => Object.keys(data[0]), [data]);

  // Create new state, with this state we will be manipulate data(filtering, pagination, sorting)
  const [updatedData, setUpdatedData] = useState(data);
  // Get sort value, for ex.: 'creationDate-asc'
  const [sorting, setSorting] = useState("");
  // Paging pagination(start from 1)
  const [page, setPage] = useState(1);
  // Filter values depending on inputs
  const [filter, setFilter] = useState<FilterProps[]>([]);

  // Pagination settings
  const itemsPerPage = 3;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginationData = updatedData.slice(startIndex, endIndex);

  // UI-select beautify sorting
  const sortingState = (headers: any[]) => {
    const refactoredData = headers.flatMap((header) => [
      {
        value: `${header}-asc`,
        name: `Sort By ${header} ASC`,
      },
      {
        value: `${header}-desc`,
        name: `Sort By ${header} DESC`,
      },
    ]);
    return refactoredData.map((data, i) => (
      <option key={i} value={data.value}>
        {data.name}
      </option>
    ));
  };

  // memoized sortingState
  const memoizedSortingState = useMemo(() => sortingState(headers), [headers]);

  // every time when our "sorting" state change, then call onSort function.
  useEffect(() => {
    const onSort = (sorting: string) => {
      // divide our sorting by name-by
      // for example our data is creationDate-asc
      const sortingSplit = sorting.split("-");
      const sortingData = {
        sortName: sortingSplit[0],
        sortBy: sortingSplit[1],
      };
      // do copy shallow of updatedData, because .sort() change straight our array.
      const onSortValues = [...updatedData].sort((a, b) => {
        const dataA = a[sortingData.sortName];
        const dataB = b[sortingData.sortName];

        // handle string comparison
        if (typeof dataA === "string" && typeof dataB === "string") {
          return sortingData.sortBy === "asc"
            ? dataA.localeCompare(dataB)
            : dataB.localeCompare(dataA);
        }

        // handle Date comparison
        if (dataA instanceof Date && dataB instanceof Date) {
          return sortingData.sortBy === "asc"
            ? dataA.getTime() - dataB.getTime()
            : dataB.getTime() - dataA.getTime();
        }

        // handle numeric comparison for other types
        return sortingData.sortBy === "asc" ? dataA - dataB : dataB - dataA;
      });
      // update data state
      setUpdatedData(onSortValues);
    };
    onSort(sorting);
  }, [sorting]);

  const filteringState = (headers: any[]) => {
    const onChangeFilter = (
      arr: FilterProps[],
      name: string,
      value: string
    ) => {
      // when we typing in input we want find input name in our state
      const findIdx = arr.findIndex((el) => el.name === name);

      if (findIdx >= 0) {
        // if input was found then we find our input from state and just update its value
        setFilter((prev) => {
          const updatedFilters = [...prev];

          updatedFilters[findIdx] = { name: name, value };
          return updatedFilters;
          // }
        });

        // if input wasn't found then we create new input in our state
      } else {
        setFilter((prev) => [...prev, { name, value }]);
      }
    };

    // return JSX
    return headers.map((header, i) => (
      <div key={i}>
        <InputGroup.Text id={`basic-addon-${header}`}>{header}</InputGroup.Text>
        <Form.Control
          onChange={(e) =>
            onChangeFilter(filter, e.target.name, e.target.value)
          }
          name={header}
          placeholder={`Enter ${header}`}
          aria-label={header}
          aria-describedby={`basic-addon-${header}`}
        />
      </div>
    ));
  };

  // when our filter state change, then we filter our state

  useEffect(() => {
    // loop all data
    const filteredData = data.filter((item) => {
      // loop filter state data
      for (const { name, value } of filter) {
        // item[name] is date
        if(item[name] instanceof Date) {
          const dateFilterValue = value.toLowerCase();
          const formattedDate = item[name].toLocaleDateString().toLowerCase();
          if (dateFilterValue && formattedDate.includes(dateFilterValue)) {
            continue; // continue to the next iteration of the loop
          }
        }
        // item[name] is not date
        if (!String(item[name]).toLowerCase().includes(value.toLowerCase())) {
          return false; // if any condition fails, exclude the item
        }
      }
      return true; // all conditions passed, include the item
    });
    setPage(1); // set page to 1
    setUpdatedData(filteredData); // update data
  }, [filter, data]);

  return (
    <>
      <div>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) => setSorting(e.target.value as string)}
        >
          {memoizedSortingState}
        </Form.Select>
      </div>
      <div>
        <InputGroup className="mb-3">{filteringState(headers)}</InputGroup>
      </div>
      <Table striped bordered hover>
        {/* Loop headers */}
        <thead>
          <tr>
            <th>№</th>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginationData.map((row, idx) => {
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                {headers.map((header, i) => (
                  <td key={i} onClick={() => onRowClick(row)}>
                    {row[header] instanceof Date
                      ? row[header].toLocaleDateString()
                      : row[header]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </Table>
      <PaginationBase active={page} items={updatedData} setPage={setPage} />
    </>
  );
};

export default BaseTable;

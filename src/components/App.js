import { demoData } from "../constants/demoData";
import { useState, useEffect } from "react";
import { tableSort } from "../utils/sort";
import { filtration } from "../utils/filtration";
import { chunk } from "../utils/chunking";
import * as _ from "lodash";

const App = () => {
  const [users, setUsers] = useState([]);
  const [sortingState, setSortingState] = useState({
    firstName: "unsorted",
    lastName: "unsorted",
    phone: "unsorted",
  });
  const [filter, updateFilter] = useState("");
  const [pagination, updatePagination] = useState({
    activePage: 1,
    maxPages: 1,
    list: [],
  });

  const setPagination = (data) => {
    const numberOfPages = Math.floor(data.length / 50);
    let maxPages = data.length % 50 > 0 ? numberOfPages + 1 : numberOfPages;
    updatePagination({ ...pagination, maxPages, list: chunk(data, 50) });
  };

  useEffect(() => {
    setUsers(demoData);
    setPagination(demoData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = ({ target }) => {
    const { sortedList, newSortingState } = tableSort(
      target.id,
      users,
      sortingState
    );
    setUsers(sortedList);
    setPagination(sortedList);
    setSortingState(newSortingState);
    updateFilter("");
  };

  const handleFiltration = ({ target }) => {
    updateFilter(target.value.toLowerCase());
    const filtered = users.filter((el) =>
      filtration(el, target.value.toLowerCase())
    );
    setPagination(filtered);
  };

  const changePage = ({ target }) => {
    updatePagination({
      ...pagination,
      activePage: parseInt(target.dataset.pagenumber),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderTable = () => {
    const { activePage, list } = pagination;
    return (
      <table>
        <thead>
          <tr>
            <td id="sort-by-first-name" onClick={handleSort}>
              First Name
            </td>
            <td id="sort-by-last-name" onClick={handleSort}>
              Last Name
            </td>
            <td id="sort-by-phone" onClick={handleSort}>
              Phone
            </td>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 &&
            list[activePage - 1].map(({ firstName, lastName, phone }) => (
              <tr key={_.uniqueId()}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{phone}</td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  };

  const renderTableNavigation = () => {
    const buttons = [];
    for (let i = 1; i <= pagination.maxPages; i++) {
      const classes =
        pagination.activePage === i ? `nav-btn active` : `nav-btn`;
      buttons.push(
        <button
          key={_.uniqueId()}
          data-pagenumber={i}
          onClick={changePage}
          className={classes}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <>
      <input
        type="text"
        placeholder="Filter"
        className="filter"
        value={filter}
        onChange={handleFiltration}
      />
      {renderTable()}
      <div className="nav-container">{renderTableNavigation()}</div>
    </>
  );
};

export default App;

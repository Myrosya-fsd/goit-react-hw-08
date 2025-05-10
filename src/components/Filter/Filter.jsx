import css from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/filters/slice";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter.query);

  const handleFilter = (evt) => {
    dispatch(setFilter(evt.currentTarget.value.toLowerCase()));
  };

  return (
    <div className={css.wrapper}>
      <div className={css.field}>
        <label htmlFor="filter" className={css.label}>
          Find contacts by name
        </label>

        <input
          onChange={handleFilter}
          value={filter}
          id="filter"
          type="text"
          name="filter"
          placeholder="Find contacts by name"
          required
          className={css.input}
        />
      </div>
    </div>
  );
};

export default Filter;

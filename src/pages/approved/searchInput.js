import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const SearchInput = ({ search, onSearchChange }) => {
  return (
    <Autocomplete
      id="search"
      freeSolo
      disableClearable
      options={[]}
      renderInput={(params) => (
        <TextField
          sx={{ width: 300 }}
          {...params}
          label="Search"
          variant="outlined"
          value={search}
          onChange={onSearchChange}
          size="small"
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
};

export default SearchInput;

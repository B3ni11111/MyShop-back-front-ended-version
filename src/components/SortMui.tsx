import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppContext } from "../App";
import { SortOption } from '../types/appContext';

export default function Sorted() {
    const { sort, setSort } = useAppContext();
 

  const handleChange = (event: SelectChangeEvent<SortOption>) => {
    setSort(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Sort</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sort}
          onChange={handleChange}
          autoWidth
          label="Sort"
        >
          <MenuItem value="">
            <em>recommended</em>
          </MenuItem>
          
          <MenuItem value={"lowToHigh"}>By price: low to high</MenuItem>
          <MenuItem value={"highToLow"}>By price: high to low</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
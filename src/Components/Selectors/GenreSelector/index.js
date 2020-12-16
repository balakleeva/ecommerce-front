import React, { useEffect } from 'react';
import useRequest from '../../../Utils/useRequest';
import GenreService from '../../../Services/GenreService';

function GenreSelector({ value, onChange, className }) {
  const { fetch, state: { error, isLoading, payload } } = useRequest(GenreService.getAll);

  useEffect(() => {
    fetch();
  }, []);
  return (<>
    {error && <div>{JSON.stringify(error)}</div>}
    {isLoading && <div>loader</div>}
    {payload && <select onChange={onChange} value={value}>
      {payload && payload.map(({ id, name, genreType }) => (
        <option key={id} value={id}>{name} - {genreType}</option>
      ))}
    </select>}
  </>);
}

export default GenreSelector;

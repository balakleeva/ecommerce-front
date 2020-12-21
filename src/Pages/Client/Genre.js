import React, { useCallback, useState } from 'react';
import useRequest from '../../Utils/useRequest';
import GenreService from '../../Services/GenreService';

function Genre() {
  const { fetch: createFetch, state: createState } = useRequest(GenreService.create);
  const [{ name, genreType }, setFields] = useState({ name: '', genreType: 'книга' });

  const onNameChange = useCallback((e) => {
    setFields({ name: e.target.value, genreType });
  }, [genreType]);

  const handleGenreChange = useCallback((e) => {
    setFields({ name, genreType: e.target.value });
  }, [name]);

  const handleCreate = useCallback((event) => {
    event.preventDefault();

    createFetch({ name, genreType }).then(data => {
    }).catch(err => console.error(err));

  }, [createFetch, name, genreType]);
  return <div>
    <h1>
      Authors
    </h1>
    <form onSubmit={handleCreate}>
      <div>
        <label htmlFor="name">Name:</label>
        <input value={name} onChange={onNameChange} type="text" name="name" />
      </div>
      <div>
        <label htmlFor="bio">Name:</label>
        <select value={genreType} onChange={handleGenreChange} name="genre">
          <option value="журнал">Журнал</option>
          <option value="книга">Книга</option>
        </select>
      </div>
      <button disabled={createState.isLoading} type="submit">Send</button>
    </form>
  </div>;
}

export default Genre;

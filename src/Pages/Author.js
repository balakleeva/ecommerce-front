import React, { useCallback, useState } from 'react';
import useRequest from '../Utils/useRequest';
import AuthorService from '../Services/AuhorService';

function Author() {
  const { fetch: createFetch, state: createState } = useRequest(AuthorService.create);
  const [{ name, bio }, setFields] = useState({ name: '', bio: '' });

  const onNameChange = useCallback((e) => {
    setFields({ name: e.target.value, bio });
  }, [bio]);

  const onBioChange = useCallback((e) => {
    setFields({ name, bio: e.target.value });
  }, [name]);

  const handleCreate = useCallback((event) => {
    event.preventDefault();

    createFetch({ name, bio }).then(data => {
    }).catch(err => console.error(err));

  }, [createFetch, name, bio]);
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
        <textarea value={bio} onChange={onBioChange} name="bio" />
      </div>
      <button disabled={createState.isLoading} type="submit">Send</button>
    </form>
  </div>;
}

export default Author;

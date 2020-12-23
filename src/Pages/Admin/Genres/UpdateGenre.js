import React, { useEffect } from 'react';
import Layout from '../../../Components/Admin/Layout';
import { StyledRow, StyledSelect } from '../../../Components/StyledComponents';
import { Field, Form, Formik } from 'formik';
import { Button, Input, Select } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import GenreService from '../../../Services/GenreService';
import useRequest from '../../../Utils/useRequest';
import Loader from '../../../Components/Loader';

const { Option } = Select;

const UpdateGenre = () => {
  const { push } = useHistory();
  const { id } = useParams();
  const { fetch, state: { payload, isLoading } } = useRequest(GenreService.get);

  useEffect(() => {
    fetch(id);
  }, [fetch, id]);

  return (
    <Layout>
      {isLoading && <Loader />}
      {payload && <Formik
        initialValues={{
          name: payload.name,
          genreType: payload.genreType,
        }}
        onSubmit={(values) => {
          GenreService.update(id, values).then(() => push('/admin/genres'));
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <StyledRow>
              <Field name="name">
                {({ field }) => (
                  <Input placeholder="Введите название" {...field} />
                )}
              </Field>
            </StyledRow>

            <StyledRow>
              <Field name="genreType">
                {({field}) => (
                  <StyledSelect
                    {...field}
                    onChange={(val) => setFieldValue('genreType', val)}
                  >
                    <Option value="книга">Книга</Option>
                    <Option value="журнал">Журнал</Option>
                  </StyledSelect>
                )}
              </Field>
            </StyledRow>

            <Button htmlType="submit">Обновить</Button>
          </Form>
        )}
      </Formik>}
    </Layout>
  );
};
export default UpdateGenre;

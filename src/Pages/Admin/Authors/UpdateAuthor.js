import React, { useEffect } from 'react';
import Layout from '../../../Components/Admin/Layout'
import { StyledRow } from '../../../Components/StyledComponents'
import { Formik, Form, Field } from 'formik'
import { Button, Input } from 'antd'
import { useHistory, useParams } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea'
import AuthorService from '../../../Services/AuthorService'
import useRequest from '../../../Utils/useRequest';
import Loader from '../../../Components/Loader';

const UpdateGenre = () => {
  const { push } = useHistory()
  const { id } = useParams();
  const {fetch, state: { payload, isLoading} } = useRequest(AuthorService.get);

  useEffect(() => {
    fetch(id);
  }, [fetch, id]);

  return (
    <Layout>
      {isLoading && <Loader />}
      {payload && <Formik
        initialValues={{
          name: payload.name,
          bio: payload.bio,
        }}
        onSubmit={(values) => {
          AuthorService.update(id, values).then(() => push('/admin/authors'));
        }}
      >
        {() => (
          <Form>
            <StyledRow>
              <Field name="name">
                {({ field }) => <Input placeholder="Введите имя" {...field} />}
              </Field>
            </StyledRow>

            <StyledRow>
              <Field name="bio">
                {({ field }) => (
                  <TextArea placeholder="Введите биографию" {...field} />
                )}
              </Field>
            </StyledRow>

            <Button htmlType="submit">Добавить</Button>
          </Form>
        )}
      </Formik>}
    </Layout>
  )
}
export default UpdateGenre

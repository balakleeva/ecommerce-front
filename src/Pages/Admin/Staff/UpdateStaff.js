import React, { useEffect } from 'react';
import { StyledRow, StyledSelect } from '../../../Components/StyledComponents';
import { Field, Form, Formik } from 'formik';
import { Button, Col, Input, Select } from 'antd';
import Layout from '../../../Components/Admin/Layout';
import { useHistory, useParams } from 'react-router-dom';
import AdminService from '../../../Services/AdminService';
import Row from 'antd/lib/row';
import * as Yup from 'yup';
import { stringValidator } from '../../../validators';
import useRequest from '../../../Utils/useRequest';
import Loader from '../../../Components/Loader';

const { Option } = Select;

const AddStaff = () => {
  const { push } = useHistory();
  const { id } = useParams();
  const { fetch, state: { isLoading, payload } } = useRequest(AdminService.get);

  useEffect(() => {
    fetch(id);
  }, [fetch, id]);

  return (
    <Layout>
      {isLoading && <Loader />}
      {payload &&
      <Formik
        initialValues={{
          name: payload.name,
          role: payload.role,
        }}
        validationSchema={Yup.object().shape({
          name: stringValidator,
          role: stringValidator,
        })}
        onSubmit={(values) => {
          AdminService.update(id, values).then(() => push('/admin/staff'));
        }}
      >
        {({ setFieldValue, values }) => (
          <Form>
            <StyledRow>
              <Col span={24}>
                <Row>Имя:</Row>
                <Row>
                  <Field name="name">
                    {({ field }) => (
                      <Input placeholder="Введите имя" {...field} />
                    )}
                  </Field>
                </Row>
              </Col>
            </StyledRow>
            <StyledRow>
              <Col span={24}>
                <Row>Должность:</Row>
                <Row>
                  <Field name="role">
                    {({ field }) => (
                      <StyledSelect
                        {...field}
                        onChange={(val) => setFieldValue('role', val)}
                      >
                        <Option value="мастер_чистоты">Мастер чистоты</Option>
                        <Option value="бухгалтер">Бухгалтер</Option>
                        <Option value="продавец">Продавец</Option>
                        <Option value="менеджер">Менеджер</Option>
                      </StyledSelect>
                    )}
                  </Field>
                </Row>
              </Col>
            </StyledRow>
            <Button htmlType="submit">Обновить</Button>
          </Form>
        )}
      </Formik>}
    </Layout>
  );
};

export default AddStaff;

import React, { useEffect, useState } from 'react';
import Layout from '../../../Components/Admin/Layout';
import useRequest from '../../../Utils/useRequest';
import { Button, Row, Table } from 'antd';
import { Link } from 'react-router-dom';
import Loader from '../../../Components/Loader';
import styled from 'styled-components';
import AdminService from '../../../Services/AdminService';
import StaffSearch from '../../../Components/Forms/Admin/StaffSearch';

const StyledButton = styled(Button)`
  margin-right: 10px;
`;

const Staff = () => {
  const [staff, setStaff] = useState(null);

  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(AdminService.getAll);

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    setStaff(payload);
  }, [payload]);

  const columns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Имя',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Должность',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: '',
      key: 'action',
      width: '100',
      render: (record) => (
        <Row>
          <StyledButton>
            <Link to={`/admin/edit-staff/${record.id}`}>Редактировать</Link>
          </StyledButton>
          <StyledButton>
            Уволить
          </StyledButton>
        </Row>
      ),
    },
  ];

  const handleSearch = (values) => {
    AdminService.search(values).then((response) => setStaff(response));
  };

  return (
    <Layout>
      <Row style={{ marginBottom: '10px' }}>
        <Button style={{ marginRight: '8px' }}>
          <Link to="/admin/add-staff">+ Добавить сотрудника</Link>
        </Button>
        <Link component={Button} to="/admin/purchases/staff-kpi">Производительность сотрудников</Link>
      </Row>
      <StaffSearch handleSearch={handleSearch} />
      {isLoading && <Loader />}
      {staff && <Table dataSource={staff} columns={columns} />}
    </Layout>
  );
};

export default Staff;

import React, { useEffect } from 'react'
import { Row, Table } from 'antd'
import { Content } from '../../../Components/StyledComponents'
import useRequest from '../../../Utils/useRequest'
import BookService from '../../../Services/BookService'
import Text from 'antd/lib/typography/Text'
import { Doughnut } from '@reactchartjs/react-chart.js'
import PurchaseService from '../../../Services/PurchaseService';

const MostProductiveStaff = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(PurchaseService.staffKpi)

  useEffect(() => {
    fetch()
  }, [])

  const columns = [
    {
      title: 'ID Сотрудника',
      key: 'staff.id',
      dataIndex: 'staff.id',
      render: (data, rec) => rec.staff.id
    },
    {
      title: 'Имя сотрудника',
      key: 'staff.id',
      dataIndex: 'staff.name',
      render: (data, rec) => rec.staff.name
    },
    {
      title: 'Сколько раз участвовал в продажах',
      key: 'staff.id',
      dataIndex: 'count',
    },
  ]

  return (
    <Content>
      {payload && (
        <>
          <Row>
            <Text style={{ fontSize: '24px' }}>Самый продуктивный сотрудник:</Text>
          </Row>
          <hr />
          <Text>График с продажами</Text>
          <Doughnut
            width={100}
            height={50}
            data={{
              labels: payload.map((item) => item.staff.name),
              datasets: [
                {
                  label: '# of Votes',
                  data: payload.map((item) => item.count),
                  backgroundColor: payload.map(
                    (item) =>
                      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                        Math.random() * 255
                      )}, ${Math.floor(Math.random() * 255)})`
                  ),
                  borderColor: payload.map(
                    (item) =>
                      `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
                        Math.random() * 255
                      )}, ${Math.floor(Math.random() * 255)})`
                  ),
                  borderWidth: 1,
                },
              ],
            }}
          />
          <Table pagination={false} columns={columns} dataSource={payload} />
        </>
      )}
    </Content>
  )
}

export default MostProductiveStaff

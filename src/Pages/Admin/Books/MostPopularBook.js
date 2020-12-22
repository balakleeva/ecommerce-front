import React, { useEffect } from 'react'
import { Row, Table } from 'antd'
import { Content } from '../../../Components/StyledComponents'
import useRequest from '../../../Utils/useRequest'
import BookService from '../../../Services/BookService'
import Text from 'antd/lib/typography/Text'
import { Doughnut } from '@reactchartjs/react-chart.js'

const MostPopularBook = () => {
  const {
    fetch,
    state: { error, isLoading, payload },
  } = useRequest(BookService.mostPopular)

  useEffect(() => {
    fetch()
  }, [])

  const columns = [
    {
      title: 'ID Книги',
      key: 'BookId',
      dataIndex: 'BookId',
    },
    {
      title: 'Название',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Сколько раз купили',
      key: 'book_count',
      dataIndex: 'book_count',
    },
  ]

  return (
    <Content>
      {payload && (
        <>
          <Row>
            <Text style={{ fontSize: '24px' }}>Самая популярная книга:</Text>
            <Text strong style={{ fontSize: '24px', marginLeft: '10px' }}>
              {payload[0].name}
            </Text>
          </Row>
          <hr />
          <Text>График с количеством покупок</Text>
          <Doughnut
            width={100}
            height={50}
            data={{
              labels: payload.map((item) => item.name),
              datasets: [
                {
                  label: '# of Votes',
                  data: payload.map((item) => item.book_count),
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
          <Table columns={columns} dataSource={payload} />
        </>
      )}
    </Content>
  )
}

export default MostPopularBook

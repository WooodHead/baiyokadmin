import React, { useEffect, useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DateUtils } from 'react-day-picker'
import { Col, Container, Row, Spinner, Form, Button } from 'react-bootstrap'
import dateFnsFormat from 'date-fns/format'
import dateFnsParse from 'date-fns/parse'
import { useQueryClient, useMutation } from 'react-query'
import ClosedDate from '../components/common/ClosedDate'

import api from '../services/API'

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, new Date(), { locale })
  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale })
}

const Dates = ({}) => {
  const { data: dates, isLoading, isError } = api.dateConfigsQuery()
  const [date, setDate] = useState(null)
  const [isButtonLoading, setButtonLoading] = useState(false)
  const FORMAT = 'dd-MM-yyyy'
  useEffect(() => {
    console.log('date', date)
  }, [date])
  const queryClient = useQueryClient()
  const { mutate: addDate } = useMutation(() => api.addDate(date), {
    onMutate: () => {
      setButtonLoading(true)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('dateConfigs')
      setButtonLoading(false)
    },
    onError: () => {
      setButtonLoading(false)
    },
  })
  return (
    <section className='section section-main'>
      <Container>
        <Form.Group
          controlId='formDate'
          className='u-margin-bottom-med text-center'>
          <DayPickerInput
            formatDate={formatDate}
            onDayChange={setDate}
            format={FORMAT}
            parseDate={parseDate}
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
          />
          <Button
            variant='outline-success'
            className='btn-medium text-uppercase ml-2'
            disabled={isButtonLoading}
            onClick={() => addDate()}>
            {isButtonLoading && (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            )}{' '}
            <span>Add{isButtonLoading ? 'ing' : ''}</span>
          </Button>
        </Form.Group>
        {isLoading ? (
          <>
            <Spinner animation='border' variant='primary' className='mr-2' />{' '}
            Loading Dates...
          </>
        ) : (
          <>
            <Row>
              <Col md={12}>
                <div className='bg-white rounded border shadow-sm mb-4'>
                  {dates &&
                    dates.map((date) => (
                      <ClosedDate key={date._id} date={date} />
                    ))}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </section>
  )
}

export default Dates

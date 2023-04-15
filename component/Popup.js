import { POKEMON_EVALUTION } from '@/GraphQL/Queries'
import { useQuery } from '@apollo/client'
import { Button, Group, Modal } from '@mantine/core'
import React from 'react'
import { Badge, Card } from 'react-bootstrap'
import LoadingSpinner from './LoadingSpinner'

export const Popup = ({ id, name, opened, setOpened }) => {
  const { loading, data, error } = useQuery(POKEMON_EVALUTION, {
    variables: {
      id: id,
      name: name
    }
  })

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Pokémon evolutions"
        centered
      >
        {data?.pokemon ?
          (data?.pokemon?.evolutions?.length > 0 ?
            data?.pokemon?.evolutions?.map((evol, i) => {

              return (
                <Card className='pokemon-card pokemon-modal-card'>
                  <div className='img-card' key={i}>
                    <Card.Img variant="top" src={evol.image} alt="Card image cap" />
                  </div>
                  <Card.Body>
                    <Card.Title>{evol.name}
                      <span className='pokemon-number mx-2'>{evol.number}</span>
                    </Card.Title>
                    <Card.Text>
                      {
                        evol?.types?.map(item =>
                          <Badge bg="primary" className={`background-color-${item.toLowerCase()}`}>{item}</Badge>
                        )
                      }
                    </Card.Text>
                  </Card.Body>
                </Card>
              )
            })
            :
            "No Evolutions")
          : <LoadingSpinner />}
      </Modal>
    </>
  )
}

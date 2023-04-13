import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_POKEMONS } from '@/GraphQL/Queries';
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap';
import Link from 'next/link';
import InfiniteScroll from 'react-infinite-scroll-component';
import LoadingSpinner from '@/component/LoadingSpinner';

const PokemonList = () => {
    const [pageCount, setPageCount] = useState(20);
    const [list, setList] = useState([]);
    const [load, setLoad] = useState(true)

    const { loading, data } = useQuery(FETCH_POKEMONS, {
        variables: {
            first: pageCount,
        },
    });

    useEffect(() => {
        if (data) {
            let updateData = []
            if (data?.pokemons?.length > 20) {
                updateData = data?.pokemons.filter(function (obj) { return list.indexOf(obj) == -1; });
                setList(updateData)
            }
            if (data?.pokemons?.length == 20) {
                setList(prevList => [...prevList, ...data.pokemons]);
            }
        }
    }, [data, load]);

    const loadMoreScroll = () => {
        console.log(55,load)
        if (!load) {
            setTimeout(() => {
                setPageCount(prevPageCount => prevPageCount + 20);
            }, 1000);
        }
    };

    const loadMorePokemon = () => {
        console.log(66,load)
        setLoad(false)
        setPageCount(prevPageCount => prevPageCount + 20);
    };

    return (
        <div className='my-5'>
            {list.length > 0 ? (
                <InfiniteScroll
                    dataLength={list.length}
                    next={loadMoreScroll}
                    hasMore={true}
                    loader={
                        loading ? <div className="load-more-cards"><LoadingSpinner /></div> : ""}
                >
                    <Container>
                        <Row>
                            {list && list?.map(pokemon => {
                                return (
                                    <Col lg="3">
                                        <Card className='pokemon-card'>
                                            <Link href={{
                                                pathname: `/detail/${pokemon.name}`,
                                                query: { id: pokemon.id, name: pokemon.name }
                                            }}>
                                                <Card.Img variant="top" src={pokemon.image} alt="Card image cap" />
                                            </Link>
                                            <Card.Body>
                                                <p className='pokemon-number'>{pokemon.number}</p>
                                                <Card.Title>{pokemon.name}</Card.Title>
                                                <Card.Text>
                                                    {
                                                        pokemon?.types?.map(item =>
                                                            <Badge bg="primary" className={`background-color-${item.toLowerCase()}`}>{item}</Badge>
                                                        )
                                                    }
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })}
                            {
                                load && <Button className='load-more-btn' onClick={() => loadMorePokemon()}>Load More Pokemon</Button>
                            }
                        </Row>
                    </Container>
                </InfiniteScroll>
            )
                : <LoadingSpinner />
            }
        </div>
    );
};

export default PokemonList;
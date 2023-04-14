import { FETCH_SINGLE_POKEMON } from "@/GraphQL/Queries";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Popup } from "@/component/popup/Popup";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import LoadingSpinner from "@/component/spinner/LoadingSpinner";

const PokemonDetail = () => {
  const { query } = useRouter();
  const [opened, setOpened] = useState(false);

  const { loading, data } = useQuery(FETCH_SINGLE_POKEMON, {
    variables: {
      id: query?.id,
      name: query?.name,
    },
  });

  return (
    <div className="detail-page-wrapper my-5">
      <Container>
        <Row>
          {!loading ? (
            <>
              <Col lg="12">
                <h1 className="name-tag-name">
                  {data?.pokemon?.name} {data?.pokemon?.number}
                </h1>
              </Col>
              <Col lg="5">
                <div className="pokemon-image-wrapper">
                  <img src={data?.pokemon?.image} alt="" />
                </div>
              </Col>
              <Col lg="7">
                <div className="pokemon-info">
                  There is a plant seed on its back right from the day this
                  Pokémon is born. The seed slowly grows larger.
                </div>
                <ul className="pokemon-detail">
                  <li>
                    Height:{" "}
                    <span>
                      {data?.pokemon?.height?.minimum} -{" "}
                      {data?.pokemon?.height?.maximum}
                    </span>
                  </li>
                  <li>
                    Weight:{" "}
                    <span>
                      {data?.pokemon?.weight?.minimum} -{" "}
                      {data?.pokemon?.weight?.maximum}
                    </span>
                  </li>
                  <li>
                    Classification: <span>{data?.pokemon?.classification}</span>
                  </li>
                  <li>
                    Resistant:{" "}
                    <span>{data?.pokemon?.resistant?.join(", ")}</span>
                  </li>
                </ul>
                <h4 className="page-sub-title">Type</h4>
                <div className="weakness-box">
                  <Row>
                    {data?.pokemon?.types?.map((item, i) => (
                      <Col lg="3" key={i}>
                        <Badge
                          variant="primary"
                          className={`background-color-${item.toLowerCase()}`}
                        >
                          {item}
                        </Badge>
                      </Col>
                    ))}
                  </Row>
                </div>

                <h4 className="page-sub-title">Weaknesses</h4>
                <div className="weakness-box">
                  <Row>
                    {data?.pokemon?.weaknesses?.map((item, i) => (
                      <Col lg="3" key={i}>
                        <Badge
                          variant="primary"
                          className={`background-color-${item.toLowerCase()}`}
                        >
                          {item}
                        </Badge>
                      </Col>
                    ))}
                  </Row>
                </div>

                <Button
                  className="load-more-btn"
                  onClick={() => {
                    setOpened(true);
                  }}
                >
                  Pokemon's evolutions
                </Button>
              </Col>
            </>
          ) : (
            <LoadingSpinner />
          )}
        </Row>
      </Container>
      {opened && (
        <Popup
          id={query.id}
          name={query.name}
          opened={opened}
          setOpened={setOpened}
        />
      )}
    </div>
  );
};

export default PokemonDetail;

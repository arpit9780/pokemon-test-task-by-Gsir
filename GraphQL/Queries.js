import { gql } from "@apollo/client";

export const FETCH_POKEMONS = gql`
query pokemons($first: Int!){
  pokemons(first: $first){
    id
    number
    name
    types
    image
  }
}
`

export const FETCH_SINGLE_POKEMON = gql`
query pokemon($id: String, $name: String){
pokemon(id: $id, name: $name){
  id
  number
  name
  weight{
    minimum
    maximum
  }
  height{
    minimum
    maximum
  }
  classification
  types
  resistant
  weaknesses
  image
}
}
`
export const POKEMON_EVALUTION = gql`
query pokemon($id: String, $name: String){
  pokemon(id: $id, name: $name){
    id
    name
    evolutions{
      id
      number
      name
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
}
`
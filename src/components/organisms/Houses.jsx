import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchHouses, setShowHouses } from '../../store/houses.slice'
import { Button } from '../atoms'
import { HouseCard } from '../molecules'
import { useFetch } from '../../hooks'
import { FlexBox, Grid } from '../../styles'
import { urls } from '../../constants'

const HousesStyled = styled(FlexBox)``

const byCity = (house, filterCity) => {
  if (!filterCity) return true
  return house.city === filterCity
}
const byType = (house, filterType) => {
  if (!filterType) return true
  return house.type === filterType
}

const filterHouses = (house, filterCity, filterType) =>
  byCity(house, filterCity) && byType(house, filterType)

function Houses() {
  const dispatch = useDispatch()
  const { allIds, byId, showHouses, filterCity, filterType } = useSelector(
    (s) => s.houses,
  )

  useEffect(() => {
    dispatch(fetchHouses())
  }, [dispatch])

  const { loading, isError, isSuccess } = useFetch(urls.houses)

  return (
    <HousesStyled>
      {loading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <Grid gridGap="32px">
          {allIds
            .filter((id) => filterHouses(byId[id], filterCity, filterType))
            .slice(0, showHouses)
            .map((id) => (
              <HouseCard
                key={id}
                title={byId[id].title}
                price={`${byId[id].price}€`}
                img={byId[id].image}
                link=""
              />
            ))}
        </Grid>
      )}
      <FlexBox align="center">
        {allIds.length > showHouses && (
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => dispatch(setShowHouses(showHouses + 9))}
          >
            Load more
          </Button>
        )}
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``

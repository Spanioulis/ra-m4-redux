import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { fetchHouses } from '../../store/houses.slice'
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
  const [currentPage, setCurrentPage] = useState(1)
  const totalHouses = 9 * currentPage

  const dispatch = useDispatch()
  const { allIds, byId, filterCity, filterType } = useSelector((s) => s.houses)

  useEffect(() => {
    dispatch(fetchHouses(currentPage))
  }, [dispatch, currentPage])

  const { loading, isError, isSuccess } = useFetch(urls.houses)

  return (
    <HousesStyled>
      {loading && <div>Loading...</div>}
      {isError && <div>Error</div>}
      {isSuccess && (
        <Grid gridGap="32px">
          {allIds
            .filter((id) => filterHouses(byId[id], filterCity, filterType))
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
        {allIds.length >= totalHouses && (
          <Button
            style={{ marginTop: '2rem' }}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Load more
          </Button>
        )}
      </FlexBox>
    </HousesStyled>
  )
}

export default styled(Houses)``

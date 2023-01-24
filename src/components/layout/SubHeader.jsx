import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  fetchHouses,
  setFilterCity,
  setFilterType,
} from '../../store/houses.slice'
import { colors, Container, dimensions, FlexBox } from '../../styles'
import { Button, Icon } from '../atoms'
import { SelectGroup } from '../molecules'

const SubHeaderStyled = styled(FlexBox)`
  padding-top: ${dimensions.spacing.xl};
  padding-bottom: ${dimensions.spacing.xl};
  background-color: ${colors.clearBlueBg};
  border-top: 1px solid ${colors.border.clearBlueBg};
  border-bottom: 1px solid ${colors.border.clearBlueBg};
`

const FormStyled = styled(FlexBox).attrs({ as: 'form' })`
  ${SelectGroup} {
    &:first-of-type {
      padding: 0.5rem 1rem;
      border-radius: 4px;
      margin-right: 1rem;
    }
  }

  ${Button} {
    background-color: ${colors.blue};
  }
`

function SubHeader({ ...props }) {
  const dispatch = useDispatch()
  const { cities, types } = useSelector((s) => s.houses)

  useEffect(() => {
    dispatch(fetchHouses())
  }, [dispatch])

  return (
    <SubHeaderStyled {...props}>
      <Container>
        <FormStyled direction="row" align="center">
          <SelectGroup
            id="type"
            label="Tipo"
            defaultText="Piso, chalet o garaje..."
            hideLabel
            options={types.map((type) => ({
              value: type,
              text: `${type[0].toUpperCase()}${type.slice(1)}`,
            }))}
            onChange={(e) => dispatch(setFilterType(e.target.value))}
          />

          <SelectGroup
            id="ciudad"
            label="Ciudad"
            defaultText="Madrid, Barcelona o Zaragoza..."
            hideLabel
            options={cities.map((city) => ({
              value: city,
              text: `${city[0].toUpperCase()}${city.slice(1)}`,
            }))}
            onChange={(e) => dispatch(setFilterCity(e.target.value))}
          />

          <Button
            onClick={() => {
              dispatch(setFilterCity(''))
              dispatch(setFilterType(''))
            }}
          >
            <Icon icon="search" />
          </Button>
        </FormStyled>
      </Container>
    </SubHeaderStyled>
  )
}

export default styled(SubHeader)``

import { Link } from "react-router-dom"
import styled from "styled-components"

const Image = styled(Link)`
  position: relative;
  margin-bottom: 5px;
  display: block;
  width: 400px;
  height: 120px;

  background: ${props => `url(${props.img})`};
  background-position: center;
  background-size: cover;

  cursor: pointer;
  `


const Title = styled.span`
  position: absolute;
  right: 10px;
  bottom: 10px;

  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 4px rgb(0, 0, 0, 0.6) ;

  cursor: pointer;
`

export const Thumbnail = ({ data }) => {

  return (
    <Image to={`/recipe_details/${data._id}`} img={data.photo}>
      <Title>{data.title}</Title>
    </Image>
  )
}
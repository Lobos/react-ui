import Icon from '../../src/Icon'

const stars = [
  <Icon size={2} style={{color: 'gold'}}>
    &#xe607
  </Icon>,
  <Icon size={2} style={{color: 'gold'}}>
    &#xe606
  </Icon>
]

const hearts = [
  <Icon size={2} icon='favorite-outline' style={{color: 'red'}} />,
  <Icon size={2} icon='favorite' style={{color: 'red'}} />
]

export const compClass = {
  heartIcon: 'fa fa-favorite fa-2x'
}

export const themes = {stars, hearts}

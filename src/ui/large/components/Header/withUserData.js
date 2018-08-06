import { connect } from 'react-redux'

import { getFavorites } from 'app/selectors/user'

const mapStateToProps = state => ({
  favorites: getFavorites(state),
})

export default WrappedComponent =>
  connect(
    mapStateToProps,
    {},
  )(WrappedComponent)

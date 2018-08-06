import { connect } from 'react-redux'
import { isdesktopHeaderSignIn } from 'app/selectors/experiments'
import { isUserLoggedIn } from 'app/selectors/user'
import SignInButton from './signInButton'

const mapStateToProps = state => ({
  isLoggedIn: isUserLoggedIn(state),
  featureActive: isdesktopHeaderSignIn(state),
})

export default connect(mapStateToProps, null)(SignInButton)

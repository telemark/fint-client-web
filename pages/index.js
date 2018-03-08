import { Component, Fragment } from 'react'
import LoginForm from '../components/LoginForm'
import DataView from '../components/DataView'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.getData = this.getData.bind(this)
  }

  getData () {
    const token = window.sessionStorage.getItem('token')
    const info = JSON.parse(window.sessionStorage.getItem('info'))
    this.setState({ token, info })
  }

  componentDidMount () {
    this.getData()
  }

  render () {
    return (
      <Fragment>
        {
          this.state.token
            ? <DataView token={this.state.token} username={this.state.info.username} orgId={this.state.info.orgId} />
            : <LoginForm getData={this.getData} />
        }
      </Fragment>
    )
  }
}

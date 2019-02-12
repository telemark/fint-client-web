import { Component, Fragment } from 'react'
import dynamic from 'next/dynamic'
import Router from 'next/router'
import getData from '../lib/get-data'
import { Header, Layout } from './styles'
import { isUrl } from 'check-valid-url'
import { indexLinks, baseUrl } from '../config'
const ReactJson = dynamic(import('react-json-view'), { ssr: false })

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = { loading: true }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount () {
    Router.asPath !== '/'
      ? await this.handleClick({ value: baseUrl + Router.asPath })
      : this.setState({ jsonData: indexLinks, loading: false })
  }

  async handleClick ({ value }) {
    if (value.includes(baseUrl) && isUrl(value)) {
      this.setState({ loading: true, error: false })
      try {
        const result = await getData(value, this.props.token, this.props.orgId)
        const { pathname } = new window.URL(value)
        this.setState({ jsonData: result, loading: false })
        window.history.pushState(pathname, pathname, pathname)
        // Router.push('/', pathname, { shallow: true })
      } catch (error) {
        this.setState({ loading: false, error: error.response && error.response.data ? error.response.data : error.message })
      }
    }
  }

  render () {
    return (
      <Fragment>
        <Layout>
          <Header username={this.props.username} />
        </Layout>
        {
          this.state.loading
            ? 'Loading ...'
            : this.state.error
              ? <div>{this.state.error}</div>
              : <ReactJson
                src={this.state.jsonData}
                name={false}
                enableClipboard={false}
                indentWidth={2}
                displayDataTypes={false}
                onSelect={this.handleClick}
              />
        }
      </Fragment>
    )
  }
}

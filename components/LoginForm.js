import { Component } from 'react'
import getToken from 'fint-get-token'
import { Layout, Field, Input, Button, Header } from './styles'
import { tokenUrl } from '../config'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit (e) {
    e.preventDefault()
    this.setState({ loading: true, token: false, error: false })
    const info = {
      url: tokenUrl,
      orgId: e.target.orgId.value,
      clientId: e.target.clientId.value,
      clientSecret: e.target.clientSecret.value,
      username: e.target.username.value,
      password: e.target.password.value
    }

    window.sessionStorage.setItem('info', JSON.stringify(info))

    const options = {
      url: info.url,
      orgId: info.orgId,
      credentials: {
        client: {
          client_id: info.clientId,
          client_secret: info.clientSecret
        },
        auth: {
          username: info.username,
          password: info.password,
          grant_type: 'password'
        }
      }
    }

    try {
      const { access_token: token } = await getToken(options)
      window.sessionStorage.setItem('token', token)
      this.props.getData()
    } catch (error) {
      this.setState({ error: error.message, loading: false })
    }
  }

  render () {
    return (
      <div>
        <Layout>
          <Header />
          <div className='main'>
            <form onSubmit={this.handleSubmit}>
              <div>
                <Field name='client id'>
                  <Input name='clientId' autoFocus='true' />
                </Field>
                <Field name='client secret'>
                  <Input name='clientSecret' />
                </Field>
                <Field name='username'>
                  <Input name='username' />
                </Field>
                <Field name='password'>
                  <Input name='password' />
                </Field>
                <Field name='orgId'>
                  <Input name='orgId' />
                </Field>
                <Button type='submit' value='Login' />
              </div>
            </form>
          </div>
        </Layout>
        <div>
          {
            this.state.loading && <div>Laster ...</div>
          }
          {
            this.state.error && <pre className='error'>{this.state.error}</pre>
          }
        </div>
        <style jsx>
          {`
            .main {
              grid-column-start: 2;
              grid-area: content;
            }
            pre {
              background-color: #ebf1f5;
              font-family: monospace;
              border: 1px solid #bbccdd;
              word-wrap: break-word;
              white-space: pre-wrap;
            }
            .error {
              background-color: #ffe7e7;
              border: 1px solid #ddbbbb;
            }
          `}
        </style>
      </div>
    )
  }
}

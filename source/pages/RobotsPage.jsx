import React from 'react'
import axios from 'axios'
import { Segment, Table, Header, Message, Button } from 'semantic-ui-react'
import FullPageGrid from '../components/FullPageGrid'
import CreateRobot from '../components/CreateRobot'
import UpdateRobot from '../components/UpdateRobot'
import { ROBOT_ENDPOINT } from '../endpoints'

class RobotsPage extends React.Component {
  constructor() {
    super()
    this.state = { robots: [], loading: true, error: '', visibleTokens: [] }
    this.timer = null
    this.readRobots = this.readRobots.bind(this)
    this.deleteRobot = this.deleteRobot.bind(this)
    this.displayError = this.displayError.bind(this)
    this.hideError = this.hideError.bind(this)
    this.hideRobotTokens = this.hideRobotTokens.bind(this)
    this.toggleTokenVisibility = this.toggleTokenVisibility.bind(this)
  }

  displayError(err) {
    this.setState({ error: err.response.data.error })
  }

  hideError() {
    this.setState({ error: '' })
  }

  readRobots() {
    axios
      .get(ROBOT_ENDPOINT)
      .then(response =>
        this.setState({ robots: response.data, loading: false })
      )
      .catch(this.displayError)
  }

  deleteRobot(id) {
    axios
      .delete(`${ROBOT_ENDPOINT}/${id}`)
      .then(response => this.readRobots())
      .catch(this.displayError)
  }

  hideRobotTokens(id, token) {
    if (!~this.state.visibleTokens.indexOf(id)) {
      return token.replace(/[a-f0-9]/g, 'x')
    } else {
      return token
    }
  }

  toggleTokenVisibility(id) {
    const index = this.state.visibleTokens.indexOf(id)
    if (!~index) {
      this.setState({ visibleTokens: [...this.state.visibleTokens, id] })
    } else {
      this.setState({
        visibleTokens: this.state.visibleTokens.filter(
          visibleToken => visibleToken !== id
        )
      })
    }
  }

  componentWillMount() {
    this.timer = setInterval(() => this.readRobots(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    this.timer = null
  }

  render() {
    const { robots, loading, error } = this.state
    return (
      <FullPageGrid>
        {error && (
          <Message
            error
            onDismiss={this.hideError}
            content={error}
            error={!!error}
          />
        )}
        <Segment raised loading={loading}>
          <Header as="h1">Robots</Header>
          <CreateRobot
            updateHandler={this.readRobots}
            errorHandler={this.displayError}
          />
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Map</Table.HeaderCell>
                <Table.HeaderCell>X Position</Table.HeaderCell>
                <Table.HeaderCell>Y Position</Table.HeaderCell>
                <Table.HeaderCell>Angle</Table.HeaderCell>
                <Table.HeaderCell>Token</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {robots.length && !loading ? (
                robots.map(robot => (
                  <Table.Row key={robot._id}>
                    <Table.Cell>{robot.name || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.status || 'not available'}</Table.Cell>
                    <Table.Cell>{robot.map || 'not available'}</Table.Cell>
                    <Table.Cell collapsing>{robot.xPos}</Table.Cell>
                    <Table.Cell collapsing>{robot.yPos}</Table.Cell>
                    <Table.Cell collapsing>{robot.angle}</Table.Cell>
                    <Table.Cell>
                      <b>
                        <pre>
                          {this.hideRobotTokens(robot._id, robot.token)}
                        </pre>
                      </b>
                    </Table.Cell>
                    <Table.Cell collapsing>
                      <Button
                        color="blue"
                        icon="eye"
                        onClick={() => this.toggleTokenVisibility(robot._id)}
                      />
                      <UpdateRobot
                        entity={robot}
                        updateHandler={this.readRobots}
                        errorHandler={this.displayError}
                      />
                      <Button
                        color="red"
                        icon="trash"
                        onClick={() => this.deleteRobot(robot._id)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell>No robots added yet!</Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </FullPageGrid>
    )
  }
}

export default RobotsPage
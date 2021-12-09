import './App.css';
import React, { Component } from "react";
import Column from "../src/components/coulmns/Coulmns"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button'
import ChartComp from '../src/components/chart/Chart';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from "../src/Initialstates"

class App extends Component {

  state = initialData

  componentDidMount() {
    const apiCalling = async (api) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      let mounted = true

      await fetch(api, requestOptions)
        .then(response => response.json())
        .then(items => {
          if (mounted) {
            items.forEach((element) => {
              this.setState({
                ...this.state,
                tasks: {
                  ...this.state.tasks,
                  [element.name.replace(' ', '_')]: element
                }
              })
            })
            let array = []
            Object.keys(this.state.tasks).forEach(element => {
              array.push(element)
            })
            this.state.columns['column_1'].taskIds = array
            this.setState({
              ...this.state,
            })
          }
        })
        .catch(error => console.log('error', error));
      return () => mounted = false;

    }
    apiCalling('https://plotter-task.herokuapp.com/columns')
  }
  handelClear = (e) => {
    e.preventDefault();
    let array = []
    Object.keys(this.state.tasks).forEach(element => {
      array.push(element)
    })
    this.state.columns['column_1'].taskIds = array
    this.state.columns['column_2'].taskIds = []
    this.state.columns['column_3'].taskIds = []
    this.setState({
      ...this.state,
    })

  }
  onDragEnd = result => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)
      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
      return
    }
    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds
    }

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    this.setState(newState)
  }

  render() {
    return (
      <div className="App">

        <Container className="height-full no-padding" fluid>
          <Row className="mx-0 height-full ">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Col className="no-padding" xs={12} md={3}>

                <div className="coulmns-container">
                  <div className="coulmns-header">
                    <h2 className="coulmns-title">Coulmns</h2>
                  </div>
                  <div className="coulmns-items">
                    <div className="coulmns-container">
                      {this.state.columnOrder.map((columnId, idx) => {
                        if (idx === 0) {
                          const column = this.state.columns[columnId]
                          const tasks = column.taskIds.map(
                            taskId => this.state.tasks[taskId]
                          )
                          return (
                            <Column key={column.id} column={column} className="app-Coulmn" tasks={tasks} />
                          )
                        } return null
                      })}
                    </div>
                  </div>
                </div>
              </Col>
              <Col className="no-padding justify-content-center" xs={12} md={9}>
                <h1 className="plotter-head">Plotter</h1>

                {this.state.columnOrder.map((columnId, idx) => {
                  if (idx > 0) {
                    const column = this.state.columns[columnId]
                    const tasks = column.taskIds.map(
                      taskId => this.state.tasks[taskId]
                    )
                    return (
                      <div key={idx} className="app-DimensionMeasures">
                        <span>{idx === 1 ? 'Dimension' : 'Measures'}</span>
                        <div className="dimensionMeasures-container">
                          <div className="dimensionMeasures-mainAcontainer">
                            <div className="dimensionMeasures-draggableArea">
                              <Column key={column.id} column={column} className="app-Coulmn" tasks={tasks} />
                            </div>
                            <Button onClick={this.handelClear} className="dimensionMeasures-button" variant="outline-primary">Clear</Button>
                          </div>
                        </div>
                      </div>
                    )
                  } return null
                })}

                <div className="app-chart">
                  <ChartComp />
                </div>
              </Col>
            </DragDropContext>
          </Row>
        </Container>

      </div>
    );
  }
}

export default App;

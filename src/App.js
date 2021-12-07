import './App.css';
import Coulmns from "../src/components/coulmns/Coulmns"
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChartComp from '../src/components/chart/Chart'

function App() {
  return (
    <div className="App">
      <Container className="height-full no-padding" fluid>
        <Row className="mx-0 height-full ">
          <Col className="no-padding" xs={12} md={3}>
            <Coulmns className="app-Coulmn" />
          </Col>
          <Col className="no-padding justify-content-center" xs={12} md={9}>
            <h1 className="plotter-head">Plotter</h1>
            <div className="chart-container">
              <ChartComp />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;

import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Container } from "react-bootstrap";
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keywords, setKeywords] = useState(1);
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const changeSlider = e => {
    setKeywords(e.target.value);
  };

  const changeText = e => {
    setText(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/keywords', {
      text: text,
      keywords: keywords,
    }).then(res => {
      setResult(res.data.join('\n'));
    })
      .catch(err => {
        console.log(err);
      });
  };


  return (
    <Container className="mt-2">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicText">
          <Form.Label>Text to analyze:</Form.Label>
          <Form.Control as="textarea" placeholder="Enter text" rows="5" onChange={changeText} required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicRange">
          <Form.Label>Number of keyword phrases: {keywords}</Form.Label>
          <Form.Range min={1} max={5} defaultValue={1} onChange={changeSlider} />
        </Form.Group>
        <Button className="mb-3" variant="primary" type="submit">
          Extract
        </Button>
      </Form>
      <Form.Group controlId="formBasicResult">
        <Form.Label className="mb-3">Result:</Form.Label>
        <Form.Control as="textarea" value={result} rows="3" />
      </Form.Group>
    </Container>
  );
}

export default App;

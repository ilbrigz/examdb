import type { NextPage } from 'next';
import {
  Textarea,
  Container,
  Button,
  Radio,
  RadioGroup,
  ActionIcon,
} from '@mantine/core';
import { Check } from 'tabler-icons-react';
import fetcher from '../lib/fetcher';
import { useState, useRef, useEffect } from 'react';

const Home: NextPage = () => {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [e, setE] = useState('');
  const [correctChoice, setCorrectChoice] = useState('');
  const onSelectCorrectItem = (ltr: string) => {
    switch (ltr) {
      case 'a':
        setCorrectChoice('a');
        break;
      case 'b':
        setCorrectChoice('b');
        break;
      case 'c':
        setCorrectChoice('c');
        break;
      case 'd':
        setCorrectChoice('d');
        break;
      case 'e':
        setCorrectChoice('e');
        break;

      default:
        break;
    }
  };
  const addQuestion = async () => {
    if (!q || !a || !b || !c || !d) {
      alert('fill in the required fields');
      return;
    }
    const lookup: any = {
      a: a,
      b: b,
      c: c,
      d: d,
      e: e,
    };

    if (!correctChoice) {
      alert('must choose a correct answer');
      return;
    }
    if (!e && correctChoice === 'e') {
      setCorrectChoice('');
      alert('must choose a correct answer');
      return;
    }

    const data: any = {
      text: q,
      choices: [a, b, c, d, ...(e ? [e] : [])],
      correctChoice: lookup[correctChoice],
    };
    try {
      const r = await fetcher('/q', data);

      console.log('result', r);
      if (r.error) {
        return;
      }
    } catch (error) {
      console.error('error', error);
      return;
    }
    setQ('');
    setA('');
    setB('');
    setC('');
    setD('');
    setE('');
    setCorrectChoice('');
  };
  return (
    <Container>
      <Textarea
        placeholder="Copy question here"
        label="Question"
        required
        autosize={true}
        size="lg"
        maxRows={20}
        minRows={5}
        onChange={(e) => setQ(e.target.value)}
        value={q}
      />

      <div style={{ display: 'flex', alignItems: 'end' }}>
        <ActionIcon
          variant="filled"
          disabled={!a}
          color={correctChoice === 'a' ? 'red' : 'gray'}
          onClick={() => onSelectCorrectItem('a')}
        >
          <Check size={40} />
        </ActionIcon>
        <Textarea
          placeholder="Copy question here"
          label="Option A"
          size="sm"
          value={a}
          required
          onChange={(e) => setA(e.target.value)}
          autosize={true}
          maxRows={20}
          minRows={1}
          style={{ width: '100%' }}
          ml={10}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <ActionIcon
          variant="filled"
          disabled={!b}
          color={correctChoice === 'b' ? 'red' : 'gray'}
          onClick={() => onSelectCorrectItem('b')}
        >
          <Check size={40} />
        </ActionIcon>
        <Textarea
          placeholder="Copy question here"
          label="Option B"
          size="sm"
          value={b}
          required
          onChange={(e) => setB(e.target.value)}
          autosize={true}
          maxRows={20}
          minRows={1}
          style={{ width: '100%' }}
          ml={10}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <ActionIcon
          variant="filled"
          disabled={!c}
          color={correctChoice === 'c' ? 'red' : 'gray'}
          onClick={() => onSelectCorrectItem('c')}
        >
          <Check size={40} />
        </ActionIcon>
        <Textarea
          placeholder="Copy question here"
          label="Option C"
          size="sm"
          value={c}
          required
          onChange={(e) => setC(e.target.value)}
          autosize={true}
          maxRows={20}
          minRows={1}
          style={{ width: '100%' }}
          ml={10}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <ActionIcon
          variant="filled"
          disabled={!d}
          color={correctChoice === 'd' ? 'red' : 'gray'}
          onClick={() => onSelectCorrectItem('d')}
        >
          <Check size={40} />
        </ActionIcon>
        <Textarea
          placeholder="Copy question here"
          label="Option D"
          size="sm"
          required
          value={d}
          autosize={true}
          maxRows={20}
          minRows={1}
          style={{ width: '100%' }}
          ml={10}
          onChange={(e) => setD(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <ActionIcon
          variant="filled"
          disabled={!e}
          color={correctChoice === 'e' ? 'red' : 'gray'}
          onClick={() => onSelectCorrectItem('e')}
        >
          <Check size={40} />
        </ActionIcon>
        <Textarea
          placeholder="Copy question here"
          label="Option D"
          size="sm"
          required
          value={e}
          autosize={true}
          maxRows={20}
          minRows={1}
          style={{ width: '100%' }}
          ml={10}
          onChange={(e) => setE(e.target.value)}
        />
      </div>
      <Textarea
        placeholder="Copy question here"
        label="Hint"
        size="xs"
        autosize={true}
        maxRows={20}
        minRows={1}
        mt={10}
        styles={{
          label: { color: 'green' },
          input: { color: 'green' },
        }}
      />
      <Button mt={20} onClick={addQuestion}>
        {' '}
        Create Question{' '}
      </Button>
    </Container>
  );
};

export default Home;

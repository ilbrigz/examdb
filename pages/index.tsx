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
import Upload from '../components/Upload';
import QuestionsPreview from '../components/QuestionsPreview';

const Home: NextPage = () => {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [e, setE] = useState('');
  const [correctChoice, setCorrectChoice] = useState('');
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageArray, setImageArray] = useState([]);
  const [hint, setHint] = useState('');
  const [category, setCategory] = useState('');
  const [reload, setReaload] = useState(Math.random());
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
      ...(imageUrl && { imgUrl: imageUrl }),
      ...(category && { category }),
      hint,
    };
    console.log(data);
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
    setImageUrl('');
    setCreateObjectURL('');
    setImageArray([]);
    setHint('');
    setReaload(Math.random());
  };
  return (
    <Container>
      <Upload
        setImageUrl={setImageUrl}
        imageUrl={imageUrl}
        createObjectURL={createObjectURL}
        setCreateObjectURL={setCreateObjectURL}
        imageArray={imageArray}
        setImageArray={setImageArray}
      />
      <Textarea
        placeholder="Copy question here"
        label="Question"
        required
        autosize={true}
        size="lg"
        maxRows={20}
        minRows={5}
        onChange={(e) => setQ(e.target.value)}
        // onChange={(e) => setQ(e.target.value)}
        onPaste={(e) => {
          e.preventDefault();
          const clipboardData =
            e.clipboardData || (!!window && (window as any).clipboardData);
          let pastedData = clipboardData.getData('Text');
          setQ(pastedData.replace(/[\r\n]+/g, ' '));
        }}
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
          onPaste={(e) => {
            e.preventDefault();
            const clipboardData =
              e.clipboardData || (!!window && (window as any).clipboardData);
            let pastedData = clipboardData.getData('Text');
            setA(pastedData.replace(/[\r\n]+/g, ' '));
          }}
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
          onPaste={(e) => {
            e.preventDefault();
            const clipboardData =
              e.clipboardData || (!!window && (window as any).clipboardData);
            let pastedData = clipboardData.getData('Text');
            setB(pastedData.replace(/[\r\n]+/g, ' '));
          }}
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
          onPaste={(e) => {
            e.preventDefault();
            const clipboardData =
              e.clipboardData || (!!window && (window as any).clipboardData);
            let pastedData = clipboardData.getData('Text');
            setC(pastedData.replace(/[\r\n]+/g, ' '));
          }}
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
          onPaste={(e) => {
            e.preventDefault();
            const clipboardData =
              e.clipboardData || (!!window && (window as any).clipboardData);
            let pastedData = clipboardData.getData('Text');
            setD(pastedData.replace(/[\r\n]+/g, ' '));
          }}
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
          label="Option E (not required)"
          size="sm"
          value={e}
          autosize={true}
          maxRows={20}
          minRows={1}
          style={{ width: '100%' }}
          ml={10}
          onChange={(e) => setE(e.target.value)}
          onPaste={(e) => {
            e.preventDefault();
            const clipboardData =
              e.clipboardData || (!!window && (window as any).clipboardData);
            let pastedData = clipboardData.getData('Text');
            setE(pastedData.replace(/[\r\n]+/g, ' '));
          }}
        />
      </div>
      <Textarea
        placeholder="Copy question here"
        label="Hint"
        size="xs"
        value={hint}
        autosize={true}
        maxRows={20}
        minRows={1}
        mt={10}
        styles={{
          label: { color: 'green' },
          input: { color: 'green' },
        }}
        onPaste={(e) => {
          e.preventDefault();
          const clipboardData =
            e.clipboardData || (!!window && (window as any).clipboardData);
          let pastedData = clipboardData.getData('Text');
          setHint(pastedData.replace(/[\r\n]+/g, ' '));
        }}
        onChange={(e) => setHint(e.target.value)}
      />
      <Button mt={20} onClick={addQuestion}>
        {' '}
        Create Question{' '}
      </Button>
      <QuestionsPreview reload={reload} />
    </Container>
  );
};

export default Home;

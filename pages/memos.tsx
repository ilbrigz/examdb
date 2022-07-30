import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Stack,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import fetcher from '../lib/fetcher';
import { Text, MantineProvider } from '@mantine/core';

type Props = {};

const Memos = (props: Props) => {
  const [memos, setMemos] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [clearing, setClearing] = useState(false);
  const [inputValue, setInputValue] = useState<any>('');
  // const [inputValue2, setInputValue2] = useState<any>('');
  // const [inputValue3, setInputValue3] = useState<any>('');
  const [fileName, setFileName] = useState<any>('');
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  useEffect(() => {
    const fetchInitialMemos = async () => {
      const r = await fetcher('/memo/multi/get');
      setMemos(r.data);
    };
    fetchInitialMemos();
  }, []);

  const onFilter = async () => {
    if (loading) return;
    setLoading(true);
    if (!inputValue) {
      const r = await fetcher('/memo/multi/get');
      setMemos(r.data);
      return;
    }
    const r = await fetcher('/memo/multi/filter', {
      filter: inputValue,
      // filter2: inputValue2,
      // filter3: inputValue3,
    });
    if (Array.isArray(!r.data)) {
      console.log('not array');
      alert('invalid search input');
      return;
    }

    navigator.clipboard.writeText(inputValue);

    setMemos(r.data);
    setLoading(false);
  };
  const clearInputs = async () => {
    setClearing(true);
    const r = await fetcher('/memo/multi/get');
    setMemos(r.data);
    setFileName('');
    setInputValue('');
    // setInputValue2('');
    // setInputValue3('');
    setClearing(false);
  };

  return (
    <Container>
      <Group>
        <TextInput
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ flexGrow: 1 }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onFilter();
            }
          }}
        />
        {/* <TextInput
          placeholder="additional input"
          type="text"
          value={inputValue2}
          style={{ flexGrow: 1 }}
          onChange={(e) => setInputValue2(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onFilter();
            }
          }}
        />
        <TextInput
          placeholder="additional input"
          style={{ flexGrow: 1 }}
          type="text"
          value={inputValue3}
          onChange={(e) => setInputValue3(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              onFilter();
            }
          }}
        /> */}
        <Button
          style={{ marginLeft: 'auto' }}
          onClick={onFilter}
          loading={loading}
        >
          Search
        </Button>
      </Group>
      <Group mt={5} position="right">
        <Text>Filter by name:</Text>
        <TextInput
          placeholder="filter"
          type="text"
          size="xs"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Button
          variant="gradient"
          gradient={{ from: 'orange', to: 'red' }}
          onClick={clearInputs}
          loading={clearing}
        >
          Clear Inputs
        </Button>
      </Group>

      <Stack spacing={0}>
        {memos.map((memo: any, idx: any) => {
          const matches = (
            (memo.text || '').match(
              new RegExp(
                inputValue.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'),
                'ig'
              )
            ) || []
          ).length;
          const filterMatch = (
            memo.label.match(new RegExp(fileName, 'ig')) || []
          ).length;
          if (memo.text && matches < 1 && inputValue) {
            return null;
          }
          if (fileName && !filterMatch) {
            return null;
          }
          return (
            <div key={memo.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Anchor
                  href={origin + '/' + memo.url}
                  target="_blank"
                  style={{
                    fontWeight: 700,
                    color: 'black',
                    marginBottom: memo.text ? 0 : '10px',
                  }}
                >
                  {idx + 1}) {memo.label}
                </Anchor>
                {memo.text && (
                  <Text>
                    Found: {matches}
                    {/* {memo.text.match(new RegExp('', 'ig'))?.length ?? 0} */}
                  </Text>
                )}
              </div>
              {/* {memo.text && (
              <Spoiler maxHeight={0} showLabel="Show more" hideLabel="Hide">
                {memo.text}
              </Spoiler>
            )} */}
            </div>
          );
        })}
      </Stack>
    </Container>
  );
};

export default Memos;

import {
  Anchor,
  Box,
  Button,
  Container,
  Group,
  Spoiler,
  Stack,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import fetcher from '../lib/fetcher';
import { Text } from '@mantine/core';

type Props = {};

const memos = (props: Props) => {
  const [memos, setMemos] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>('');
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
    console.log('filtering');
    if (!inputValue) {
      const r = await fetcher('/memo/multi/get');
      setMemos(r.data);
      return;
    }
    const r = await fetcher('/memo/multi/filter', { filter: inputValue });
    console.log(r);
    if (Array.isArray(!r.data)) {
      console.log('not array');
      alert('invalid search input');
      return;
    }
    setMemos(r.data);
  };
  return (
    <Container>
      <Group>
        <TextInput
          size="lg"
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
        <Button style={{ marginLeft: 'auto' }} onClick={onFilter}>
          Search
        </Button>
      </Group>
      <Stack spacing={0}>
        {memos.map((memo: any) => (
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
                {memo.label}
              </Anchor>
              {memo.text && (
                <Text>
                  Found:{' '}
                  {
                    (
                      (memo.text || '').match(new RegExp(inputValue, 'ig')) ||
                      []
                    ).length
                  }
                  {/* {memo.text.match(new RegExp('', 'ig'))?.length ?? 0} */}
                </Text>
              )}
            </div>
            {memo.text && (
              <Spoiler maxHeight={0} showLabel="Show more" hideLabel="Hide">
                {memo.text}
              </Spoiler>
            )}
          </div>
        ))}
      </Stack>
    </Container>
  );
};

export default memos;

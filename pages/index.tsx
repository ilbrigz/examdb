import React, { useState } from 'react';
import PaginatedQuestions from '../components/PaginatedQuestions';
import { useRouter } from 'next/router';
import {
  Button,
  Chip,
  Chips,
  Container,
  Grid,
  NativeSelect,
  NumberInput,
  Stack,
  Switch,
  Text,
} from '@mantine/core';
import { useEffect } from 'react';
import fetcher from '../lib/fetcher';

type Props = {};

const Home = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [limit, setLimit] = useState('20');
  const [isRandom, setIsRandom] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const f = async () => {
      const r = await fetcher(`/category/multi/get`);
      setCategories(r.data);
    };
    f();
  }, []);

  return (
    <Container mt={10}>
      <Text>Select Categories:</Text>
      <Chips
        multiple
        value={selectedCategories}
        onChange={setSelectedCategories}
      >
        {categories.map((c: any) => (
          <Chip value={c.name} key={c.id}>
            {c.name}
          </Chip>
        ))}
      </Chips>

      <Text>Max No. of Questions:</Text>
      <NativeSelect
        value={limit}
        onChange={(event) => setLimit(event.currentTarget.value)}
        data={['500', '200', '100', '50', '20', '10']}
      />
      <Switch
        mt={10}
        checked={isRandom}
        label="Randomize Test"
        onChange={(event) => setIsRandom(event.currentTarget.checked)}
      />
      <Stack align="flex-start">
        <Button
          mt={10}
          onClick={() => {
            const qstring =
              selectedCategories.length > 0
                ? 'category=' + selectedCategories.join('&category=')
                : '';
            const take_recent = isRandom ? '' : '&take_recent=1';
            router.push('/quiz?' + qstring + `&limit=${limit}` + take_recent);
          }}
        >
          Take Quiz
        </Button>
        <Text> - OR - </Text>
        <Button
          onClick={() => {
            router.push('/new');
          }}
        >
          Create Question
        </Button>
      </Stack>
    </Container>
  );
};

export default Home;

import React from 'react';
import { useEffect, useState } from 'react';
import fetcher from '../lib/fetcher';
import { Text, Accordion } from '@mantine/core';
const lorem =
  'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum comes from a line in section 1.10.32.';

type Props = { count?: number; reload?: any };

const QuestionsPreview = ({ count = 3, reload }: Props) => {
  const [questions, setQuestions] = useState([]);
  useEffect(() => {
    const f = async () => {
      const r = await fetcher(`/q?limit=${count}`);
      setQuestions(r.result);
    };
    f();
  }, [reload, count]);
  return (
    <Accordion>
      <pre>{JSON.stringify(questions, null, 2)}</pre>
      {questions.map((q: any) => (
        <Accordion.Item
          style={{ color: 'grey' }}
          key={q.id}
          label={
            <Text size="sm" lineClamp={1} style={{ color: 'grey' }}>
              {q.text}
            </Text>
          }
        >
          <div style={{ overflowX: 'scroll' }}>
            <pre>{JSON.stringify(q)}</pre>
          </div>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default QuestionsPreview;

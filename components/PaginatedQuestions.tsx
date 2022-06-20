import { useEffect, useState } from 'react';
import {
  Stepper,
  Button,
  Group,
  Text,
  Radio,
  RadioGroup,
  Container,
  Textarea,
  ActionIcon,
} from '@mantine/core';
import { X, Checks, Pencil } from 'tabler-icons-react';
import fetcher from '../lib/fetcher';
type Props = {
  isCorrect: boolean;
  checkCount: number;
  mistakeCount: number;
};

const SubmittedStepper: React.FC<Props> = ({ isCorrect }) => {
  return <>{isCorrect ? <Checks color="green" /> : <X color="red" />}</>;
};

function shuffleArray(array: []) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function PaginatedQuestions({ count = 20 }) {
  const [active, setActive] = useState(0);
  const [questions, setQuestions] = useState<any>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingHint, setEditingHint] = useState('');
  const [isEditingHint, setIsEditingHing] = useState(false);
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';

  const nextStep = () =>
    setActive((current) => {
      if (!questions[current]?.examinerChoice || active == questions.length) {
        return current;
      }
      return current < questions.length ? current + 1 : current;
    });

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    const f = async () => {
      const r = await fetcher(`/multi_question?limit=${count}`);
      r.result.forEach((q: any) => {
        shuffleArray(q.choices);
      });
      shuffleArray(r.result);
      setQuestions(r.result);
    };
    f();
  }, [count]);
  const onSubmit = async () => {
    setLoading(true);
    if (submitted) {
      alert('exam submitted, Reload to start another one!');
      setLoading(false);
      return;
    }
    const r = await fetcher(`/handleExamSubmit`, { data: questions });
    const t = questions.reduce(
      (a: any, b: any) => a + (b.isCorrect ? 1 : 0),
      0
    );
    setSubmitted(true);
    setLoading(false);
    setScore(t);
  };
  const onChoiceSelect = (value: string) => {
    if (parseInt(value) == questions.length) {
      return;
    }
    if (submitted) {
      return;
    }
    let t = [...questions];
    t[active]['examinerChoice'] = value;
    if (t[active].correctChoiceId == value) {
      t[active]['isCorrect'] = true;
    } else {
      t[active]['isCorrect'] = false;
    }
    setQuestions(t);
  };
  return (
    <Container>
      <Group
        mt="xl"
        mb="lg"
        sx={(theme) => ({
          '@media (max-width: 768px)': {
            display: 'none',
          },
        })}
      >
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
        {submitted && (
          <Text>
            Score: {score}/{questions.length}
          </Text>
        )}
      </Group>

      <Stepper
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
        styles={{
          root: {
            '@media (max-width: 768px)': {
              marginBottom: '100px',
              marginTop: '10px',
            },
          },
          steps: {
            display: 'flex',
            flexWrap: 'wrap',
            '@media (max-width: 768px)': {
              flexDirection: 'row',
              maxHeight: '150px',
              overflowY: 'scroll',
              msOverflowStyle: 'none' /* Internet Explorer 10+ */,
              scrollbarWidth: 'none' /* Firefox */,
            },
            div: {
              margin: '0 3px',
            },
          },
          separator: {
            display: 'none',
          },
          stepIcon: {
            '@media (max-width: 768px)': {
              height: '20px',
              margin: '3px 3px !important',
            },
          },
        }}
      >
        {questions.map((item: any, idx: number) => (
          <Stepper.Step
            key={item.id}
            allowStepSelect={active > idx || submitted}
            state="stepProgress"
            color="yellow"
            {...(submitted
              ? {
                  completedIcon: (
                    <SubmittedStepper
                      isCorrect={item.isCorrect}
                      checkCount={item.checkCount}
                      mistakeCount={item.mistakeCount}
                    />
                  ),
                  icon: (
                    <SubmittedStepper
                      isCorrect={item.isCorrect}
                      checkCount={item.checkCount}
                      mistakeCount={item.mistakeCount}
                    />
                  ),
                  progressIcon: (
                    <SubmittedStepper
                      isCorrect={item.isCorrect}
                      checkCount={item.checkCount}
                      mistakeCount={item.mistakeCount}
                    />
                  ),
                }
              : {})}
          >
            {item.img && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: '10px',
                }}
              >
                <img
                  style={{ width: '400px' }}
                  src={origin + '/' + item.img.url}
                  alt=""
                />
              </div>
            )}
            <div
              style={{
                display: 'flex',
                backgroundColor: '#ededed',
                padding: '5px',
                borderRadius: '5px',
              }}
            >
              <Text
                style={{
                  fontWeight: 700,
                  marginRight: 10,
                }}
              >
                {' '}
                Q:{' '}
              </Text>
              <Text
                dangerouslySetInnerHTML={{
                  __html: item.text.replace(/\n/g, '<br/>'),
                }}
              ></Text>
            </div>
            <RadioGroup
              required
              orientation="vertical"
              value={questions[active]?.examinerChoice || undefined}
              onChange={onChoiceSelect}
            >
              {' '}
              */ /*{' '}
              {item.choices.map((c: any) => (
                <Radio
                  value={c.id + ''}
                  key={c.id}
                  label={
                    <Text
                      color={
                        submitted && item.correctChoiceId == c.id ? 'green' : ''
                      }
                    >
                      {c.name}
                    </Text>
                  }
                />
              ))}
            </RadioGroup>

            {submitted && (
              <>
                <Text
                  mt={20}
                  style={{
                    color: item.isCorrect ? 'green' : 'red',
                    textAlign: 'right',
                  }}
                >
                  {item.isCorrect
                    ? `${item.checkCount + 1}/${
                        item.checkCount + item.mistakeCount + 1
                      }`
                    : `${item.checkCount}/${
                        item.checkCount + item.mistakeCount + 1
                      }`}
                </Text>
                <div
                  style={{
                    backgroundColor: '#bcedb7',
                    padding: '5px',
                    borderRadius: '5px',
                  }}
                >
                  {item.hint && (
                    <Text
                      mt={10}
                      dangerouslySetInnerHTML={{
                        __html: item.hint.replace(/\n/g, '<br/>'),
                      }}
                    ></Text>
                  )}

                  {!isEditingHint ? (
                    item.hint ? (
                      <ActionIcon
                        color="dark"
                        variant="default"
                        mt={20}
                        onClick={() => {
                          setEditingHint(item.hint);
                          setIsEditingHing(true);
                        }}
                      >
                        <Pencil />
                      </ActionIcon>
                    ) : (
                      <Button
                        mt={20}
                        variant="default"
                        color="dark"
                        radius="xl"
                        size="xs"
                        onClick={() => {
                          setIsEditingHing(true);
                        }}
                      >
                        Add some Hint
                      </Button>
                    )
                  ) : (
                    <>
                      <Textarea
                        placeholder="Hint"
                        size="sm"
                        value={editingHint}
                        required
                        onChange={(e) => setEditingHint(e.target.value)}
                        autosize={true}
                        maxRows={20}
                        minRows={1}
                        ml={10}
                      />
                      <Button
                        mt={20}
                        variant="default"
                        color="dark"
                        radius="xl"
                        size="xs"
                        onClick={async () => {
                          const r = await fetcher('/single_question/hint', {
                            id: item.id,
                            hint: editingHint,
                          });
                          let t = [...questions];
                          t[active]['hint'] = r.msg.hint;
                          setQuestions(t);
                          setIsEditingHing(false);
                        }}
                      >
                        Confirm
                      </Button>
                      <Button
                        mt={20}
                        variant="light"
                        color="red"
                        radius="xl"
                        size="xs"
                        onClick={async () => {
                          setIsEditingHing(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </>
            )}
          </Stepper.Step>
        ))}
        <Stepper.Completed>
          {submitted ? (
            <h3>Congrats on completing the test and Good Luck!</h3>
          ) : (
            <h3>Completed, Time to submit your test</h3>
          )}
          {questions[questions.length - 1]?.examinerChoice && (
            <Group position="center" mt="xl" mb="lg">
              <Button
                color="green"
                onClick={onSubmit}
                disabled={loading}
                loading={loading}
              >
                Submit
              </Button>
            </Group>
          )}
        </Stepper.Completed>
      </Stepper>
      <Group
        mt="xl"
        mb="lg"
        sx={(theme) => ({
          position: 'fixed',
          bottom: 0,
          '@media (min-width: 768px)': {
            display: 'none',
          },
        })}
      >
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
        {submitted && (
          <Text>
            Score: {score}/{questions.length}
          </Text>
        )}
      </Group>

      {/* <pre>{JSON.stringify(questions, null, 2)}</pre> */}
    </Container>
  );
}

export default PaginatedQuestions;

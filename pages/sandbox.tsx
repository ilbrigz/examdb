import {
  Box,
  Button,
  Modal,
  MultiSelect,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import PaginatedQuestions from '../components/PaginatedQuestions';
import fetcher from '../lib/fetcher';

const Label: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <>
      <Text style={{ display: 'inline' }}>Select Category</Text>
      <Text ml={5} style={{ fontWeight: 700, display: 'inline' }}>
        -Or-
      </Text>
      <Button onClick={onClick} radius="lg" size="xs" ml={5}>
        Add Category
      </Button>
    </>
  );
};
type Props = {};
const Sandbox = (props: Props) => {
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState<any>([]);
  const [modalState, setModalState] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');
  useEffect(() => {
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    const r = await fetcher(`/category/multi`);
    r.data.forEach((c: any) => {
      c.value = c.id;
      c.label = c.name;
    });
    setCategories(r.data);
  };
  return (
    <Box>
      <MultiSelect
        value={value}
        onChange={setValue}
        data={categories}
        label={
          <Label
            onClick={() => {
              setModalState(!modalState);
            }}
          />
        }
      />
      <Text style={{ fontWeight: 700 }}> - OR - </Text>
      <Modal
        withCloseButton={false}
        opened={modalState}
        onClose={() => {
          setModalState(false);
        }}
      >
        <TextInput
          value={textInputValue}
          onChange={(event) => setTextInputValue(event.currentTarget.value)}
          label="Enter Category Name"
          description="Make sure it is not available yet"
        />

        <Button
          onClick={async () => {
            const r = await fetcher(`/category/single`, {
              category: textInputValue,
            });
            fetchCategories();
            setTextInputValue('');
          }}
          mt={5}
        >
          Add Category
        </Button>
      </Modal>
      <span>
        <pre>{JSON.stringify(value, null, 2)}</pre>
      </span>
    </Box>
  );
};

export default Sandbox;

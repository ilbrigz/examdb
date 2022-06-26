import {
  Box,
  Button,
  Modal,
  MultiSelect,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import fetcher from '../lib/fetcher';

const Label: React.FC<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ onClick }) => {
  return (
    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Text style={{ display: 'inline', color: 'green' }}>Category:</Text>
      <Button variant="outline" onClick={onClick} radius="lg" size="xs" ml={5}>
        Create Category
      </Button>
    </Box>
  );
};
type Props = {
  selectedCategories: [];
  setSelectedCategories: (e: string[]) => void;
  exclude?: [];
};
const SelectOrAddCategory = ({
  setSelectedCategories,
  selectedCategories,
  exclude,
}: Props) => {
  const [categories, setCategories] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [textInputValue, setTextInputValue] = useState('');

  useEffect(() => {
    fetchCategories();
  }, [exclude]);

  const fetchCategories = async () => {
    const r = await fetcher(`/category/multi/get`);

    if (exclude) {
      let t = [...r.data];
      console.log(exclude);
      r.data = t.filter((c: any) => {
        return !exclude.some((f: any) => {
          return f.id === c.id;
        });
      });
    }
    r.data.forEach((c: any) => {
      c.value = c.id;
      c.label = c.name;
    });
    setCategories(r.data);
  };

  return (
    <>
      <MultiSelect
        value={selectedCategories}
        clearable
        onChange={setSelectedCategories}
        data={categories}
        searchable
        styles={{ label: { width: '100%' } }}
        label={
          <Label
            onClick={() => {
              setModalState(!modalState);
            }}
          />
        }
      />
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
            const r = await fetcher(`/category/single/create`, {
              category: textInputValue,
            });
            if (r.ok == false) {
              alert(
                'failed to create category. Make sure it is not available yet'
              );
              return;
            }
            fetchCategories();
            setTextInputValue('');
          }}
          mt={5}
        >
          Add Category
        </Button>
      </Modal>
    </>
  );
};

export default SelectOrAddCategory;

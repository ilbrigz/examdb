import {
  Accordion,
  Button,
  Radio,
  RadioGroup,
  TextInput,
  Box,
  Container,
} from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import fetcher from '../lib/fetcher';
import { Group, Text, useMantineTheme, MantineTheme } from '@mantine/core';
import { Upload, Photo, X, Icon as TablerIcon, H3 } from 'tabler-icons-react';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { spawn } from 'child_process';

type Props = {};

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

export const dropzoneChildren = (status: DropzoneStatus, file: any) => (
  <Group
    position="center"
    spacing="xl"
    style={{ minHeight: 220, pointerEvents: 'none' }}
  >
    <div>
      {file.name ? (
        <h3>{file.name}</h3>
      ) : (
        <Text size="xl" inline>
          {status.accepted ? (
            <span>file Selected</span>
          ) : (
            <span>Drag a PDF file</span>
          )}
        </Text>
      )}
    </div>
  </Group>
);
function sandbox({}: Props) {
  const theme = useMantineTheme();
  const [file, setFile] = useState('');
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<any>(null);

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setFile(i);
      // setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    if (!file || !label) {
      return;
    }
    if (loading) {
      return;
    }
    const body = new FormData();
    setLoading(true);
    body.append('file', file);
    body.append('body', JSON.stringify({ label: label }));
    console.log(body);
    const response = await fetch('/api/pdf', {
      method: 'POST',
      body,
    });
    const r = await response.json();
    setLoading(false);
    if (r.error) {
      alert('Something went wrong. Check logs');
      console.log(r);
    }
    setFile('');
    setLabel('');
    // setImageUrl(r.data.newPath);
    // setCreateObjectURL('');
    // const images = await fetcher('/image');
    // setImageArray(images.result);
  };

  return (
    <Container>
      <h5>Select File</h5>
      <Box style={{ width: '500px' }}>
        <Dropzone
          onDrop={(files: any) => {
            console.log(files[0]);
            setFile(files[0]);
          }}
          onReject={(files) => console.log('rejected files', files)}
          multiple={false}
        >
          {(status) => dropzoneChildren(status, file)}
        </Dropzone>
        <span>Label :</span>{' '}
      </Box>
      <TextInput
        size="lg"
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <br />
      {/* <input
        ref={inputRef}
        type="file"
        name="myImage"
        onChange={uploadToClient}
      /> */}
      <Button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
        variant="subtle"
        disabled={loading}
      >
        Send to server
      </Button>
    </Container>
  );
}

export default sandbox;

import { Accordion, Button, Radio, RadioGroup } from '@mantine/core';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import fetcher from '../lib/fetcher';

type NewType = Dispatch<SetStateAction<string>>;

export default function PrivatePage({
  setImageUrl,
  imageUrl,
  createObjectURL,
  setCreateObjectURL,
  imageArray,
  setImageArray,
}: {
  imageUrl: string;
  createObjectURL: string;
  setCreateObjectURL: any;
  setImageArray: any;
  imageArray: any;
  setImageUrl: NewType;
}) {
  const [image, setImage] = useState('');

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : '';
  const uploadToClient = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event: any) => {
    const body = new FormData();
    // console.log("file", image)
    if (!image) {
      return;
    }
    body.append('file', image);
    const response = await fetch('/api/image', {
      method: 'POST',
      body,
    });
    const r = await response.json();
    setImageUrl(r.data.newPath);
    setCreateObjectURL('');
    const images = await fetcher('/image');
    setImageArray(images.result);
  };

  return (
    <Accordion
      onChange={async (state) => {
        if (state[0] === false) {
          // setImageArray([]);
          setImageUrl('');
        } else {
          const r = await fetcher('/image');
          setImageArray(r.result);
        }
      }}
    >
      <Accordion.Item label={'Use Image'}>
        <RadioGroup
          value={imageUrl}
          onChange={(url) => {
            setImageUrl(url);
          }}
          style={{ maxHeight: '300px', overflow: 'scroll' }}
        >
          {imageArray.map((image: any) => (
            <Radio
              key={image.url}
              value={image.url}
              label={
                <img
                  src={origin + '/' + image.url}
                  style={{ maxWidth: '100px' }}
                />
              }
            />
          ))}
        </RadioGroup>
        <img src={createObjectURL} style={{ maxWidth: '200px' }} />
        <>
          <h5>Select Image</h5>
          <input type="file" name="myImage" onChange={uploadToClient} />
          <Button
            className="btn btn-primary"
            type="submit"
            onClick={uploadToServer}
            variant="subtle"
          >
            Send to server
          </Button>
        </>
      </Accordion.Item>
    </Accordion>
  );
}

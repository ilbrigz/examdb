import React from 'react';
import PaginatedQuestions from '../components/PaginatedQuestions';
import fetcher from '../lib/fetcher';

type Props = {};

const sandbox = (props: Props) => {
  // React.useEffect(() => {
  //   const f = async () => {
  //     const r = await fetcher('/image');
  //     console.log(r);
  //   };
  //   f();
  // }, []);
  return (
    <div>
      <PaginatedQuestions />
    </div>
  );
};

export default sandbox;

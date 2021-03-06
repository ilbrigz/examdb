import React, { useEffect } from 'react';
import PaginatedQuestions from '../components/PaginatedQuestions';

type Props = {};

const Quiz = (props: Props) => {
  useEffect(() => {
    window.onbeforeunload = function () {
      return confirm('Are you sure you want to reload? Progress will be lost.');
    };
  }, []);
  return (
    <>
      <PaginatedQuestions />
    </>
  );
};

export default Quiz;

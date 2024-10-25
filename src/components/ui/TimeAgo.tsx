"use client";

import React, { useEffect, useState } from 'react';
import { timestampToTimeDifference } from '../../../utils';

const TimeContext = React.createContext(new Date());

export const TimeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <TimeContext.Provider value={currentTime}>
      {children}
    </TimeContext.Provider>
  );
};

export const TimeAgo = ({ timestampNanosec }: { timestampNanosec: number }) => {
  const currentTime = React.useContext(TimeContext);
  
  const timeDifference = timestampToTimeDifference(timestampNanosec, currentTime);

  return <span>{timeDifference}</span>;
};

"use client";

import React, { useEffect, useState } from 'react';

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

export function timestampToTimeDifference(
  timestampNanosec: string | number,
  currentTime?: Date
): string {
  /* timestamp is in nanoseconds, Date().getTime() in milliseconds */
  timestampNanosec = Number(timestampNanosec) / 1_000_000;
  const now = currentTime ? currentTime.getTime() : new Date().getTime();
  let difference = Math.abs(now - timestampNanosec);
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  difference -= days * (1000 * 60 * 60 * 24);

  const hours = Math.floor(difference / (1000 * 60 * 60));
  difference -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(difference / (1000 * 60));
  difference -= minutes * (1000 * 60);

  const seconds = Math.floor(difference / 1000);

  if (days > 0) {
    return `${days}d ${hours}h ago`;
  } else if (hours > 0) {
    return `${hours}h ${minutes}m ago`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s ago`;
  }
  return `${seconds}s ago`;
}

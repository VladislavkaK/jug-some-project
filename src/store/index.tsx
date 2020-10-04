import React from 'react';
import { enableLogging } from 'mobx-logger';
import ReportStore from './ReportStore';

enableLogging({
  action: true,
  transaction: true,
  reaction: false,
  compute: false,
});

const reportStore = new ReportStore();

export const storesContext = React.createContext({
  reportStore
});

export const useStores = () => React.useContext(storesContext);
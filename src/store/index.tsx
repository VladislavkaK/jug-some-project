import React from 'react';
import { enableLogging } from 'mobx-logger';
import ReportStore from './ReportStore';
import { ReportTransformer } from '../transformers/ReportTransformer';

enableLogging({
  action: true,
  transaction: true,
  reaction: false,
  compute: false,
});

const reportStore = new ReportStore(new ReportTransformer());

export const storesContext = React.createContext({
  reportStore
});

export const useStores = () => React.useContext(storesContext);
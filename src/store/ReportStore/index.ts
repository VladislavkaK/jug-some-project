import { observable, action, runInAction, makeObservable } from 'mobx';
import axios from 'axios';
import { get } from 'lodash';
import { configLocale } from '../../locale';
import { Report, TypeReport } from './types';
import { ReportTransformer } from '../../transformers/ReportTransformer';

class ReportStore {
  @observable 
  lang: string = 'ru';

  @observable 
  reports: Report[] = [];

  @observable 
  types: TypeReport[] = [];

  constructor(private _reportTransformer: ReportTransformer) {
    makeObservable(this);
  }

  @action
  async setTypesReport() {
    const res = await axios('/mocks/mockTypesReports.json');

    runInAction(() => {
      this.types = get(res, 'data', []);
    });
  }

  @action
  async setReports(
    selectedLanguage: { ru: boolean; en: boolean; }, 
    seacrhValue?: string,
    filterByType?: any
) {
    const res = await axios('/mocks/mockReports.json');
    const data: Report[] = get(res, 'data', []);

    this._reportTransformer.setData(data);
    this._reportTransformer.setLanguage(selectedLanguage);
    this._reportTransformer.setSearchValue(seacrhValue);
    this._reportTransformer.setType(filterByType);
    this._reportTransformer.filteredReports();

    runInAction(() => {
      this.reports = this._reportTransformer.data;
    });
  }

  @action
  updateLanguage(lang: string) {
    runInAction(() => {
      this.lang = lang;
    });
    configLocale(lang);
  }
}

export default ReportStore;
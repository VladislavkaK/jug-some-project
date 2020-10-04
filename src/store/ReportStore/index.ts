import { observable, action, runInAction, makeObservable } from 'mobx';
import axios from 'axios';
import { get } from 'lodash';
import { configLocale } from '../../locale';

export type Report = {
  lang: 'ru' | 'en';
  type: 'intermediate' | 'advanced' | 'hardcore' | 'hot' | 'academic';
  author: string;
  description: string;
}

export type TypeReport = {
  key: string;
  type: 'intermediate' | 'advanced' | 'hardcore' | 'hot' | 'academic';
  company: string;
  selected: boolean;
};

class ReportStore {
  @observable 
  lang: string = 'ru';

  @observable 
  reports: Report[] = [];

  @observable 
  types: TypeReport[] = [];

  constructor() {
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
    let data: Report[] = get(res, 'data', []);

    if (selectedLanguage.en) {
      data = res.data.filter((item: Report) => item.lang === 'en');
    }

    if (selectedLanguage.ru) {
      data = res.data.filter((item: Report) => item.lang === 'ru');
    }

    if (filterByType.length > 0) {
      data = 
        data.filter((item: Report) => {
          return filterByType.includes(item.type);
        });
    }

    if (seacrhValue) {
      data = 
        data.filter((item: Report) => item.author.indexOf(seacrhValue) !== -1 || item.description.indexOf(seacrhValue) !== -1);
    }

    runInAction(() => {
      this.reports = data;
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
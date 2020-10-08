import { computed, action, observable } from 'mobx';
import { Report } from '../../store/ReportStore/types';

type LanguageT = { ru?: boolean; en?: boolean; };

export class ReportTransformer {
  @observable data: Report[] = [];
  @observable filterByLanguage: LanguageT = {};
  @observable filterBySearch?: string = '';
  @observable filterByType: any;

  @action
  setData(data: Report[]) {
    this.data = data;
  }

  @action
  setLanguage(filterByLanguage: LanguageT) {
    this.filterByLanguage = filterByLanguage;
  }

  @action
  setSearchValue(filterBySearch?: string) {
    this.filterBySearch = filterBySearch;
  }

  @action
  setType(filterByType: any) {
    this.filterByType = filterByType;
  }

  filteredReports() {
    if (this.filterByLanguage.en) {
      this.data = this.data.filter((item: Report) => item.lang === 'en');
    }

    if (this.filterByLanguage.ru) {
      this.data = this.data.filter((item: Report) => item.lang === 'ru');
    }

    if (this.filterByType.length > 0) {
      this.data = 
        this.data.filter((item: Report) => {
          return this.filterByType.includes(item.type);
        });
    }

    if (this.filterBySearch) {
      this.data = 
        this.data.filter((item: Report) => {
          return item.author.indexOf(this.filterBySearch || '') !== -1 
            || item.description.indexOf(this.filterBySearch || '') !== -1;
        });
    }
  }
}
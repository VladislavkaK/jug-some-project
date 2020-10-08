import React from 'react';
import { styled } from 'baseui';
import { observer } from 'mobx-react';
import Header from '../../components/IndexPage/Header';
import Main from '../../components/IndexPage/Main';
import { useStores } from '../../store';
import { TypeReport } from '../../store/ReportStore/types';

const StyledWrapContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
});

function IndexPage() {
  const { reportStore } = useStores();
  const [checkedLanguage, setCheckedLanguage] = React.useState<{
    ru: boolean,
    en: boolean
  }>({ ru: false, en: false });
  const [seacrhValue, setSearchValue] = React.useState<string>("");
  const [filterByType, setFilterByType] = React.useState<string[]>([]);
  const [data, setData] = React.useState<TypeReport[]>(reportStore.types);

  React.useEffect(() => {
    reportStore.setTypesReport();
  }, []);

  const handleChangeLang = ({ isCurrentValue, isRu, isEn }: { 
    isCurrentValue: boolean, 
    isRu: boolean, 
    isEn: boolean 
  }): void => {
    if (isRu) {
      setCheckedLanguage({ ru: isCurrentValue, en: false });
      reportStore.updateLanguage('ru');
    }

    if (isEn) {
      setCheckedLanguage({ ru: false, en: isCurrentValue });
      reportStore.updateLanguage('en');
    }
  }

  React.useEffect(() => {
    setData(reportStore.types);
  }, [reportStore.types]);

  React.useEffect(() => {
    reportStore.setReports(checkedLanguage, seacrhValue, filterByType);
  }, [checkedLanguage, seacrhValue, filterByType, data]);

  const handleReset = React.useCallback(
    () => {
      setCheckedLanguage({
        ru: false,
        en: false
      });
      reportStore.updateLanguage('ru');
      setSearchValue('');
      setFilterByType([]);
      setData(reportStore.types);
    },
    []
  );

  const handleChangeByType = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    setData((currentData) => {
      const newData = currentData.map((el) => {
        if (el.key === key) {

          const newArr = [...filterByType];

          if (!el.selected) newArr.push(el.type);

          if (el.selected) {
            const i = newArr.indexOf(el.type);
            newArr.splice(i, 1);
          }

          setFilterByType(newArr);
          
          return {
            ...el,
            selected: e.target.checked
          };
        }

        return {
          ...el,
        }
      });

      return newData;
  });
  }

  return (
    <StyledWrapContainer>
      <Header 
        checkedLanguage={checkedLanguage}
        handleChangeLang={handleChangeLang}
        handleReset={handleReset}
        seacrhValue={seacrhValue}
        setSearchValue={setSearchValue}
        setFilterByType={setFilterByType}
        filterByType={filterByType}
        data={data}
        setData={setData}
        handleChangeByType={handleChangeByType}
      />
      <Main 
        reports={reportStore.reports}
      />
    </StyledWrapContainer>
  );
}

export default observer(IndexPage);

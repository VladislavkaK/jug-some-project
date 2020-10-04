import React from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { toJS } from 'mobx';
import { styled } from 'baseui';
import {
  Checkbox,
  LABEL_PLACEMENT
} from "baseui/checkbox";
import { MaskedInput, SIZE as SIZEInput } from "baseui/input";
import { Button, SIZE as SIZEButton } from "baseui/button";
import { Search as SeacrhIcon } from 'baseui/icon';
import { TypeReport } from '../../../store/ReportStore';

interface HeaderProps extends WithTranslation {
  checkedLanguage: {
    ru: boolean;
    en: boolean;
  };
  handleChangeLang: ({ isCurrentValue, isRu, isEn }: { 
    isCurrentValue: boolean, 
    isRu: boolean, 
    isEn: boolean 
  }) => void;
  handleReset: () => void;
  seacrhValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setFilterByType: React.Dispatch<React.SetStateAction<string[]>>;
  setData: React.Dispatch<React.SetStateAction<TypeReport[]>>;
  data: TypeReport[];
  filterByType: string[];
};

const StyledContainer = styled('header', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '50px',
  padding: '0 20px',
  borderBottom: '1px solid'
});

const StyledLeftContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',

  marginRight: '20px',
});

const StyledCenterContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  width: '500px',
  overflow: 'auto'
});

const StyledRightContainer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  marginLeft: 'auto'
});

const Header: React.FC<HeaderProps> = ({
  checkedLanguage,
  handleChangeLang,
  handleReset,
  seacrhValue,
  setSearchValue,
  setFilterByType,
  data,
  setData,
  filterByType,
  ...props
}) => {
  return (
    <StyledContainer>
      <StyledLeftContainer>
        <Checkbox
          checked={checkedLanguage.ru}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeLang({ isCurrentValue: e.target.checked, isRu: true, isEn: false });
          }}
          labelPlacement={LABEL_PLACEMENT.right}
          overrides={{
            Root: {
              style: () => ({
                marginRight: '8px'
              }),
            },
          }}
        >
          RU
        </Checkbox>
        <Checkbox
          checked={checkedLanguage.en}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChangeLang({ isCurrentValue: e.target.checked, isRu: false, isEn: true });
          }}
          labelPlacement={LABEL_PLACEMENT.right}
        >
          EN
        </Checkbox>
      </StyledLeftContainer>
      <StyledCenterContainer>
        {data.map((item) => {
          return (
            <Checkbox
              key={item.key}
              checked={item.selected}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setData((currentData) => {
                    const newData = currentData.map((el) => {
                      if (el.key === item.key) {

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
              }}
              labelPlacement={LABEL_PLACEMENT.right}
              overrides={{
                Root: {
                  style: () => ({
                    marginRight: '8px'
                  }),
                },
              }}
            >
              {item.company}
            </Checkbox>
          );
        })}
      </StyledCenterContainer>
      <StyledRightContainer>
        <MaskedInput
          value={seacrhValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!/[^a-zа-яё ]/i.test(e.target.value)) setSearchValue(e.target.value);
          }}
          clearOnEscape
          size={SIZEInput.compact}
          endEnhancer={<SeacrhIcon size="18px" />}
          maskChar=""
          overrides={{
            Root: {
              style: {
                marginRight: '12px',
                height: '30px',
                width: '220px',
                alignSelf: 'center'
              }
            },
          }}
        />
        <Button 
          onClick={handleReset}
          size={SIZEButton.mini}
        >
          {props.t('header.btnReset')}
        </Button>
      </StyledRightContainer>
    </StyledContainer>
  );
}

export default withTranslation()(Header);
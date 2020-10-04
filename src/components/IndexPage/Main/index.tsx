import React from 'react';
import { styled } from 'baseui';
import {
  Paragraph1,
  Paragraph2,
} from 'baseui/typography';
import { Report } from '../../../store/ReportStore';

interface MainProps {
  reports: Report[];
}

const StyledGrid = styled('div', {
  display: 'grid',
  width: '100%',
  gridGap: '30px',
  gridTemplateColumns: 'repeat(3, 300px)',
  overflow: 'auto',
  margin: '50px',
});

const StyledGridItem = styled('div', {
  border: '1px solid',
  padding: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start'
});

const StyledBottomContainer = styled('div', {
  marginTop: 'auto'
});

const StyledNotDataContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const Main: React.FC<MainProps> = ({ reports }) => {
  return (
    <StyledGrid>
      {reports.length > 0 ? reports.map((item, index) => {
        return (
          <StyledGridItem key={index}>
            <Paragraph1
              marginBottom="12px"
            >
              {item.description}
            </Paragraph1>
            <Paragraph1
              marginBottom="12px"
            >
              {item.author}
            </Paragraph1>
            <StyledBottomContainer>
              <Paragraph2>{`${item.type.toUpperCase()} / ${item.lang.toUpperCase()}`}</Paragraph2>
            </StyledBottomContainer>
          </StyledGridItem>
        );
      }) : (
        <StyledNotDataContainer>
          <Paragraph1>
            Нет данных
          </Paragraph1>
        </StyledNotDataContainer>
      )}
    </StyledGrid>
  );
}

export default Main;
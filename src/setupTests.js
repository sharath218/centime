
import '@testing-library/jest-dom';

// Mock the i18next library
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key) => key,
      i18n: {
        changeLanguage: jest.fn(),
        language: 'en'
      }
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
  I18nextProvider: ({ children }) => children
}));

// Mock the React Redux hooks
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn().mockReturnValue(jest.fn()),
  useSelector: jest.fn()
}));

// Mock the nivo chart component
jest.mock('@nivo/sankey', () => ({
  ResponsiveSankey: () => <div data-testid="sankey-chart">Sankey Chart</div>
}));
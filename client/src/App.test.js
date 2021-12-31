import Enzyme, { shallow } from "enzyme";
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import FieldsSection from './components/FieldsSection';
import TweetsSection from './components/TweetsSection';
import ChartSection from './components/ChartSection';
import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
    test('The three sections should be exist', () => {
        const wrapper = shallow(<App />).dive();
        const fieldsSection = wrapper.find(FieldsSection);
        expect(fieldsSection).toHaveLength(1);
        expect(fieldsSection.props()).toEqual({})
        expect(wrapper.find(TweetsSection)).toHaveLength(1);
        expect(wrapper.find(ChartSection)).toHaveLength(1);
    });
});

import React from 'react/lib/ReactWithAddons'
import {shallow, mount} from 'enzyme'
import {compClass, compData, compSelector} from '../../mock/checkbox.js'
import Checkbox from '../../../src/Checkbox.js'
import CheckboxGroup from '../../../src/CheckboxGroup.js'

describe('Basic', ()=> {
  const _defaultCheckbox = mount(<Checkbox text="foo"/>),
    _defaultCheckboxGroup1 = mount(<CheckboxGroup data={compData.dataList1}/>),
    _defaultCheckboxGroup2 = mount(<CheckboxGroup data={compData.dataList2}/>);

  describe('CheckBox', ()=> {
    it('Should generate a label container tag', ()=> {
      assert.equal(_defaultCheckbox.find(compSelector.checkboxItem).length, 1)
    });

    it('Should apply text content by text', ()=> {
      assert.equal(_defaultCheckbox.text(), 'foo');
    });

    it('Should apply boolean value by default');

    it('Should apply checked value by value', ()=> {
      const wrapper1 = shallow(<Checkbox text="foo" value='foo'/>),
        wrapper2 = shallow(<Checkbox text="foo" value={1}/>);

      assert.equal(wrapper1.instance().getValue(), 'foo');
      assert.equal(wrapper2.instance().getValue(), 1);
    });

    it('Should apply checked status by checked', ()=> {
      const wrapper1 = shallow(<Checkbox text="foo" checked={true}/>);

      assert.ok(wrapper1.prop('checked'));
    });
  });

  describe('CheckBox Group', ()=> {
    describe('Should render by Array data', ()=> {
      const checkboxItemsWrapper1 = _defaultCheckboxGroup1.find(compSelector.checkboxItem),
        checkboxItemsWrapper2 = _defaultCheckboxGroup2.find(compSelector.checkboxItem);

      it('Should have the same size', ()=> {
        assert.equal(checkboxItemsWrapper1.length, compData.dataList1.length);
        assert.equal(checkboxItemsWrapper2.length, compData.dataList2.length);
      });

      it('Should have the same value', ()=> {
        compData.dataList1.forEach((e, i)=> {
          assert.equal(checkboxItemsWrapper1.at(i).text(), e);
        });

        compData.dataList2.forEach((e, i)=> {
          assert.equal(checkboxItemsWrapper2.at(i).text(), e.text);
        });
      })
    });

    describe('Should render by Func data', ()=> {

    })

    it('Should return value by sep');
    it('Should render by inline');
    describe('Should render by Tpl', ()=> {
      it('Should render by default Tpl');
      it('Should render by textTpl');
      it('Should render by valueTpl');
    });

    it('Should render by value');
  });
});
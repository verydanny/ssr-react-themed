import React from 'react'
import { shallow } from 'enzyme'
import { AdSlot, DFPManager } from 'react-dfp'
import DfpAds from 'config/dfpAds'
import ThemedDfpAdSlot from '../DfpAdSlot'

const DfpAdSlot = ThemedDfpAdSlot.WrappedComponent

describe('DfpAdSlot', () => {
  describe('render()', () => {
    it('is bypassed', () => {
      const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" bypass />)
      expect(wrapper.find(AdSlot)).toHaveLength(0)
    })
  })

  describe('with ad bypasser turned off', () => {
    afterEach(() => {
      DFPManager.unregisterSlot({
        slotId: 'gpt_test_active',
      })
    })

    const locationProps = {
      city: { name: 'Los Angeles' },
      state: { name: 'California' },
      zip: '90025',
      lat: 123,
      lng: 456,
      targetCode: '12345',
    }

    const location = {
      city: 'Los Angeles',
      state: 'CA',
      zip: '90025',
      latitude: 123,
      longitude: 456,
      targetCode: '12345',
    }

    describe('render()', () => {
      it('renders AdSlot from ad config entry', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        expect(wrapper.find(AdSlot)).toHaveLength(1)
      })

      it('does not render AdSlot when muted', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_muted" />)
        expect(wrapper.find(AdSlot)).toHaveLength(0)
      })

      it('does not render AdSlot when ads are disabled', () => {
        DfpAds.isDisabled = jest.fn().mockReturnValue(true)
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        expect(wrapper.find(AdSlot)).toHaveLength(0)
      })

      it('does not render AdSlot when config key is not found', () => {
        const wrapper = shallow(<DfpAdSlot adKey="ofj3f2iwj" />)
        expect(wrapper.find(AdSlot)).toHaveLength(0)
      })

      it('does not render AdSlot when mounted state is false', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        wrapper.setState({ mounted: false })
        expect(wrapper.find(AdSlot)).toHaveLength(0)
      })
    })

    describe('componentDidMount()', () => {
      it('calls load on mount', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        DFPManager.load = jest.fn()
        wrapper.instance().componentDidMount()
        expect(DFPManager.load).toHaveBeenCalled()
      })
    })

    describe('filterObject()', () => {
      it('filters out null and undefined properties', () => {
        const props = {
          adKey: 'gpt_test_active',
        }
        const instance = shallow(<DfpAdSlot {...props} />).instance()
        const testObj = {
          foo: 'foo',
          bar: undefined,
          baz: null,
          zeroOK: 0,
          emptyStringOK: '',
        }
        const actual = instance.filterObject(testObj)
        const expected = {
          foo: 'foo',
          zeroOK: 0,
          emptyStringOK: '',
        }
        expect(actual).toEqual(expected)
      })
    })

    describe('slotRenderCallback()', () => {
      it('sets the ready display state', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        const instance = wrapper.instance()
        expect(instance.state.ready).toBeFalsy()
        instance.slotRenderCallback()
        expect(instance.state.ready).toBeTruthy()
      })

      it('returns a callback function with props.onSlotRender call', () => {
        const spy = jest.fn()
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" onSlotRender={spy} />)
        const instance = wrapper.instance()
        instance.slotRenderCallback()
        expect(spy).toHaveBeenCalled()
      })

      it('returns a callback function with context call', () => {
        const dfp = { setDisplayReady: jest.fn() }
        const wrapper = shallow(
          <DfpAdSlot adKey="gpt_test_active" />,
          { context: { dfp } }
        )
        const instance = wrapper.instance()
        instance.slotRenderCallback()
        expect(dfp.setDisplayReady).toHaveBeenCalled()
      })
    })

    describe('baseTargeting()', () => {
      it('builds object of values from the store based on config targets', () => {
        const wrapper = shallow(
          <DfpAdSlot adKey="gpt_test_active" {...locationProps} />
        )
        const instance = wrapper.instance()
        expect(instance.baseTargeting).toEqual(location)
      })
    })

    describe('targetingArguments()', () => {
      it('adds new custom targets', () => {
        const expected = { ...location, newfoo: 'newfoo' }
        const wrapper = shallow(
          <DfpAdSlot
            adKey="gpt_test_active"
            {...locationProps}
            customTargeting={{ newfoo: 'newfoo' }}
          />
        )
        const instance = wrapper.instance()
        expect(instance.targetingArguments).toEqual(expected)
      })

      it('modifies existing configured targets', () => {
        const expected = { ...location, city: 'bar' }
        delete expected.state
        delete expected.zip

        const wrapper = shallow(
          <DfpAdSlot
            adKey="gpt_test_active"
            {...locationProps}
            customTargeting={{ city: 'bar', state: null, zip: null }}
          />
        )
        const instance = wrapper.instance()
        expect(instance.targetingArguments).toEqual(expected)
      })
    })

    describe('ads()', () => {
      it('returns ads object', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        expect(wrapper.instance().ads).toEqual(DfpAds.ads)
      })
    })

    describe('updateMountState()', () => {
      it('sets mount state to true', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        wrapper.setState({ mounted: false })
        wrapper.instance().updateMountState()
        expect(wrapper.state().mounted).toBeTruthy()
      })
    })

    describe('isDisabled()', () => {
      it('returns isDisabled value', () => {
        const wrapper = shallow(<DfpAdSlot adKey="gpt_test_active" />)
        expect(wrapper.instance().isDisabled).toEqual(DfpAds.isDisabled())
      })
    })
  })
})

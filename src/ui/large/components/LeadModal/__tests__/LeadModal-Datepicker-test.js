/* eslint-disable */
jest.mock('@rentpath/react-ui-core/lib/Form/Field', () => require('./__helpers__/MockInput'))

import React, { Component } from 'react'
import { render, mount } from 'enzyme'
import { Cookies } from 'react-cookie'
import {
  leadFormHiddenFieldsTest as sharedHiddenFieldsTest,
} from '__helpers__'
import LeadModal from '../LeadModal'
/* eslint-enable */

const trackSpy = jest.fn()
window.eventTracker = {
  track: trackSpy,
}

describe('LeadModal', () => {
  describe('hidden fields', sharedHiddenFieldsTest(LeadModal))

  describe('tagging', () => {
    const props = {
      listingId: '111',
      listHubId: '111',
      propertyLabel: 'Test Property Label',
      desktopPhone: '123-456-7890',
      isPaid: true,
      onClose: () => true,
      isOpen: true,
      leadData: {},
      cookies: new Cookies(),
      newsletterCheckboxDefault: false,
    }
    const wrapper = mount(<LeadModal {...props} />)

    it('tags date input', () => {
      const field = wrapper.find('[data-tid="datePickerWrapper"]').find('input')
      field.simulate('change', Date.now())
      expect(trackSpy).toBeCalled()
    })
  })
})

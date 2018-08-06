import React from 'react'
import { render } from 'enzyme'
import { Cookies } from 'react-cookie'
import {
  leadFormHiddenFieldsTest as sharedHiddenFieldsTest,
} from '__helpers__'
import LeadModal from '../LeadModal'

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
      isCountryUS: false,
    }
    const wrapper = render(<LeadModal {...props} />)

    describe('props.isCountryUS', () => {
      it('hides checkbox when true', () => {
        const component = render(<LeadModal {...props} isCountryUS />)
        expect(
          component.find('[data-tid="lead-form-opt_in_newsletter"]').length
        ).toBe(0)
      })

      it('disabled checkbox when false', () => {
        const component = render(<LeadModal {...props} />)
        expect(
          component.find('[data-tid="lead-form-opt_in_newsletter"]').prop('checked')
        ).toBeFalsy()
      })
    })

    it('tags close button', () => {
      expect(wrapper.find('[data-tag_item="x"]').length)
        .toMatchSnapshot()
    })

    it('tags phone number link', () => {
      expect(wrapper.find('[data-tag_item="phone_number_link"]').length)
       .toMatchSnapshot()
    })

    it('tags text input', () => {
      expect(wrapper.find('[data-tag_item="text"]').length)
        .toMatchSnapshot()
    })

    it('tags name input', () => {
      expect(wrapper.find('[data-tag_item="name"]').length)
        .toMatchSnapshot()
    })

    it('tags phone_number input', () => {
      expect(wrapper.find('[data-tag_item="phone_number"]').length)
        .toMatchSnapshot()
    })

    it('tags lead_submission_form section', () => {
      expect(wrapper.find('[data-tag_section="lead_submission_form"]').length)
        .toMatchSnapshot()
    })
  })
})

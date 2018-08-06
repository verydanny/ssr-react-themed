import React from 'react'
import { render } from 'enzyme'
import RegisterModal from '../RegisterModal'

describe('RegisterModal', () => {
  describe('Modal is open', () => {
    const props = {
      onClose: () => true,
      isOpen: true,
      isCountryUS: false,
    }
    const wrapper = render(<RegisterModal {...props} />)

    describe('props.isCountryUS', () => {
      it('hides checkbox when true', () => {
        const component = render(<RegisterModal {...props} isCountryUS />)
        expect(
          component.find('[data-tid="user-modal-form-optInNewsletter"]').length
        ).toBe(0)
      })

      it('disabled checkbox when false', () => {
        const component = render(<RegisterModal {...props} />)
        expect(
          component.find('[data-tid="user-modal-form-optInNewsletter"]').prop('checked')
        ).toBeFalsy()
      })
    })

    describe('Modal tests', () => {
      it('matches snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })
    })
  })
})

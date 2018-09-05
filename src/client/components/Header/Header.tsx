import * as React from 'react'
import { themed } from 'react-themed-too'

const Header = ({ theme, ...props }: { theme: any }) => {
  return (
    <div className={theme.Text}>
      <h1 className={theme.HeaderDingus}>This is my website</h1>
    </div>
  )
}

export default themed('*')(Header)

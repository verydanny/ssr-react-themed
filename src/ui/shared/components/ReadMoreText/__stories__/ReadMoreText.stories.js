import React from 'react'
import { storiesOf } from '@storybook/react'
import SmallTheme from 'ui/small/themes/SmallTheme'
import ReadMoreText from '../ReadMoreText'

const WIDTH = '400px'
const CHARS_PER_LINE = 45
const STYLE = { padding: '1em', width: WIDTH, border: '1px dotted green' }
const TEXT_COUNT = 'a'.repeat(CHARS_PER_LINE)
const TEXT_SHORT = 'This is a short amount of text. It should not be truncated.'
const TEXT_MEDIUM = 'This is a medium amount of text. It should not be truncated, even though it might exceed the count of three lines (but it does not exceed the trigger count of four lines).'
const TEXT_LONG = 'This is a large amount of text. It should be truncated.\nMorbi sed lacinia nisi. Donec pellentesque enim ac arcu tincidunt euismod. Etiam pulvinar lectus ante, vel facilisis mi lobortis eu. Suspendisse potenti. Sed in felis et diam porta blandit eu sit amet felis. Nam aliquam purus eget tortor dapibus luctus. Pellentesque quis porttitor neque. Vivamus placerat neque a ultrices ullamcorper. Nam nec diam vitae sapien dictum pulvinar. Vivamus porttitor risus nec enim mattis, in faucibus dolor pulvinar. Etiam dolor erat, sagittis in malesuada sed, gravida at eros. Mauris at neque non tortor consectetur gravida ac vitae est. Etiam vel rutrum orci. Nullam egestas ultricies sapien, non molestie nibh ultricies et. Aliquam et ultricies lectus. Curabitur vitae diam sed neque fermentum egestas vitae vitae massa.'

const randText = () => {
  const numLines = Math.floor(Math.random() * 6) + 1
  const line = '123456789 '.repeat(10).substring(0, CHARS_PER_LINE)
  return `${line} `.repeat(numLines)
}

const props = {
  theme: SmallTheme,
  count: 3 * CHARS_PER_LINE,
  triggerCount: 5 * CHARS_PER_LINE,
}

storiesOf('Shared/ReadMoreText', module)
  .add('character count', () => (
    <div style={STYLE}>
      <ReadMoreText {...props} text={TEXT_COUNT} />
    </div>
  ))
  .add('short text', () => (
    <div style={STYLE}>
      <ReadMoreText {...props} text={TEXT_SHORT} />
    </div>
  ))
  .add('medium text', () => (
    <div style={STYLE}>
      <ReadMoreText {...props} text={TEXT_MEDIUM} />
    </div>
  ))
  .add('long text', () => (
    <div style={STYLE}>
      <ReadMoreText {...props} text={TEXT_LONG} />
    </div>
  ))
  .add('random text length', () => (
    <div style={STYLE}>
      <ReadMoreText {...props} text={`Reload for different length ${randText()}`} />
    </div>
  ))

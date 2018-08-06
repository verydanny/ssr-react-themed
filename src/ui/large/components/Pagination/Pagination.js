import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { themed } from 'react-themed'
import { Link } from '@rentpath/react-redux-router'

/**
 * Display a pagination component for the listing:
 * 31 - 60 of 75 Properties    < Previous Page    Next Page >
 *
 * Based on the start/end/total parameters:
 *
 * If there are not multiple pages,
 * then the entire component does not render.
 *
 * If on the last page,
 * then does not display the "Next Page" control.
 *
 * If on the first page,
 * then does not display the "Previous Page" control.
 */

@themed(/^Pagination/, { pure: true })
export default class Pagination extends PureComponent {

 static propTypes = {

   theme: PropTypes.object,

   // Index of the first item being shown on the current page.
   // For example, on the first page the starting item is 1,
   // on the second page the starting item might be 31.
   start: PropTypes.number,

   isFirstPage: PropTypes.bool,

   // Index of the last item being shown on the page.
   // For example, on the first page the end item might be 30.
   // On the last page the end item would be the same as the total.
   end: PropTypes.number,

   isLastPage: PropTypes.bool,

   // Total number of items (across all pages).
   // For example, 60 total items across two pages.
   total: PropTypes.number,

   hasMultiplePages: PropTypes.bool,

   nextPageLink: PropTypes.string,

   previousPageLink: PropTypes.string,
 }

 static defaultProps = {
   theme: {},
 }

 render() {
   const {
     theme,
     start,
     end,
     total,
     hasMultiplePages,
     isLastPage,
     isFirstPage,
     nextPageLink,
     previousPageLink,
   } = this.props

   // If there is just one page of listing, do not display pagination
   if (!hasMultiplePages || !start || !end || !total) {
     return null
   }

   return (
     <div
       className={theme.Pagination}
       data-tid="pagination-container"
       data-tag_section="pagination"
     >
       <span className={theme.Pagination_Count}>
         <span data-tid="pagination-start">{start}</span>
         {' '}-{' '}
         <span data-tid="pagination-end">{end}</span>
         {' '}of{' '}
         <span data-tid="pagination-total">{total}</span>
         {' '}Properties
       </span>
       <span className={theme.Pagination_Links}>
         {!isFirstPage && (
           <Link
             className={theme.Pagination_Prev}
             to={previousPageLink || '#'}
             data-tid="pagination-previous"
             data-tag_item="previous"
           >
              &lt; Previous Page
           </Link>
         )}
         {!isLastPage && (
           <Link
             className={theme.Pagination_Next}
             to={nextPageLink || '#'}
             data-tid="pagination-next"
             data-tag_item="next"
           >
            Next Page &gt;
           </Link>
         )}

       </span>
     </div>
   )
 }
}

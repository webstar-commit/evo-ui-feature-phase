import React from 'react';
import _ from 'lodash';
import classNames from 'classnames';

const renderPaginationItems = (pageCount, currentPage, onPageClicked) => {
  return _.range(0, pageCount).map((pageIndex) => <li className={classNames({current: pageIndex === currentPage})} key={pageIndex}>
    <a href="javascript:void(0)" onClick={ () => onPageClicked(pageIndex) }>
      {pageIndex+1}
    </a>
  </li>);
};

const TablePagination = (props) => <ul className="pagination">
  { renderPaginationItems(props.pageCount, props.currentPage, (pageIndex) => { props.onPageClicked && props.onPageClicked(pageIndex) }) }
</ul>;

export default TablePagination;

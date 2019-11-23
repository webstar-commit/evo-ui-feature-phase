import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';

import TablePagination from './TablePagination.jsx';
import TableColumn from './TableColumn.jsx';
import FirstExtraRow from './FirstExtraRow.jsx';
import LastExtraRow from './LastExtraRow.jsx';
import DetailsExtraRow from './DetailsExtraRow.jsx';
import CustomRow from './CustomRow.jsx';
import CheckBox from '../checkbox/CheckBox.jsx';

export default class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      itemStates: _.map(props.items, () => ({}))
    };
    this._preparedCustomRows = this._customRows();
  }

  _columns() {
    return _.filter(this.props.children, (child) => child.type === TableColumn);
  }

  _firstExtraRow() {
    return _.find(this.props.children, (child) => child.type === FirstExtraRow);
  }

  _lastExtraRow() {
    return _.find(this.props.children, (child) => child.type === LastExtraRow);
  }

  _detailsExtraRow() {
    return _.find(this.props.children, (child) => child.type === DetailsExtraRow);
  }

  _customRows() {
    return _.filter(this.props.children, (child) => child.type === CustomRow);
  }

  _renderHeadCells() {
    const headCells = this._columns().map((column, index) => <th key={'column' + index}
                                                                 className={column.props.classes}>
      {column.props.title}
    </th>);
    const selectionHeadCell = () => <th key="column-selection" className="row-selection-cell">
      <CheckBox value={ this._dataItems().length === this.selectedItems().length }
                onChange={ (newValue) => { this.selectAll(newValue) } }/>
    </th>;
    return this.props.supportsSelection ? [selectionHeadCell()].concat(headCells) : headCells;
  }

  _renderFirstExtraRow() {
    const firstExtraRow = this._firstExtraRow();
    if (firstExtraRow) {
      return <tr key="first-extra-row">{ firstExtraRow.props.children }</tr>
    }
  }

  _renderLastExtraRow() {
    const lastExtraRow = this._lastExtraRow();
    if (lastExtraRow) {
      return <tr key="last-extra-row">{ lastExtraRow.props.children }</tr>
    }
  }

  _renderBodyRows() {
    const detailsExtraRow = this._detailsExtraRow();
    let rows = [];
    this._currentPageDataItems().forEach((dataItem, dataItemIndex) => {
      const clonePredefinedRowComponent = (rowComponent, className) => {
        if (_.get(rowComponent, 'props.children.type')) {
          const rowContent = React.cloneElement(rowComponent.props.children, {
            item: dataItem,
            itemIndex: dataItemIndex
          });
          return <tr key={`row-details-${dataItemIndex}`} className={className}>{ rowContent }</tr>;
        } else {
          console.warn(`${rowComponent.type} must have exactly one child and the child must be React Component`);
        }
      };
      const cellValue = (getter) => {
        if (!getter) {
          return '';
        } else if (_.isFunction(getter)) {
          return getter(dataItem, dataItemIndex, this.state.itemStates[dataItemIndex]);
        } else {
          return _.get(dataItem, getter);
        }
      };
      const cell = (column, index) => {
        return <td key={`row-${dataItemIndex}-${index}`} className={column.props.classes}>
          { cellValue(column.props.getter) }
        </td>
      };
      const dataRowCells = () => this._columns().map((column, index) => cell(column, index));
      const selectionRowCell = () => <td className="row-selection-cell" key={`row-selection-${dataItemIndex}`}>
        <CheckBox value={ this.state.itemStates[dataItemIndex].selected }
                  onChange={ (selected) => { this.onItemSelected(dataItemIndex, selected) } }/>
      </td>;
      const allRowCells = () => this.props.supportsSelection ? [selectionRowCell()].concat(dataRowCells()) : dataRowCells();
      const matchedCustomRow = _.find(this._preparedCustomRows,
        (customRow) => customRow.props.predicate && customRow.props.predicate.call(this, dataItem, dataItemIndex));
      if (matchedCustomRow) {
        rows.push(clonePredefinedRowComponent(matchedCustomRow, 'custom-row'));
      } else {
        rows.push(<tr key={`row-${dataItemIndex}`}>{ allRowCells() }</tr>);
      }
      if (detailsExtraRow) {
        rows.push(clonePredefinedRowComponent(detailsExtraRow, 'details-extra-row'));
      }
    });
    return rows;
  }

  _renderTablePagination() {
    return this._pageCount() > 1 ?
      <TablePagination pageCount={this._pageCount()}
                       currentPage={this._currentPage()}
                       onPageClicked={ (pageIndex) => { this._setCurrentPage(pageIndex) } }/> :
      null;
  }

  _currentPage() {
    return this.state.currentPage || 0;
  }

  _dataItems() {
    return this.props.items || [];
  }

  _pageCount() {
    return Math.ceil(this._dataItems().length / this.props.pageSize);
  }

  _currentPageDataItems() {
    const allItems = this._dataItems();
    const currentPage = this._currentPage();
    const pageSize = this.props.pageSize;
    const startIndex = pageSize * currentPage;
    return allItems.slice(startIndex, startIndex + pageSize);
  }

  _setCurrentPage(pageIndex) {
    this.setState({
      currentPage: pageIndex
    });
  }

  componentWillReceiveProps(nextProps) {
    const equals = (x, y) => (x === y) || (x && y && x._id === y._id);
    const newItemStates = _.map(nextProps.items, (item, itemIndex) => {
      if (equals(item, this.props.items[itemIndex])) {
        return this.state.itemStates[itemIndex];
      }
      const existingItemIndex = _.findIndex(this.props.items, (existingItem) => existingItem === item);
      if (existingItemIndex) {
        return this.state.itemStates[existingItemIndex];
      }
      return {};
    });
    this.setState({
      itemStates: newItemStates
    });
  }

  render() {
    let classes = _.isString(this.props.classes) ? {} : {table: true};
    _.each(_.filter((this.props.classes || '').split(/\s/)), (cls) => {
      classes[cls] = true
    });
    return <div className="table" className={classNames(classes)}>
      <table>
        <thead>
        <tr>
          { this._renderHeadCells() }
        </tr>
        </thead>
        <tbody>
        { this._renderFirstExtraRow() }
        { this._renderBodyRows() }
        { this._renderLastExtraRow() }
        </tbody>
      </table>
      { this._renderTablePagination() }
    </div>;
  }

  onItemSelected(itemIndex, selected) {
    let newState = {itemStates: _.clone(this.state.itemStates)};
    newState.itemStates[itemIndex].selected = selected;
    this.setState(newState);
    this.raiseSelectionChange();
  }

  selectAll(selected) {
    this.setState({
      itemStates: _.map(this.state.itemStates, (itemState) => _.defaults({selected: selected}, itemState))
    });
    this.raiseSelectionChange();
  }

  raiseSelectionChange() {
    setTimeout(() => {
      this.props.onSelectionChange && this.props.onSelectionChange(this.selectedItems());
    }, 1);
  }

  selectedItems() {
    return _.filter(this.props.items, (item, itemIndex) => this.state.itemStates[itemIndex].selected);
  }

  isItemSelected(item) {
    const foundIndex = _.findIndex(this.props.items, (it) => it === item);
    return foundIndex ? this.state.itemStates[foundIndex].selected : false;
  }
}

Table.defaultProps = {
  pageSize: 5
};

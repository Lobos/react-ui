'use strict';

import React, { Component } from 'react';
import classnames from 'classnames';
import { substitute } from '../utils/strings';
import { hashcode } from '../utils/objects';
import PropTypes from '../utils/proptypes';
import Header from './Header';
import Pagination from '../Pagination';
import Checkbox from '../Checkbox';

import _tables from '../styles/_tables.scss';

export default class Table extends Component {
  constructor (props) {
    super(props);
    this.state = {
      sort: {}
    };

    this.onBodyScroll = this.onBodyScroll.bind(this);
  }

  componentDidMount () {
    this.setHeaderWidth();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.height !== this.props.height || nextProps.width !== this.props.width) {
      if (!this.checkHeadFixed(nextProps)) {
        let ths = this.refs.header.querySelectorAll('th');
        for (let i = 0, count = ths.length; i < count; i++) {
          ths[i].style.width = '';
        }
      }
    }
  }

  componentDidUpdate () {
    this.setHeaderWidth();
  }

  checkHeadFixed (props = this.props) {
    const { width, height } = props;
    return (!!width && width !== 'auto') || (!!height && height !== 'auto');
  }

  setHeaderWidth () {
    if (!this.checkHeadFixed()) return;

    let body = this.refs.body;
    let tr = body.querySelector('tr');

    if (!tr) return;

    let ths = this.refs.header.querySelectorAll('th');

    let tds = tr.querySelectorAll('td');

    if (tds.length <= 1) return;

    for (let i = 0, count = tds.length; i < count; i++) {
      if (ths[i]) {
        ths[i].style.width = tds[i].offsetWidth + 'px';
      }
    }
  }

  getSelected (name) {
    let values = [];
    this.state.data.forEach((d) => {
      if (d.$checked) {
        values.push(name ? d[name] : d);
      }
    });
    return values;
  }

  onBodyScroll (e) {
    let hc = this.refs.headerContainer;
    hc.style.marginLeft = (0 - e.target.scrollLeft) + 'px';
  }

  handleSelect (d, e, checked) {
    console.log(d, e, checked);
  }

  renderBody (data) {
    const { selectAble, headers } = this.props;

    if (!Array.isArray(data)) {
      return <tbody><tr><td colSpan={headers.length}>{data}</td></tr></tbody>;
    }

    const headerKeys = headers.map((h) => {
      return h.name || hashcode(h);
    });

    let trs = data.map((d, i) => {
      let tds = [];
      if (selectAble) {
        tds.push(
          <td className={_tables.checkbox} key="checkbox">
            <Checkbox isIndicator onChange={this.handleSelect.bind(this, d)} />
          </td>
        );
      }
      let rowKey = d.id ? d.id : hashcode(d);
      headers.map((h, j) => {
        if (h.hidden) {
          return;
        }
        let content = h.content;
        if (typeof content === 'string') {
          content = substitute(content, d);
        } else if (typeof content === 'function') {
          content = content(d);
        } else {
          content = d[h.name];
        }
        tds.push(<td key={headerKeys[j]}>{content}</td>);
      });
      return <tr key={rowKey}>{tds}</tr>;
    });

    return <tbody>{trs}</tbody>;
  }

  renderColgroup () {
    const { selectAble, headers } = this.props;
    let cols = [];
    if (selectAble) {
      cols.push(<col key="check" />);
    }
    headers.forEach((h, i) => {
      cols.push(<col key={i} style={h.width ? { width: h.width } : undefined} />);
    });
    return <colgroup>{cols}</colgroup>;
  }

  renderHeader () {
    let headers = [];
    if (this.props.selectAble) {
      headers.push(
        <Header key="checkbox" name="$checkbox" header={
          <Checkbox isIndicator onChange={this.handleSelect.bind(this, 'all')} />
        } />
      );
    }
    this.props.headers.map((header, i) => {
      if (header.hidden) {
        return;
      }

      let props = {
        key: header.name || i,
        onSort: this.props.onSort,
        sort: this.state.sort
      };

      headers.push(
        <Header {...header} {...props} />
      );
    });
    return <tr>{headers}</tr>;
  }

  renderPagination () {
    const { pagination } = this.props;
    if (!pagination) return;

    return (
      <div className={_tables[`pagi_${pagination.position}`]}>
        <Pagination {...pagination} />
      </div>
    );
  }

  render () {
    let bodyStyle = {};
    let headerStyle = {};
    let tableStyle = {};
    let onBodyScroll = null;

    const { data, height, width, bordered, striped } = this.props;
    let fixedHead = this.checkHeadFixed();

    if (height && height !== 'auto') {
      bodyStyle.height = height;
      bodyStyle.overflow = 'auto';
    }

    if (width && width !== 'auto') {
      headerStyle.width = width;
      tableStyle.width = width;
      bodyStyle.overflow = 'auto';
      onBodyScroll = this.onBodyScroll;
    }

    let className = classnames(
      this.props.className,
      _tables.table,
      bordered && _tables.bordered,
      height && _tables.scrolled,
      striped && _tables.striped
    );

    return (
      <div style={this.props.style} className={className}>
        {
          fixedHead &&
          <div className={_tables.header}>
            <div ref="headerContainer" style={headerStyle}>
              <table ref="header">
                <thead>{this.renderHeader()}</thead>
              </table>
            </div>
          </div>
        }

        <div className={_tables.body} onScroll={onBodyScroll} style={bodyStyle}>
          <table style={tableStyle} ref="body">
            { this.renderColgroup() }
            { !fixedHead && <thead>{this.renderHeader()}</thead> }
            { this.renderBody(data) }
          </table>
        </div>

        {this.renderPagination()}
      </div>
    );
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.array,
  className: PropTypes.string,
  data: PropTypes.array,
  filters: PropTypes.array,
  headers: PropTypes.array,
  height: PropTypes.number_string,
  onSort: PropTypes.func,
  pagination: PropTypes.object,
  selectAble: PropTypes.bool,
  striped: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.number_string
};

Table.defaultProps = {
  data: []
};

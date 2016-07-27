'use strict';

import React, { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { substitute } from './utils/strings';
import { deepEqual, hashcode } from './utils/objects';
import TableHeader from './TableHeader';
import { fetchEnhance } from './higherOrders/Fetch';

import { requireCss } from './themes';
requireCss('tables');

class Table extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: props.pagination ? props.pagination.props.index : 1,
      data: props.data,
      sort: {},
      total: null
    };

    this.onBodyScroll = this.onBodyScroll.bind(this);
  }

  componentDidMount () {
    this.setHeaderWidth();
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(nextProps.data, this.props.data)) {
      this.setState({ data: nextProps.data });
    }
  }

  componentDidUpdate () {
    this.setHeaderWidth();
  }

  checkHeadFixed () {
    const { height } = this.props;
    return !!height && height !== 'auto';
  }
  
  setHeaderWidth () {
    if (!this.checkHeadFixed()) {
      return;
    }
    let body = this.refs.body;
    let tr = body.querySelector('tr');
    if (!tr) {
      return;
    }

    let ths = this.refs.header.querySelectorAll('th');

    let tds = tr.querySelectorAll('td');
    if (tds.length <= 1) {
      return;
    }
    for (let i = 0, count = tds.length; i < count; i++) {
      if (ths[i]) {
        ths[i].style.width = tds[i].offsetWidth + 'px';
      }
    }
  }

  sortData (key, asc) {
    let data = this.state.data;
    data = data.sort(function(a, b) {
      var x = a[key];
      var y = b[key];
      if (asc) {
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      } else {
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
      }
    });
    this.setState({ data });
  }

  onSelect (i, e) {
    var checked = typeof e === 'boolean' ? e : e.target.checked,
        data = this.state.data,
        index = this.state.index,
        size = this.props.pagination ? this.props.pagination.props.size : data.length,
        start = 0,
        end = 0,
        lastSize = data.length % size,
        lastIndex = parseInt(data.length / size + 1);
    if (i === 'all') {
      start = (index - 1) * size;
      end = index === lastIndex ? (index - 1) * size + lastSize : index * size;
    } else {
      start = (index - 1) * size + i;
      end = start + 1;
    }

    for (; start < end; start++) {
      data[start].$checked = checked;
    }
    this.setState({data});
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

  getData () {
    let page = this.props.pagination,
        filters = this.props.filters,
        data = [];

    if (filters) {
      let filterCount = filters.length;
      this.state.data.forEach((d) => {
        let checked = true;
        for (let i = 0; i < filterCount; i++) {
          let f = filters[i].func;
          checked = f(d);
          if (!checked) {
            break;
          }
        }
        if (checked) {
          data.push(d);
        }
      });
    } else {
      data = this.state.data;
    }

    let total = data.length;

    if (!page) {
      return { total, data };
    }
    let size = page.props.size;
    if (data.length <= size) {
      return { total, data };
    }
    let index = this.state.index;
    data = data.slice((index - 1) * size, index * size);
    return { total, data };
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
          <td className="td-checkbox" key="checkbox">
            <input checked={d.$checked} onChange={this.onSelect.bind(this, i)} type="checkbox" />
          </td>
        );
      }
      let rowKey = d.id ? d.id : hashcode(d);
      headers.map((h, j) => {
        if (h.hidden) {
          return;
        }
        let content = h.content,
            tdStyle = {};
        if (typeof content === 'string') {
          content = substitute(content, d);
        } else if (typeof content === 'function') {
          content = content(d);
        } else {
          content = d[h.name];
        }
        if (h.width) {
          tdStyle.width = h.width;
        }
        tds.push(<td style={tdStyle} key={headerKeys[j]}>{content}</td>);
      });
      return <tr key={rowKey}>{tds}</tr>;
    });

    return <tbody>{trs}</tbody>;
  }

  renderHeader () {
    let headers = [];
    if (this.props.selectAble) {
      headers.push(
        <TableHeader key="checkbox" name="$checkbox" header={
          <input onClick={this.onSelect.bind(this, 'all')} type="checkbox" />
        } />
      );
    }
    this.props.headers.map((header, i) => {
      if (header.hidden) {
        return;
      }

      let props = {
        key: header.name || i,
        onSort: (name, asc) => {
          this.setState({sort: { name, asc }});
          if (this.props.onSort) {
            this.props.onSort(name, asc);
          } else {
            this.sortData(name, asc);
          }
        },
        sort: this.state.sort
      };

      headers.push(
        <TableHeader {...header} {...props} />
      );
    });
    return <tr>{headers}</tr>;
  }

  renderPagination (total) {
    if (!this.props.pagination) {
      return null;
    }

    let props = {
      total,
      onChange: (index) => {
        let data = this.state.data;
        data.forEach((d) => {
          d.$checked = false;
        });
        this.setState({index, data});
      }
    };
    return cloneElement(this.props.pagination, props);
  }

  render () {
    let bodyStyle = {},
        headerStyle = {},
        tableStyle = {},
        onBodyScroll = null,
        { total, data } = this.getData();

    const { height, width, bordered, striped } = this.props;
    let fixedHead = this.checkHeadFixed();

    if (height) {
      bodyStyle.height = height;
      bodyStyle.overflow = 'auto';
    }
    if (width) {
      headerStyle.width = width;
      if (typeof headerStyle.width === 'number') {
        headerStyle.width += 20;
      }
      tableStyle.width = width;
      bodyStyle.overflow = 'auto';
      onBodyScroll = this.onBodyScroll;
    }

    let className = classnames(
      this.props.className,
      'rct-table',
      {
        'rct-bordered': bordered,
        'rct-scrolled': height,
        'rct-striped': striped
      }
    );

    return (
      <div style={this.props.style} className={className}>
        { fixedHead &&
          <div className="header-container">
            <div ref="headerContainer" style={headerStyle}>
              <table ref="header">
                <thead>{this.renderHeader()}</thead>
              </table>
            </div>
          </div>
        }

        <div onScroll={onBodyScroll} style={bodyStyle} className="body-container">
          <table style={tableStyle} className="rct-table-body" ref="body">
            { !fixedHead && <thead>{this.renderHeader()}</thead> }
            {this.renderBody(data)}
          </table>
        </div>

        {this.renderPagination(total)}

      </div>
    );
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  children: PropTypes.array,
  className: PropTypes.string,
  data: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]),
  filters: PropTypes.array,
  headers: PropTypes.array,
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onSort: PropTypes.func,
  pagination: PropTypes.object,
  selectAble: PropTypes.bool,
  striped: PropTypes.bool,
  style: PropTypes.object,
  width: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ])
};

Table.defaultProps = {
  data: []
}

module.exports = fetchEnhance(Table);

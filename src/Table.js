'use strict';

import { Component, PropTypes, cloneElement } from 'react';
import classnames from 'classnames';
import { substitute } from './utils/strings';
import TableHeader from './TableHeader';

import { requireCss } from './themes';
requireCss('tables');

class Table extends Component {
  constructor (props) {
    super(props);
    this.state = {
      index: this.props.pagination ? this.props.pagination.props.index : 1,
      data: [],
      sort: {},
      total: null
    };
    this.unmounted = false;
  }

  componentWillMount () {
    this.fetchData(this.props.data);
  }

  componentDidMount () {
    this.setHeaderWidth();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.data !== this.props.data) {
      this.fetchData(nextProps.data);
    }
  }

  componentDidUpdate () {
    this.setHeaderWidth();
  }

  componentWillUnmount () {
    this.unmounted = true;
  }
  
  setHeaderWidth () {
    let body = this.refs.body;
    let tr = body.querySelector('tr');
    if (!tr) {
      return;
    }

    let ths = this.refs.header.querySelectorAll('th');

    let tds = tr.querySelectorAll('td');
    for (let i = 0, count = tds.length; i < count; i++) {
      if (ths[i]) {
        ths[i].style.width = tds[i].offsetWidth + 'px';
      }
    }
  }

  fetchData (data) {
    if (typeof data === 'function') {
      data.then((res) => {
        this.fetchData(res);
      })();
    } else {
      if (!this.unmounted) {
        this.setState({ data });
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

  onCheck (i, e) {
    let checked = typeof e === 'boolean' ? e : e.target.checked,
        data = this.state.data,
        index = this.state.index,
        size = this.props.pagination ? this.props.pagination.props.size : data.length,
        start = 0,
        end = 0;
    if (i === 'all') {
      start = (index - 1) * size;
      end = index * size;
    } else {
      start = (index - 1) * size + i;
      end = start + 1;
    }
    for (; start < end; start++) {
      data[start].$checked = checked;
    }
    this.setState({data});
  }

  getChecked (name) {
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
    let selectAble = this.props.selectAble;
    let trs = data.map((d, i) => {
      let tds = [];
      if (selectAble) {
        tds.push(
          <td style={{width: 13}} key="checkbox">
            <input checked={d.$checked} onChange={this.onCheck.bind(this, i)} type="checkbox" />
          </td>
        );
      }
      this.props.headers.map((h, j) => {
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
        tds.push(<td style={tdStyle} key={j}>{content}</td>);
      });
      return <tr key={i}>{tds}</tr>;
    });

    return <tbody>{trs}</tbody>;
  }

  renderHeader () {
    let headers = [];
    if (this.props.selectAble) {
      headers.push(
        <TableHeader key="checkbox" name="$checkbox" header={
          <input onClick={this.onCheck.bind(this, 'all')} type="checkbox" />
        } />
      );
    }
    this.props.headers.map((header, i) => {
      if (header.hidden) {
        return;
      }

      let props = {
        key: i,
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

    if (this.props.height) {
      bodyStyle.height = this.props.height;
      bodyStyle.overflow = 'auto';
    }
    if (this.props.width) {
      headerStyle.width = this.props.width;
      if (typeof headerStyle.width === 'number') {
        headerStyle.width += 20;
      }
      tableStyle.width = this.props.width;
      bodyStyle.overflow = 'auto';
      onBodyScroll = this.onBodyScroll.bind(this);
    }

    let className = classnames(
      this.props.className,
      'rct-table',
      {
        'rct-bordered': this.props.bordered,
        'rct-scrolled': this.props.height,
        'rct-striped': this.props.striped
      }
    );

    return (
      <div style={this.props.style} className={className}>
        <div className="header-container">
          <div ref="headerContainer" style={headerStyle}>
            <table ref="header">
              <thead>{this.renderHeader()}</thead>
            </table>
          </div>
        </div>

        <div onScroll={onBodyScroll} style={bodyStyle} className="body-container">
          <table style={tableStyle} className="rct-table-body" ref="body">
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
    PropTypes.func
  ]).isRequired,
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

module.exports = Table;

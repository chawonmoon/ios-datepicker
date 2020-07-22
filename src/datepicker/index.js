import React, { Component } from 'react';
import Item from './Item';

class Index extends Component {
  state = {
    currentYear: new Date().getFullYear(),
    currentMonth: 1,
    currentDay: 1
  };

  // date logic
  constructor(props) {
    super(props);

    this.getYears = this.getYears.bind(this);
    this.getMonths = this.getMonths.bind(this);
    this.getDays = this.getDays.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeDay = this.changeDay.bind(this);
  }

  getYears() {
    let currentYear = new Date().getFullYear();
    let years = [];

    for (let i = currentYear - 20; i < currentYear + 20; i++) {
      years.push({
        value: i,
        text: i + '年'
      });
    }
    return years;
  }

  getMonths(year) {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({
        value: i,
        text: i + '月'
      });
    }
    return months;
  }

  getDays(year, month) {
    let dayCount = new Date(year, month, 0).getDate();
    let days = [];

    for (let i = 1; i <= dayCount; i++) {
      days.push({
        value: i,
        text: i + '日'
      });
    }

    return days;
  }

  changeYear(selected) {
    const { currentMonth } = this.state;
    this.setState({
      ...this.state,
      currentYear: selected.value,
      daySource: this.getDays(selected.value, currentMonth)
    });
  }

  changeMonth(selected) {
    const { currentYear } = this.state;
    this.setState({
      ...this.state,
      currentMonth: selected.value,
      daySource: this.getDays(currentYear, selected.value)
    });
  }

  changeDay(selected) {
    this.setState({
      ...this.state,
      currentDay: selected.value
    });
  }

  componentDidMount() {
    const { currentYear, currentMonth } = this.state;
    let yearSource = this.getYears();
    let monthSource = this.getMonths();
    let daySource = this.getDays(currentYear, currentMonth);
    this.setState({
      ...this.state,
      yearSource: yearSource,
      monthSource: monthSource,
      daySource: daySource
    });
  }

  render() {
    const { yearSource, monthSource, daySource } = this.state;
    return (
      <div className="date-selector">
        <Item
          className="year"
          id="year1"
          option={{
            type: 'infinite',
            source: yearSource,
            count: 20,
            onChange: (selected) => this.changeYear(selected)
          }}
        />
        <Item
          className="month"
          id="month1"
          option={{
            type: 'infinite',
            source: monthSource,
            count: 20,
            onChange: (selected) => this.changeMonth(selected)
          }}
        />
        <Item
          className="day"
          id="day1"
          option={{
            type: 'infinite',
            source: daySource,
            count: 20,
            onChange: (selected) => this.changeDay(selected)
          }}
        />
      </div>
    );
  }
}

export default Index;

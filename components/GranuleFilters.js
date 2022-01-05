import { useState } from "react";

import { connect } from "react-redux";
import {
  selectGranuleFilters,
  selectCurrentGranuleFilter,
  doSetStartDate,
  doSetEndDate,
} from "../state/granuleSearchSlice";
import { selectDatasetColors } from "../state/datasetSearchSlice";
import { DateNumber } from "../utils/DateNumber";

function GranuleFilters({
  datasetId,
  datasetColors,
  startDate,
  endDate,
  onNewStartDate,
  onNewEndDate,
}) {
  const start = startDate ? format(new Date(startDate)) : "";
  const end = endDate ? format(new Date(endDate)) : "";

  function handleStartDateChange(event) {
    const dateString = event.target.value;
    if (!dateString) {
      onNewStartDate({ datasetId, startDate: null });
    } else {
      const dateNumber = DateNumber.fromIso(dateString);
      onNewStartDate({ datasetId, startDate: dateNumber });
    }
  }

  function handleEndDateChange(event) {
    console.log(event.target.value);
    const dateString = event.target.value;
    if (!dateString) {
      onNewEndDate({ datasetId, endDate: null });
    } else {
      const dateNumber = DateNumber.fromIso(dateString);
      onNewEndDate({ datasetId, endDate: dateNumber });
    }
  }

  return (
    <div className="container">
      <h3>{datasetId}</h3>
      <div className="row date-row">
        <div className="label">Filter By Date:</div>
        <span>From</span>
        <input
          type="date"
          id="granule-startDate-filter"
          value={start}
          onChange={handleStartDateChange}
        />
        <span>To</span>
        <input
          type="date"
          id="granule-endDate-filter"
          value={end}
          onChange={handleEndDateChange}
        />
      </div>

      <style jsx>{`
        .container {
          padding: 2rem 0;
        }

        h3 {
          margin: 0;
          margin-bottom: 0.5rem;
          border-bottom: 2px solid ${datasetColors[datasetId]};
          display: inline-block;
        }

        .row {
          width: 80%;
          display: grid;
          justify-items: center;
          align-items: center;
          padding: 0.2rem 0;
        }

        .date-row {
          grid-template-columns: 7rem auto 1fr auto 1fr;
        }

        .row > * {
          margin-right: 1.2rem;
        }

        input {
          width: 100%;
        }

        .label {
          justify-self: left;
        }
      `}</style>
    </div>
  );
}

function mapStateToProps(state) {
  const datasetId = selectCurrentGranuleFilter(state);
  const currentFilter = selectGranuleFilters(state)[datasetId];
  const startDate = currentFilter.startDate;
  const endDate = currentFilter.endDate;

  return {
    datasetId,
    startDate,
    endDate,
    datasetColors: selectDatasetColors(state),
  };
}

const mapDispatchToProps = {
  onNewStartDate: doSetStartDate,
  onNewEndDate: doSetEndDate,
};

export default connect(mapStateToProps, mapDispatchToProps)(GranuleFilters);

function format(date, defaultDate) {
  if (!date) {
    date = defaultDate;
  }
  const newDate = new Date(date);

  const yearString = newDate.getUTCFullYear();
  const month = newDate.getUTCMonth() + 1;
  let monthString = "" + month;
  if (month < 10) {
    monthString = "0" + month;
  }
  let dayOfMonth = newDate.getUTCDate();
  let dayOfMonthString = "" + dayOfMonth;
  if (dayOfMonth < 10) {
    dayOfMonthString = "0" + dayOfMonth;
  }

  const dateString = `${yearString}-${monthString}-${dayOfMonthString}`;
  return dateString;
}

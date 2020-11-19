/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable import/prefer-default-export */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import * as dc from "dc";
import { css, StyleAttribute } from "glamor";
import { CXContext } from "./cxContext";
// import { rhythm } from '../../utils/typography';
import { ContextType, DCGraphicType } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResetButton = (props: any) => {
  const style = css({
    // padding: rhythm(0.1),
    display: "inline",
    cursor: "pointer",
    float: "right",
    "&:hover": {
      background: "#ddd"
    }
  });
  return (
    <span
      {...style}
      onClick={() => {
        props.chart.filterAll();
        dc.redrawAll();
      }}
    >
      reset
    </span>
  );
};
// typefile is incorrect, https://dc-js.github.io/dc.js/docs/html/BubbleChart.html
// divs should be inlcuded, going to have to use anytime for div...
export const ChartTemplate = (props: {
  chartFunction: (
    divRef: HTMLDivElement,
    ndx: ContextType["ndx"]
  ) => DCGraphicType;

  // eslint-disable-next-line react/require-default-props
  styles?: StyleAttribute;
  title: string;
}) => {
  /*
    We render the dc chart using an effect. We want to pass the chart as a prop after the dc call,
    but there is nothing by default to trigger a re-render and the prop, by default would be undefined.
    To solve this, we hold a state key and increment it after the effect ran.
    By passing the key to the parent div, we get a rerender once the chart is defined.
    */

  const { title } = props;
  const context = React.useContext(CXContext);
  const [chart, updateChart] = React.useState({} as DCGraphicType);
  const { ndx } = context;
  const div = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const newChart = props.chartFunction(div.current!, ndx);

    newChart.render();
    updateChart(newChart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* Run this exactly once */

  const chartStyles = css({
    width: "100%",
    height: "auto",
    boxSizing: "border-box",
    // padding: rhythm(1),
    "& label": {
      textTransform: "capitalize",
      textDecoration: "underline"
    }
  });
  return (
    <div ref={div} {...chartStyles}>
      <ResetButton chart={chart} />
      <label>{title}</label>
    </div>
  );
};

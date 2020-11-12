import React from 'react';
import * as dc from 'dc';
import * as d3 from 'd3';
import { ChartTemplate } from './chartTemplate';
import { ColorMap, ContextType } from './types';

const eventScatterChartFunc = (
  divRef: HTMLDivElement,
  ndx: ContextType['ndx']
) => {
  const dimension = ndx.dimension((d) => [
    d.changePointTime,
    d.photonCountsMean,
    d.transitionDirection === -1 ? 'BG' : 'Signal',
  ]);

  const group = dimension.group();

  const plotColorMap = { BG: '#ff7f0e', Signal: '#2ca02c' } as ColorMap;

  const eventScatterChart = dc
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .scatterPlot(divRef as any)
    .useCanvas(true)
    .x(d3.scaleLinear().domain([0, 18]))
    .yAxisLabel('Photons/s')
    .xAxisLabel('Time')
    .keyAccessor((d) => {
      return d.key[0];
    })
    .valueAccessor((d) => {
      return d.key[1];
    })
    .clipPadding(10)
    .dimension(dimension)
    .highlightedSize(4)
    .symbolSize(3)
    .excludedSize(2)
    .excludedOpacity(0.5)
    // .excludedColor('#ddd')
    .group(group)
    .colorAccessor((d) => {
      return d.key[2];
    })
    .colors((colorKey) => {
      return plotColorMap[colorKey];
    });

  return eventScatterChart;
};

// eslint-disable-next-line import/prefer-default-export
export const EventScatterChart = () => (
  <ChartTemplate
    chartFunction={eventScatterChartFunc}
    title="Gains or Losses"
  />
);

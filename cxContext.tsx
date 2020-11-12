/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { RefObject } from 'react';
import crossfilter from 'crossfilter2';
import * as d3 from 'd3';
import './dc.css';
import { ContextType, NDXRow } from './types';

type DataContextState = { loading: boolean; hasNDX: boolean };

export const CXContext = React.createContext<ContextType>({} as ContextType);
export const dateFormatSpecifier = '%m/%d/%Y';
export const dateFormat = d3.timeFormat(dateFormatSpecifier);
export const dateFormatParser = d3.timeParse(dateFormatSpecifier);
export const numberFormat = d3.format('.2f');

// eslint-disable-next-line @typescript-eslint/ban-types
export class DataContext extends React.Component<{}, DataContextState> {
  ndx!: ContextType['ndx'];

  parent:
    | string
    | ((instance: HTMLDivElement | null) => void)
    | RefObject<HTMLDivElement>
    | null
    | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { loading: false, hasNDX: false };
  }

  componentDidMount() {
    const { hasNDX, loading } = this.state;

    if (hasNDX) {
      return;
    }
    if (loading) {
      return;
    }

    this.setState({ loading: true });
    d3.csv<keyof NDXRow>('https://raw.githubusercontent.com/parksj10/dc-React-StackBlitz/master/data/med_EveryBead.csv')
      .then((parsed: d3.DSVRowArray<string>) => {
        const data: NDXRow[] = parsed.map((row) => ({
          index: Number(row['']),
          file: String(row.File),
          decodedStateStart: Number(row['Decoded State (Start)']),
          decodedStateStop: Number(row['Decoded State (Stop)']),
          transitionDirection: Number(row['Transition Direction']),
          changePointTime: Number(row['Change Point Time (s)']),
          photonCountsMean: Number(row['Counts (Mean)']),
          photonCountsVariance: Number(row['Counts (Variance)']),
          photonCountsSum: Number(row['Counts (Sum)']),
          photonCountsMin: Number(row['Counts (Min)']),
          photonCountsMax: Number(row['Counts (Max)']),
          durationBins: Number(row['Duration (Number of Bins)']),
          durationMicroseconds: Number(row['Duration (us)']),
          coefDispersion: Number(row['Coefficient of Dispersion']),
          sampleSizeError: Number(row['Sample Size Error (%)']),
        }));

        this.ndx = crossfilter(data);
        this.setState({ loading: false, hasNDX: true });
        return 0;
      })
      // eslint-disable-next-line no-console
      .catch((e) => console.log(e));
  }

  render() {
    const { hasNDX } = this.state;
    if (!hasNDX) {
      return null;
    }
    return (
      <CXContext.Provider value={{ ndx: this.ndx }}>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <div ref={this.parent}>{this.props.children}</div>
      </CXContext.Provider>
    );
  }
}

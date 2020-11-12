import crossfilter from "crossfilter2";
import dc from "dc";

export interface NDXRow {
  index: number;
  file: string;
  decodedStateStart: number;
  decodedStateStop: number;
  transitionDirection: number; // -1 = BG, 1 = Signal
  changePointTime: number; // seconds
  photonCountsMean: number;
  photonCountsVariance: number;
  photonCountsSum: number;
  photonCountsMin: number;
  photonCountsMax: number;
  durationBins: number;
  durationMicroseconds: number;
  coefDispersion: number;
  sampleSizeError: number;
}

export type ContextType = { ndx: crossfilter.Crossfilter<NDXRow> };

export type DCGraphicType =
  | dc.PieChart
  | dc.SunburstChart
  | dc.BarChart
  | dc.LineChart
  | dc.DataCountWidget
  | dc.DataTableWidget
  | dc.DataGridWidget
  | dc.BubbleChart
  | dc.CompositeChart
  | dc.SeriesChart
  | dc.GeoChoroplethChart
  | dc.BubbleOverlayChart
  | dc.RowChart
  | dc.ScatterPlot
  | dc.NumberDisplayWidget
  | dc.HeatMap
  | dc.BoxPlot
  | dc.SelectMenu
  | dc.TextFilterWidget
  | dc.CBoxMenu;

export interface ColorMap {
  [key: string]: string | undefined;
}

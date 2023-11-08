import * as d3 from "d3"; 
import { AxisLeft } from "./AxisLeft";
import { AxisBottom } from "./AxisBottom";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type BreakPlotProps = {
    width: number;
    height: number;
    data: any[];
};

export const BreakPlot = ({ width, height, data }: BreakPlotProps) => {
  const filteredData = data.filter((d) => d['Pitches Thrown'] > 10);

  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;
  const yScale = d3.scaleLinear().domain([-20, 20]).range([boundsHeight, 0]);
  const xScale = d3.scaleLinear().domain([-20, 20]).range([0, boundsWidth]);

  function getColorBasedOnPitchType(pitchTypeAbbr: string) {
    const colorMap = {
      'CH': 'blue',
      'CU': 'green',
      'FC': 'yellow',
      'FA': 'red',
      'SI': 'orange',
      'SL': 'purple',
      'FS': 'pink',
      'ST': 'Aqua'
    };
    return colorMap[pitchTypeAbbr] || 'gray';
  }



  const circles = filteredData.map((d, i) => {
    const color = getColorBasedOnPitchType(d['Pitch Type Abbr'])
    return (
      <g key={i}>
      <circle
        key={i}
        r={12}
        cx={xScale(d["Avg HB"])}
        cy={yScale(d["Avg VB"])}
        opacity={1}
        stroke={color}
        fill={color}
        fillOpacity={0.2}
        strokeWidth={1}
      />
      <text
        x={xScale(d['Avg HB'])}
        y={yScale(d['Avg VB'])}
        dy="0.35em"
        textAnchor="middle"
        fill="black"
        fontSize="12px"
      >
        {d['Pitch Type Abbr']}
      </text>
      </g>
    );
  });

  
    return (
        <div>
        <svg width={width} height={height}>
          <g
            width={boundsWidth}
            height={boundsHeight}
            transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
          >
            <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />
  
            <g transform={`translate(0, ${boundsHeight})`}>
              <AxisBottom
                xScale={xScale}
                pixelsPerTick={40}
                height={boundsHeight}
              />
            </g>
  
            {circles}
          </g>
        </svg>
      </div>
    );
  };
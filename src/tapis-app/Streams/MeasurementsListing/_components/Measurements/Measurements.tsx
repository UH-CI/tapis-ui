import React from 'react';
import Plot from "react-plotly.js";
import "./Measurements.scss";
import { v4 as uuidv4 } from "uuid";

const Measurements: React.FC<{ variable: string, graphWidth: number, id: string, measurements: {[datetime: string]: number}, select: () => void }> = ({
  variable,
  graphWidth,
  id,
  measurements,
  select
}) => {
    let plotlyLayout: Partial<Plotly.Layout> = {
      width: graphWidth,
      height: 400
    };
    let plotlyData: any = [
      {
        x: [],
        y: [],
        type: 'scatter'
      }
    ];
    for(let date in measurements) {
      plotlyData[0].x.push(date);
      plotlyData[0].y.push(measurements[date]);
    }
  
    return (
      <li onClick={select}>
          {`${variable}`}
          <div className="measurements-list">  
            {
              Object.entries(measurements).map((entry: [string, number]) => {
                let date = entry[0].replace("T", " ");
                return (
                  <div key={uuidv4()}>
                    {`${date}: ${entry[1]}`}
                  </div>
                )
              })
            }
          </div>
          <div id={id} className="graph-container">
            <div id={`${id}_size_wrapper`}>
              <Plot
                data={plotlyData}
                layout={plotlyLayout}
              />
            </div>
          </div>  
      </li>
    );
  };

export default Measurements;

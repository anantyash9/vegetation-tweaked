import { Component, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { Router, NavigationExtras } from "@angular/router";
import { ChartDataSets, ChartOptions } from "chart.js";
import { Color, Label } from "ng2-charts";
import * as moment from "moment";
import doneneDatajson from "../../assets/json_data/drone_data.json";
import * as Chart from "chart.js";
import * as _ from "lodash";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MapComponent } from "../map/map.component";
import { environment } from "../../environments/environment";

@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  doneneData: any = doneneDatajson;
  ChartDataSets = this.doneneData[0].drones[0].vegetationGraph;
  public lineChartData: ChartDataSets[] = this.ChartDataSets;
  // public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartLabels: Label[] = this.doneneData[0].drones[0]
    .vegetationGraph[0].labelData;
  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public startScan() {
    this._http
      .get("http://localhost:5005/startscan")
      .toPromise()
      .then((val: any) => {
        console.log("val");
      })
      .catch(err => {
        console.error(err);
      });
  }
  public stopScan() {
    this._http
      .get("http://localhost:5005/stopscan")
      .toPromise()
      .then((val: any) => {
        console.log("val");
      })
      .catch(err => {
        console.error(err);
      });
  }
  public lineChartColors: Color[] = [
    {
      borderColor: "#35ad44",
      backgroundColor: "rgba(53,173,68,0.7)"
    },
    {
      borderColor: "#35ad44",
      backgroundColor: "rgba(53,173,68,0.7)"
    },
    {
      borderColor: "#35ad44",
      backgroundColor: "rgba(53,173,68,0.7)"
    },
    {
      borderColor: "#8bb4fd",
      backgroundColor: "rgba(255,0,0,0)"
    },
    {
      borderColor: "#fc3f3f",
      backgroundColor: "rgba(255,0,0,0)"
    }
  ];
  public lineChartLegend = false;
  public lineChartType = "line";
  public lineChartPlugins = [];
  public lineDataURL = "http://localhost:5005/graph";

  zipcode;
  dateVal;
  timeval;
  env = environment;

  public page = 1;
  constructor(private _http: HttpClient) {}
  ngOnInit() {
    // this.doneneData[0].drones[0].vegetationGraph.forEach(obj => {
    // this.ChartDataSets.push([new Date(), obj.data, obj.label]);
    // });
    // ChartDataSets = this.doneneData[0].drones[0].vegetationGraph;
    //console.log(this.doneneData[0].drones[0].vegetationGraph);
    //this.env.isHeadContent = true;
    this.zipcode = localStorage.getItem("zipCode");
    this.dateVal = localStorage.getItem("Dateval");
    this.timeval = localStorage.getItem("timeval");
    /*this.zipcode = this.env.glZipcode;
	  this.dateVal = this.env.glDateVal;
    this.timeval = this.env.glTimeVal; */
    let self = this;
    function getDataSets() {
      return new Promise((resolve, reject) => {
        var data = {
          safetyLimit: 0,
          data: []
        };
        self.page += 1;
        self._http
          .get(self.lineDataURL + "?page = " + self.page)
          .toPromise()
          .then(output => {
            resolve(output);
          })
          .catch(err => {
            resolve(data);
          });
      });
    }
    function findX(pos, neg, sl) {
      return ((sl - pos.y) * (pos.x - neg.x)) / (pos.y - neg.y) + pos.x;
    }
    function sortByX(arr) {
      return _.sortBy(arr, [
        o => {
          return o.x;
        }
      ]);
    }
    function getPoints(lineData) {
      var positiveLine: Chart.ChartPoint[] = [];
      var negativeLine: Chart.ChartPoint[] = [];
      var safetyLine: Chart.ChartPoint[] = [];
      var electricLine: Chart.ChartPoint[] = [];
      lineData = sortByX(lineData);
      lineData.forEach(element => {
        var pos: Chart.ChartPoint = {
          x: element.x,
          y: null
        };
        var neg: Chart.ChartPoint = {
          x: element.x,
          y: null
        };
        if (element.y > safetyLimit) {
          pos.y = element.y;
        } else if (element.y < safetyLimit) {
          neg.y = element.y;
        } else {
          pos.y = element.y;
          neg.y = element.y;
        }
        positiveLine.push(pos);
        negativeLine.push(neg);
        safetyLine.push({ x: element.x, y: safetyLimit });
        electricLine.push({ x: element.x, y: 0 });
      });

      for (let i = 0; i < lineData.length - 1; i++) {
        const posEle = positiveLine[i];
        const negEle = negativeLine[i];
        const posEleNext = positiveLine[i + 1];
        const negEleNext = negativeLine[i + 1];
        var x: number;

        if (posEle.y == null && negEleNext.y == null) {
          x = findX(negEle, posEleNext, safetyLimit);
        } else if (posEleNext.y == null && negEle.y == null) {
          x = findX(negEleNext, posEle, safetyLimit);
        }
        if (x != null) {
          positiveLine.push({ x: x, y: safetyLimit });
          negativeLine.push({ x: x, y: safetyLimit });
          safetyLine.push({ x: x, y: safetyLimit });
          electricLine.push({ x: x, y: 0 });
        }
      }
      positiveLine = sortByX(positiveLine);
      negativeLine = sortByX(negativeLine);
      safetyLine = sortByX(safetyLine);
      electricLine = sortByX(electricLine);
      return {
        positiveLine: positiveLine,
        negativeLine: negativeLine,
        safetyLine: safetyLine,
        electricLine: electricLine
      };
    }
    function getOptions(lineDataSet) {
      let scaleLabelX: Chart.ScaleTitleOptions = {
        display: true,
        labelString: "Distance from start",
        fontColor: "#595959",
        fontFamily: "myriad-pro, Arial",
        fontSize: 16
      };
      let scaleLabelY: Chart.ScaleTitleOptions = {
        display: true,
        labelString: "Distance from wire",
        fontColor: "#595959",
        fontFamily: "myriad-pro, Arial",
        fontSize: 16
      };
      let options: ChartOptions = {
        scales: {
          xAxes: [
            {
              type: "linear",
              ticks: {
                max: _.max(_.map(lineDataSet, "x")),
                min: _.min(_.map(lineDataSet, "x")),
                beginAtZero: true
              },
              scaleLabel: scaleLabelX
            }
          ],
          yAxes: [
            {
              ticks: {
                reverse: true,
                max: _.max(_.map(lineDataSet, "y")),
                min: Math.min(_.min(_.map(lineDataSet, "y")), 0)
              },
              scaleLabel: scaleLabelY
            }
          ]
        },
        legend: { display: true, fullWidth: false },
        title: {
          display: true,
          text: "Vegetation Graph",
          fontFamily: "Arial W01 bold",
          fontSize: 20,
          fontStyle: "normal",
          fontColor: "#323858"
        },
        responsive: true
      };

      return options;
    }

    // LOGIC STARTs
    var ctx = document.getElementById("vegetationGraph") as HTMLCanvasElement;
    var scatterChart: Chart;
    var safetyLimit: number;
    getDataSets().then(data => {
      safetyLimit = data["safety"];

      var lineDataSet = data["data"];
      var linesData = getPoints(lineDataSet);
      var dataSets: ChartDataSets[] = [
        {
          fill: false,
          lineTension: 0.6,
          label: "Vegetation Safe",
          backgroundColor: "rgba(75,192,192,0)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointRadius: 0.5,
          data: linesData.positiveLine
        },
        {
          fill: "+1",
          label: "Vegitation Crossed safetylimit",
          lineTension: 0.6,
          backgroundColor: "rgba(255,77,77,1)",
          borderColor: "rgba(255,77,77,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderWidth: 1,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(255,77,77,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 1,
          pointHoverBackgroundColor: "rgba(255,77,77,1)",
          pointHoverBorderColor: "rgb(255,77,77,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 0.5,
          pointHitRadius: 1,
          data: linesData.negativeLine
        },
        {
          borderColor: "rgba(0, 153, 51,1)",
          backgroundColor: "rgba(75,192,192,0)",
          label: "Safety Line",
          fill: false,
          pointRadius: 0.5,
          borderWidth: 1,
          pointHoverRadius: 1,
          pointHitRadius: 1,
          data: linesData.safetyLine
        },
        {
          borderColor: "rgba(0,0,255,1)",
          backgroundColor: "rgba(75,192,192,0)",
          label: "Electric Line",
          fill: false,
          pointRadius: 0.5,
          borderWidth: 1,
          pointHoverRadius: 1,
          pointHitRadius: 1,
          data: linesData.electricLine
        }
      ];
      scatterChart = new Chart(ctx, {
        type: "line",
        data: {
          datasets: dataSets
        },
        options: getOptions(lineDataSet)
      });
    });

    setInterval(function() {
      getDataSets().then(data => {
        safetyLimit = data["safety"];

        var lineDataSet = data["data"];
        var lines = getPoints(lineDataSet);
        scatterChart.data.datasets[0].data = lines.positiveLine;
        scatterChart.data.datasets[1].data = lines.negativeLine;
        scatterChart.data.datasets[2].data = lines.safetyLine;
        scatterChart.data.datasets[3].data = lines.electricLine;

        scatterChart.options = getOptions(lineDataSet);

        scatterChart.update();
      });
    }, 100);
  }
}
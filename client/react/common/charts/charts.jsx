import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export class Armcharts extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
    };

    componentDidMount() {
        let chart = am4core.create("chartdiv", am4charts.XYChart);

        chart.paddingRight = 20;

        chart.colors.step = 2;

        chart.fontSize = 15;

// Add data
        chart.data = this.props.data;
        console.log(chart.data)
// Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.minGridDistance = 100;
        dateAxis.baseInterval ={
            timeUnit: "second",
            count: 3
        };
        // dateAxis.dateFormats.setKey("day", "MMMM dt");

// Create series
        function createAxisAndSeries(field, name, opposite, bullet) {
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

            var series = chart.series.push(new am4charts.LineSeries());
            series.dataFields.valueY = field;
            series.dataFields.dateX = "time";

            series.strokeWidth = 2;
            series.yAxis = valueAxis;
            series.name = name;
            series.tooltipText = "{name}: [bold]{valueY}[/]";
            series.tensionX = 0.8;

            var interfaceColors = new am4core.InterfaceColorSet();

            switch(bullet) {
                case "triangle":
                    var bullet = series.bullets.push(new am4charts.Bullet());
                    bullet.width = 12;
                    bullet.height = 12;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var triangle = bullet.createChild(am4core.Triangle);
                    triangle.stroke = interfaceColors.getFor("background");
                    triangle.strokeWidth = 2;
                    triangle.direction = "top";
                    triangle.width = 12;
                    triangle.height = 12;
                    break;
                case "rectangle":
                    var bullet = series.bullets.push(new am4charts.Bullet());
                    bullet.width = 10;
                    bullet.height = 10;
                    bullet.horizontalCenter = "middle";
                    bullet.verticalCenter = "middle";

                    var rectangle = bullet.createChild(am4core.Rectangle);
                    rectangle.stroke = interfaceColors.getFor("background");
                    rectangle.strokeWidth = 2;
                    rectangle.width = 10;
                    rectangle.height = 10;
                    break;
                default:
                    var bullet = series.bullets.push(new am4charts.CircleBullet());
                    bullet.circle.stroke = interfaceColors.getFor("background");
                    bullet.circle.strokeWidth = 2;
                    break;
            }

            valueAxis.renderer.line.strokeOpacity = 1;
            valueAxis.renderer.line.strokeWidth = 2;
            valueAxis.renderer.line.stroke = series.stroke;
            valueAxis.renderer.labels.template.fill = series.stroke;
            valueAxis.renderer.opposite = opposite;
            valueAxis.renderer.grid.template.disabled = true;
        }

        createAxisAndSeries("temperature", "Temperature", false, "circle");
        createAxisAndSeries("humidity", "Humidity", true, "triangle");


// Add legend
        chart.legend = new am4charts.Legend();

// Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();
// generate some random data, quite different range
//         function generateChartData() {
//             var chartData = [];
//             var firstDate = new Date();
//             firstDate.setDate(firstDate.getDate() - 100);
//             firstDate.setHours(0, 0, 0, 0);
//
//             var visits = 1600;
//             var hits = 2900;
//             var views = 8700;
//
//             for (var i = 0; i < 15; i++) {
//                 // we create date objects here. In your data, you can have date strings
//                 // and then set format of your dates using chart.dataDateFormat property,
//                 // however when possible, use date objects, as this will speed up chart rendering.
//                 var newDate = new Date(firstDate);
//                 newDate.setDate(newDate.getDate() + i);
//
//                 visits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
//                 hits += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
//                 views += Math.round((Math.random()<0.5?1:-1)*Math.random()*10);
//
//                 chartData.push({
//                     date: newDate,
//                     visits: visits,
//                     hits: hits,
//                     views: views
//                 });
//             }
//             return chartData;
//         }

        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }

    componentDidUpdate(oldProps) {
        if (oldProps.paddingRight !== this.props.paddingRight) {
            this.chart.paddingRight = this.props.paddingRight;
        }
    }

    render() {
        return (
          <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
        );
    }
}
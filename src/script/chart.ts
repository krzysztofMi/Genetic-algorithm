import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

export default function makeChart(epoch: number, y: number[], divName: string) {
    let data = []
    for(let i = 1; i<=epoch; i++) {
        data.push({epoch: i, value: y[i-1]});
    }

    /* Chart code */
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    let chart = am4core.create(divName, am4charts.XYChart);
    chart.data = data;

    // Create axes
    let epochAxis = chart.xAxes.push(new am4charts.ValueAxis());
    epochAxis.renderer.minGridDistance = 60;
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "value";
    series.dataFields.valueX = "epoch";
    series.tooltipText = "{value}"
    
    series.tooltip.pointerOrientation = "vertical";
    
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.snapToSeries = series;
    chart.cursor.xAxis = epochAxis;
    
    //chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarX = new am4core.Scrollbar();
}
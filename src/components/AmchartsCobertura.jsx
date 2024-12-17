import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import './AmchartsCobertura.css';

const MapChart = () => {
  const chartDivRef = useRef(null);

  useEffect(() => {
    // Create root element
    const root = am5.Root.new(chartDivRef.current);

    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);

    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'rotateX',
        panY: 'rotateY',
        projection: am5map.geoOrthographic(),
        paddingBottom: 20,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
      })
    );

    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    const specialCountries = {
      US: {
        color: '#FF0000',
        contact: 'John Doe',
        position: 'CEO',
        phone: '+1 123-456-7890',
      },
      BR: {
        color: '#FF0000',
        contact: 'Ana Silva',
        position: 'Marketing Director',
        phone: '+55 21 98765-4321',
      },
      CN: {
        color: '#FF0000',
        contact: 'Li Wei',
        position: 'Regional Manager',
        phone: '+86 10 1234-5678',
      },
      RU: {
        color: '#FF0000',
        contact: 'Ivan Petrov',
        position: 'Sales Manager',
        phone: '+7 495 123-4567',
      },
      IN: {
        color: '#FF0000',
        contact: 'Raj Patel',
        position: 'Finance Director',
        phone: '+91 22 3456-7890',
      },
      ZA: {
        color: '#FF0000',
        contact: 'Zanele Moyo',
        position: 'Operations Manager',
        phone: '+27 11 234-5678',
      },
    };

    // Set up tooltips and styles for special countries
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: '{name}\nContact: {contact}\nPosition: {position}\nPhone: {phone}',
      interactive: true,
      fill: am5.color('#CCCCCC'), // Default color
    });

    polygonSeries.mapPolygons.template.adapters.add('tooltipText', (tooltipText, target) => {
      const countryId = target.dataItem.get('id');
      return specialCountries[countryId] ? tooltipText : '';
    });

    polygonSeries.mapPolygons.template.adapters.add('interactive', (interactive, target) => {
      const countryId = target.dataItem.get('id');
      return !!specialCountries[countryId];
    });

    polygonSeries.mapPolygons.template.adapters.add('fill', (fill, target) => {
      const countryId = target.dataItem.get('id');
      return specialCountries[countryId] ? am5.color(specialCountries[countryId].color) : fill;
    });

    polygonSeries.data.setAll(
      Object.keys(specialCountries).map((id) => ({
        id,
        name: id,
        ...specialCountries[id],
      }))
    );

    // Add graticule
    const graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, { step: 10 })
    );
    graticuleSeries.mapLines.template.set('strokeOpacity', 0.1);

    // Add background
    const backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get('alternativeBackground'),
      fillOpacity: 0.1,
      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });


    // Rotate animation
    chart.animate({
    key: "rotationX",
    from: 0,
    to: 360,
    duration: 30000,
    loops: Infinity
    });

    // Animate chart
    chart.appear(1000, 100);


  

    return () => {
      root.dispose();
    };
  }, []);

  return <div id="chartdiv" ref={chartDivRef} style={{ width: '50%', height: '500px' }} >
    <div className="logo-cover"></div>
  </div>;
};

export default MapChart;

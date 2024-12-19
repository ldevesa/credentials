import React, { useEffect, useRef } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5map from '@amcharts/amcharts5/map';
import am5geodata_worldLow from '@amcharts/amcharts5-geodata/worldLow';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import './AmchartsCobertura.css';

const MapChart = () => {
  const chartDivRef = useRef(null);
  let animation; // Variable para la animación de rotación
  let inactivityTimer; // Temporizador para reiniciar la animación

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
        wheelY: "none"
      })
    );

    let cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40
      })
    );

    // Add labels and controls switch globe/map
    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe"
      })
    );

    let switchButton = cont.children.push(
      am5.Button.new(root, {
        themeTags: ["switch"],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ["icon"]
        })
      })
    );
    
    switchButton.on("active", function() {
      if (switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        chart.set("panY", "translateY");
        chart.set("rotationY", 0);
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
      } else {
        chart.set("projection", am5map.geoOrthographic());
        chart.set("panY", "rotateY");
    
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
      }
    });
    
    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map"
      })
    );

    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    const specialCountries = {
      CA: {
        color: '#000036',
      },
      US: {
        color: '#000036',
      },
      AR: {
        color: '#000036',
      },
      BR: {
        color: '#000036',

      },
/*       ZA: {
        color: '#FF0000',
        contact: 'Zanele Moyo',
        position: 'Operations Manager',
        phone: '+27 11 234-5678',
      }, */
    };

    // Set up tooltips and styles for special countries
    polygonSeries.mapPolygons.template.setAll({
      //tooltipText: '{name}\nContact: {contact}\nPosition: {position}\nPhone: {phone}\nOffice: {office}',
      interactive: true,
      fill: am5.color('#dddddd'), // Default color
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

    
    // Add point series for markers
    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    //const colorset = am5.ColorSet.new(root, {});

    pointSeries.bullets.push(function (root, series, dataItem) {
      const container = am5.Container.new(root, {
        //tooltipText: "{pais}\n{centro}\nContact: {contact}\n{qr}\nPosition: {position}\nPhone: {phone}",
        tooltipHTML: `
        <div style="text-align: center;">
          <strong>{pais}</strong><br>
          Contact: {contact}<br>
          Position: {position}<br>
          Phone: {phone}<br>
          <img src="{qr}" alt="QR Code" style="width: 100px; height: 100px; margin-top: 5px;">
        </div>
        `,
        cursorOverStyle: "pointer",
      });

      /* container.events.on("click", (e) => {
        window.location.href = e.target.dataItem.dataContext.url;
      }); */

      const circle = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          //fill: colorset.next(),
          fill: dataItem.dataContext.color,
          strokeOpacity: 0,
        })
      );

      const circle2 = container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          //fill: colorset.next(),
          fill: dataItem.dataContext.color,
          strokeOpacity: 0,
          tooltipText: "{pais}",
        })
      );

      circle.animate({
        key: "scale",
        from: 1,
        to: 5,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      circle.animate({
        key: "opacity",
        from: 1,
        to: 0.1,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    // Define cities - https://www.coordenadas-gps.com/
    const cities = [
      {
        pais: "Canada",
        latitude: 51.2538,
        longitude: -113.5086,
        centro: "Operaciones",
        qr: "/credentials/images/qr/vbueno.png",
        url: "mailto:2Jl9a@example.com",
        contact: "Jean Dupont",
        position: "Regional Manager",
        phone: "+32 2 123 4567",
        color: am5.color(0xFF5733), // Color personalizado para Canadá
      },
      {
        pais: 'USA',
        latitude: 37.0902,
        longitude: -95.7129,
        centro: 'Oficina comercial',
        qr: "/credentials/images/qr/vbueno.png",
        url: 'http://www.amcharts.com',
        contact: 'John Doe',
        position: 'Sales Manager',
        phone: '+1 123 456 7890',
        color: am5.color(0x02DE47), // Color personalizado para USA
      },
    ];

    // Function to add cities to point series
    function addCity(longitude, latitude, pais, centro, qr, url, contact, position, phone, color) {
      pointSeries.data.push({
        url: url,
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        pais: pais,
        centro: centro,
        qr: qr,
        contact: contact,
        position: position,
        phone: phone,
        color: color
      });
    }

    // Add cities to the map
    cities.forEach((city) => {
      addCity(
        city.longitude,
        city.latitude,
        city.pais,
        city.centro,
        city.qr,
        city.url,
        city.contact,
        city.position,
        city.phone,
        city.color
      );
    });

    // Función para iniciar la animación
    const startRotation = () => {
      animation = chart.animate({
        key: 'rotationX',
        from: chart.get('rotationX'),
        to: chart.get('rotationX') + 360,
        duration: 30000,
        loops: Infinity,
      });
    };

    // Iniciar la rotación automáticamente al cargar la página
    startRotation();

    // Detener animación al interactuar
    const stopRotation = () => {
      if (animation) {
        animation.stop();
        animation = null;
      }
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        startRotation(); // Reiniciar rotación después de 10 segundos
      }, 10000);
    };

    // Escuchar eventos de interacción
    const handleUserInteraction = () => stopRotation();
    chartDivRef.current.addEventListener('mousedown', handleUserInteraction);
    chartDivRef.current.addEventListener('wheel', handleUserInteraction);

    // Limpiar al desmontar el componente
    return () => {
      root.dispose();
      clearTimeout(inactivityTimer);
      chartDivRef.current.removeEventListener('mousedown', handleUserInteraction);
      chartDivRef.current.removeEventListener('wheel', handleUserInteraction);
    };
  }, []);

  return <div id="chartdiv" ref={chartDivRef} style={{ width: '50%', height: '500px' }} >
    <div className="logo-cover"></div>
  </div>;
};

export default MapChart;

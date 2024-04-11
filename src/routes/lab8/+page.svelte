<header style="display: flex; gap: 1em; align-items: baseline;">
    <h1>Project Mbappe</h1>
    <label style="margin-left: auto;">Filter by time: 
        <input type="range" id="time-slider" min="-1" max="1440" bind:value={timeFilter}>
        {#if timeFilter != -1}
        <time style="display: block;">{timeFilterLabel}</time>
        {/if}
    </label>
    {#if timeFilter == -1}
        <em style="display: block;">(any time)</em>
    {/if}
</header>
<div id="map">
	<svg>
        {#key mapViewChanged}
            {#each filteredStations as station}
                <circle { ...getCoords(station) } r={radiusScale(station.totalTraffic)} fill="steelblue" style="--departure-ratio: { stationFlow(station.departures / station.totalTraffic) }" />
            {/each}
        {/key}
    </svg>
</div>
<div class="legend">
    <div class="legend-label">Legend:</div>
    <div class="legend-item" style="--departure-ratio: 1">More departures</div>
    <div class="legend-item" style="--departure-ratio: 0.5">Balanced</div>
    <div class="legend-item" style="--departure-ratio: 0">More arrivals</div>
</div>

<style>
    @import url("$lib/global.css");
</style>
<script>
    import mapboxgl from "mapbox-gl";
    import "../../../node_modules/mapbox-gl/dist/mapbox-gl.css";
    import { onMount } from "svelte";
    import * as d3 from "d3";

    mapboxgl.accessToken = "pk.eyJ1IjoiYWpvdmFub3YiLCJhIjoiY2x1c3o0aTQ1MDQ2YTJsbDByazJ4ZjBldSJ9.rpA7_hHnT1W9U2XCnfrJsQ";

    let stations = [];
    let trips = [];
    let arrivals;
    let departures;
    let map;
    let timeFilter = -1;
    $: timeFilterLabel = new Date(0, 0, 0, 0, timeFilter)
                     .toLocaleString("en", {timeStyle: "short"});


    let radiusScale;
    $: radiusScale = d3.scaleSqrt()
        .domain([0, d3.max(stations, d => d.totalTraffic)])
        .range([0, 35]);


    let mapViewChanged = 0;
    $: map?.on("move", evt => mapViewChanged++);

    function getCoords (station) {
        let point = new mapboxgl.LngLat(+station.Long, +station.Lat);
        let {x, y} = map.project(point);
        return {cx: x, cy: y};
    }

    function minutesSinceMidnight (date) {
        return date.getHours() * 60 + date.getMinutes();
    }
    let filteredArrivals;
    let filteredDepartures;
    let filteredStations = [];
    let filteredTrips = [];
    $: filteredTrips = timeFilter === -1? trips : trips.filter(trip => {
        let startedMinutes = minutesSinceMidnight(trip.started_at);
        let endedMinutes = minutesSinceMidnight(trip.ended_at);
        return Math.abs(startedMinutes - timeFilter) <= 60
            || Math.abs(endedMinutes - timeFilter) <= 60;
    });

    $: filteredArrivals = d3.rollup(filteredTrips, v => v.length, d => d.end_station_id);
    $: filteredDepartures = d3.rollup(filteredTrips, v => v.length, d => d.start_station_id);
        // Filtered stations
    $: filteredStations = stations.map(station => {
        station = {...station}
        let id = station.Number;
        station.arrivals = filteredArrivals.get(id) ?? 0;
        station.departures = filteredDepartures.get(id) ?? 0;
        station.totalTraffic = filteredArrivals.get(id) + filteredDepartures.get(id) ?? 0;
        return station;
    });

    let stationFlow = d3.scaleQuantize()
        .domain([0, 1])
        .range([0, 0.5, 1]);

    onMount(async () => {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v12',
            zoom: 12,
            center: [-71.0942, 42.3601],
        });

        await new Promise(resolve => map.on("load", resolve));
        map.addSource("boston_route", {
            type: "geojson",
            data: "https://bostonopendata-boston.opendata.arcgis.com/datasets/boston::existing-bike-network-2022.geojson?outSR=%7B%22latestWkid%22%3A3857%2C%22wkid%22%3A102100%7D",
        });
        map.addLayer({
            id: "bosBikeLanes",
            type: "line",
            source: "boston_route",
            paint: {
                "line-color": "blue",
                "line-width": 2,
                "line-opacity": 0.4,
            },
        });

        map.addSource("cambridge_route", {
            type: "geojson",
            data: "https://raw.githubusercontent.com/cambridgegis/cambridgegis_data/main/Recreation/Bike_Facilities/RECREATION_BikeFacilities.geojson",
        });
        map.addLayer({
            id: "camBikeLanes",
            type: "line",
            source: "cambridge_route",
            paint: {
                "line-color": "blue",
                "line-width": 2,
                "line-opacity": 0.4,
            },
        });

        stations = await d3.csv("https://vis-society.github.io/labs/8/data/bluebikes-stations.csv");
        console.log("bb: ", stations);

        // trips = await d3.csv("https://vis-society.github.io/labs/8/data/bluebikes-traffic-2024-03.csv");
        // console.log("trips: ", trips)
        trips = await d3.csv("https://vis-society.github.io/labs/8/data/bluebikes-traffic-2024-03.csv").then(trips => {
            for (let trip of trips) {
                trip.started_at = new Date(trip.started_at);
                trip.ended_at = new Date(trip.ended_at);
            }
            return trips;
        });

        
        arrivals = d3.rollup(trips, v => v.length, d => d.end_station_id);
        departures = d3.rollup(trips, v => v.length, d => d.start_station_id);
        
        stations = stations.map(station => {
            let id = station.Number;
            station.arrivals = arrivals.get(id) ?? 0;
            station.departures = departures.get(id) ?? 0;
            station.totalTraffic = arrivals.get(id) + departures.get(id) ?? 0;
            return station;
        });

        filteredArrivals = d3.rollup(filteredTrips, v => v.length, d => d.end_station_id);
        filteredDepartures = d3.rollup(filteredTrips, v => v.length, d => d.start_station_id);
        // Filtered stations
        filteredStations = stations.map(station => {
            station = {...station}
            let id = station.Number;
            station.arrivals = filteredArrivals.get(id) ?? 0;
            station.departures = filteredDepartures.get(id) ?? 0;
            station.totalTraffic = filteredArrivals.get(id) + filteredDepartures.get(id) ?? 0;
            return station;
        });
    });
</script>

<script>
    import * as d3 from "d3";
  
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    let arc = arcGenerator({
      startAngle: 0,
      endAngle: 2 * Math.PI,
    });
  
    export let data = [];
  
    let pieData = [
      { value: 1, label: "apples" },
      { value: 2, label: "oranges" },
      { value: 3, label: "mangos" },
      { value: 4, label: "pears" },
      { value: 5, label: "limes" },
      { value: 5, label: "cherries" },
    ];
  
    let sliceGenerator = d3.pie().value((d) => d.value);
  
    let arcData;
    $: arcData = sliceGenerator(data);
    let arcs;
    $: arcs = arcData.map((d) => arcGenerator(d));
  
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
  
    export let selectedIndex = -1;
  </script>
  
  <div class="container">
    <svg viewBox="-50 -50 100 100">
      {#each arcs as arc, index}
        <path d={arc} fill={ colors(index) }
            class:selected={selectedIndex === index}
            on:click={(e) => (selectedIndex = selectedIndex === index ? -1 : index)} />
      {/each}
    </svg>
  
    <ul class="legend">
      {#each data as d, index}
        <li style="--color: {colors(index)}">
          <span class="swatch"></span>
          {d.label} <em>({d.value})</em>
        </li>
      {/each}
    </ul>
  </div>
  
  <style>
    .legend {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(9em, 1fr));
      padding: 5%;
      margin: 5px;
    }
  
    .container {
      flex: 1;
      align-items: center;
    }
  
    li {
      aspect-ratio: 3/1;
      border-radius: 5%;
      display: flex;
      align-items: center;
      background-color: var(--color);
    }
    svg {
      max-width: 15em;
      margin-block: 2em;
      display: grid;
  
      /* Do not clip shapes outside the viewBox */
      overflow: visible;
    }
  
    .selected {
      --color: oklch(60% 45% 0) !important;
  
      &:is(path) {
        fill: rgb(133, 47, 47);
      }
    }
  
    svg:has(path:hover) {
      path:not(:hover) {
        opacity: 50%;
      }
    }
  
    path {
      transition: 300ms;
    }
  </style>
  
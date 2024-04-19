<script>
    import * as d3 from "d3";
  
    let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
    // let arc = arcGenerator({
    //   startAngle: 0,
    //   endAngle: 2 * Math.PI,
    // });
  
    export let data = [];
    export let colors = d3.scaleOrdinal(d3.schemeTableau10);
  
    let wedges = {};
    let pieData;
    let oldData = [];
    let transitionDuration = 300;
    
  
    let sliceGenerator = d3.pie().value(d => d.value).sort(null);
  
    export let selectedIndex = -1;

    $: {
      oldData = pieData
      pieData = d3.sort(data, d => d.label);
      let arcData = sliceGenerator(pieData);
      let arcs = arcData.map((d) => arcGenerator(d));
      pieData = pieData.map((d, i) => ({...d, ...arcData[i], arc: arcs[i]}));
      transitionArcs();
    }
    function getEmptyArc (label, data = pieData) {
      // Union of old and new labels in the order they appear
      let labels = d3.sort(new Set([...oldData, ...pieData].map(d => d.label)));
      let labelIndex = labels.indexOf(label);
      let sibling;
      for (let i = labelIndex - 1; i >= 0; i--) {
        sibling = data.find(d => d.label === labels[i]);
        if (sibling) {
          break;
        }
      }

      let angle = sibling?.endAngle ?? 0;
      return {startAngle: angle, endAngle: angle};
    }

    function transitionArcs() {
        let wedgeElements = Object.values(wedges);

        d3.selectAll(wedgeElements).transition("arc")
            .duration(transitionDuration)
            .styleTween("d", function (_, index) {
                let wedge = this;
                let label = Object.keys(wedges)[index];
                let transition = transitionArc(wedge, label);
                return transition?.interpolator;
            });
    }

    function transitionArc (wedge, label) {
        label ??= Object.entries(wedges).find(([label, w]) => w === wedge)[0];
        let d = pieData.find(d => d.label === label);
        let d_old = oldData.find(d => d.label === label);
        if (sameArc(d_old, d)) {
	        return null;
        }
        let from = d_old ? {...d_old} : getEmptyArc(label, oldData);
        let to = d ? {...d} : getEmptyArc(label, pieData);
        let angleInterpolator = d3.interpolate(from, to);
        // t is a number between 0 and 1 that represents the transition progress
        let interpolator = t => `path("${ arcGenerator(angleInterpolator(t)) }")`;
        let type = d ? d_old ? "update" : "in" : "out";
        return {d, d_old, from, to, interpolator, type};
    }


    function arc (wedge) {
        let transition = transitionArc(wedge);
        return {
            duration: transitionDuration,
            css: (t, u) => {
                // t is a number between 0 and 1 that represents the transition progress; u is 1 - t
                return transition.interpolator(transition.type === "out" ? u : t);
            },
            easing: d3.easeCubic
        }
    }

    function sameArc (arc1, arc2) {
        if (!arc1 && !arc2) return true;
        if (!arc1 || !arc2) return false;
        return (arc1.startAngle === arc2.startAngle && arc1.endAngle === arc2.endAngle);
    }

    function toggleWedge(index, event) {
        if (!event.key || event.key === "Enter") {
            selectedIndex = selectedIndex === index ? -1 : index;
        }
    }

  </script>
  
  <div class="container">
    <svg viewBox="-50 -50 100 100">
        {#each pieData as d, index (d.label)}
            <path d={d.arc}
                style="--start-angle: { d.startAngle }rad; --end-angle: { d.endAngle }rad;"
                fill={ colors(d.id ?? d.label) }
                class:selected={selectedIndex === index}
                on:click={e => toggleWedge(index, e)}
                on:keyup={e => toggleWedge(index, e)}
                tabindex="0"
                role="button"
                aria-label="pie slice"
                bind:this={ wedges[d.label] }
                transition:arc/>
        {/each}
    </svg>
    
    <ul class="legend">
        {#each pieData as d, index (d.label)}
            <li style="--color: { colors(d.label) }" 
                class:selected={selectedIndex === index}>
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
      transition-property: transform, opacity, fill;
    }
  </style>
  
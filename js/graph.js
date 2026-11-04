// D3.js 기반 인터랙티브 계보 네트워크 그래프 (Lineage Network Graph)

class ArchiGraph {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = options;
    this.onSelectArchitect = options.onSelectArchitect || (() => {});
    
    this.svg = null;
    this.g = null;
    this.simulation = null;
    this.zoom = null;
    
    this.architects = [];
    this.edges = [];
    this.eras = [];
    this.activeFilterEra = null;
    this.selectedNodeId = null;
    
    this.init();
  }

  init() {
    if (!this.container) return;
    
    // 전용 캔버스 엘리먼트 타겟팅 (플로팅 버튼과 범례 보존)
    let canvasEl = document.getElementById("graph-canvas-container");
    if (!canvasEl) {
      canvasEl = this.container;
    }
    canvasEl.innerHTML = "";
    this.canvasEl = canvasEl;

    // d3 라이브러리 가용성 체크
    if (typeof d3 === "undefined") {
      canvasEl.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-secondary); text-align:center; padding:20px;">
          <div>
            <div style="font-size:1.2rem; font-weight:600; margin-bottom:8px;">그래프 엔진 로딩 중...</div>
            <div style="font-size:0.85rem;">상단의 [시간 타임라인] 또는 [건축가 도감] 탭을 눌러 바로 학습을 시작할 수 있습니다.</div>
          </div>
        </div>
      `;
      return;
    }

    const width = canvasEl.clientWidth || 1000;
    const height = canvasEl.clientHeight || 700;

    // SVG 생성
    this.svg = d3.select(canvasEl)
      .append("svg")
      .attr("id", "graph-svg")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Zoom 설정
    this.zoom = d3.zoom()
      .scaleExtent([0.2, 4])
      .on("zoom", (event) => {
        this.g.attr("transform", event.transform);
      });

    this.svg.call(this.zoom);
    this.svg.on("dblclick.zoom", null);

    // 화살표 마커(Markers) 정의
    const defs = this.svg.append("defs");

    // 기본 화살표 (스승 -> 제자)
    defs.append("marker")
      .attr("id", "arrow-master-disciple")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 26)
      .attr("refY", 0)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#58a6ff");

    // 영향 화살표
    defs.append("marker")
      .attr("id", "arrow-mentor-influence")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 26)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#8b949e");

    // 대립/라이벌 화살표
    defs.append("marker")
      .attr("id", "arrow-rivalry")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 26)
      .attr("refY", 0)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#ef4444");

    // 메인 그룹 컨테이너
    this.g = this.svg.append("g").attr("class", "graph-main-g");

    // 링크 및 노드 레이어 분리
    this.linkLayer = this.g.append("g").attr("class", "links-layer");
    this.nodeLayer = this.g.append("g").attr("class", "nodes-layer");

    // 윈도우 리사이즈 대응
    window.addEventListener("resize", () => {
      if (this.simulation && this.container) {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        this.simulation.force("center", d3.forceCenter(w / 2, h / 2));
        this.simulation.alpha(0.3).restart();
      }
    });

    // 배경 클릭 시 선택 해제
    this.svg.on("click", (event) => {
      if (event.target.tagName === "svg" || event.target.classList.contains("graph-main-g")) {
        this.clearSelection();
      }
    });
  }

  setData(architects, edges, eras) {
    this.architects = architects;
    this.edges = edges;
    this.eras = eras;
    this.render();
  }

  render() {
    if (!this.architects.length || typeof d3 === "undefined") return;
    if (!this.svg) this.init();
    if (!this.svg) return;

    const width = this.container.clientWidth || 1000;
    const height = this.container.clientHeight || 700;

    // Era 컬러 맵
    const eraColorMap = {};
    this.eras.forEach(e => {
      eraColorMap[e.id] = e.color;
    });

    // 노드 데이터 복사
    const nodes = this.architects.map(d => ({
      ...d,
      color: eraColorMap[d.eraId] || "#58a6ff"
    }));

    const nodeById = new Map(nodes.map(d => [d.id, d]));

    // 유효한 링크 필터링
    const links = this.edges
      .filter(e => nodeById.has(e.from) && nodeById.has(e.to))
      .map(e => ({
        source: nodeById.get(e.from),
        target: nodeById.get(e.to),
        type: e.type,
        label: e.label
      }));

    const minYear = 1830;
    const maxYear = 1980;

    this.simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(d => {
        if (d.type === "master-disciple") return 110;
        if (d.type === "collaborator") return 90;
        return 140;
      }))
      .force("charge", d3.forceManyBody().strength(-350))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(38))
      .force("x", d3.forceX(d => {
        const norm = Math.max(0, Math.min(1, (d.birth - minYear) / (maxYear - minYear)));
        return (norm - 0.5) * width * 1.5 + width / 2;
      }).strength(0.35))
      .force("y", d3.forceY(height / 2).strength(0.1));

    // 1. 링크 렌더링
    const link = this.linkLayer
      .selectAll("line")
      .data(links, d => `${d.source.id}->${d.target.id}`)
      .join("line")
      .attr("class", d => `graph-link link-type-${d.type}`)
      .attr("stroke", d => {
        if (d.type === "master-disciple") return "#58a6ff";
        if (d.type === "rivalry") return "#ef4444";
        if (d.type === "collaborator") return "#10b981";
        return "#8b949e";
      })
      .attr("stroke-width", d => (d.type === "master-disciple" ? 2.4 : 1.6))
      .attr("stroke-dasharray", d => {
        if (d.type === "mentor-influence") return "4,4";
        if (d.type === "collaborator") return "6,3";
        return "none";
      })
      .attr("marker-end", d => {
        if (d.type === "master-disciple") return "url(#arrow-master-disciple)";
        if (d.type === "rivalry") return "url(#arrow-rivalry)";
        if (d.type === "mentor-influence") return "url(#arrow-mentor-influence)";
        return null;
      });

    // 2. 노드 그룹 렌더링
    const node = this.nodeLayer
      .selectAll(".node-group")
      .data(nodes, d => d.id)
      .join("g")
      .attr("class", "node-group")
      .attr("data-id", d => d.id)
      .call(this.drag(this.simulation));

    node.selectAll("*").remove();

    const isMaster = (id) => ["frank-lloyd-wright", "le-corbusier", "ludwig-mies", "walter-gropius", "alvar-aalto"].includes(id);

    node.filter(d => isMaster(d.id))
      .append("circle")
      .attr("r", 25)
      .attr("fill", "none")
      .attr("stroke", d => d.color)
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "3,3")
      .attr("opacity", 0.7);

    node.append("circle")
      .attr("class", "node-circle")
      .attr("r", d => isMaster(d.id) ? 20 : 16)
      .attr("fill", "#161b22")
      .attr("stroke", d => d.color);

    node.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .attr("font-size", "9px")
      .attr("font-family", "var(--font-mono)")
      .attr("fill", "#f0f6fc")
      .attr("pointer-events", "none")
      .text(d => d.birth ? String(d.birth).slice(2) : "");

    node.append("text")
      .attr("class", "node-label")
      .attr("text-anchor", "middle")
      .attr("dy", d => isMaster(d.id) ? "34px" : "29px")
      .text(d => d.nameKo);

    node.append("text")
      .attr("class", "node-sublabel")
      .attr("text-anchor", "middle")
      .attr("dy", d => isMaster(d.id) ? "46px" : "41px")
      .text(d => d.country);

    node.on("click", (event, d) => {
      event.stopPropagation();
      this.selectNode(d.id);
      this.onSelectArchitect(d);
    });

    node.on("mouseenter", (event, d) => {
      if (!this.selectedNodeId) {
        this.highlightConnected(d.id);
      }
    });

    node.on("mouseleave", () => {
      if (!this.selectedNodeId) {
        this.clearHighlight();
      }
    });

    this.simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    this.links = link;
    this.nodes = node;
  }

  highlightConnected(nodeId) {
    if (!this.links || !this.nodes) return;
    const connectedNodeIds = new Set([nodeId]);

    this.links.each(function(d) {
      if (d.source.id === nodeId || d.target.id === nodeId) {
        connectedNodeIds.add(d.source.id);
        connectedNodeIds.add(d.target.id);
        d3.select(this).classed("highlighted", true).classed("dimmed", false);
      } else {
        d3.select(this).classed("highlighted", false).classed("dimmed", true);
      }
    });

    this.nodes.each(function(d) {
      if (connectedNodeIds.has(d.id)) {
        d3.select(this).classed("dimmed", false);
      } else {
        d3.select(this).classed("dimmed", true);
      }
    });
  }

  clearHighlight() {
    if (this.links) this.links.classed("highlighted", false).classed("dimmed", false);
    if (this.nodes) this.nodes.classed("dimmed", false);
  }

  selectNode(nodeId) {
    this.selectedNodeId = nodeId;
    this.highlightConnected(nodeId);
  }

  clearSelection() {
    this.selectedNodeId = null;
    this.clearHighlight();
  }

  focusArchitect(architectId) {
    if (!this.nodes || typeof d3 === "undefined") return;
    const targetNode = this.architects.find(a => a.id === architectId);
    if (!targetNode) return;

    this.selectNode(architectId);

    this.nodes.each((d) => {
      if (d.id === architectId) {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        const scale = 1.3;
        const transform = d3.zoomIdentity
          .translate(width / 2 - d.x * scale, height / 2 - d.y * scale)
          .scale(scale);

        this.svg.transition().duration(750).call(this.zoom.transform, transform);
      }
    });
  }

  resetZoom() {
    if (!this.svg || typeof d3 === "undefined") return;
    this.svg.transition().duration(600).call(
      this.zoom.transform,
      d3.zoomIdentity
    );
  }

  zoomBy(factor) {
    if (!this.svg || typeof d3 === "undefined") return;
    this.svg.transition().duration(300).call(this.zoom.scaleBy, factor);
  }

  drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }
}

window.ArchiGraph = ArchiGraph;

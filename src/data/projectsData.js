/*
  Projects Config Data - Desktop Portfolio OS
*/

export const PROJECTS_DATA = {
  cityscan: {
    id: 'cityscan',
    title: 'CityScan.app',
    subtitle: 'AI Infrastructure Damage Detection',
    desc: 'AI-powered mobile app for detecting infrastructure damage using Flutter, YOLOv8, TFLite, GPS tagging, and report generation.',
    stack: ['Flutter', 'YOLOv8', 'TFLite', 'GPS', 'PDF Reports'],
    accentHex: '#2dd4bf',
    accentRGB: '45, 212, 191',
    problem: 'Aging civic infrastructure requires manual, manual audits that are slow, error-prone, and expensive. Municipalities lack a unified, automated channel to discover, catalog, and schedule repairs for structural hazards, road potholes, and broken signs.',
    solution: 'Designed and engineered an automated AI inspection pipeline. Built a high-performance Flutter mobile client that utilizes YOLOv8 models quantized via TFLite for real-time, on-device camera inference. Each anomaly is tagged with active GPS coordinates and instantly reported to a centralized PostgreSQL/Go server, which visualizes telemetry on an interactive mapping dashboard.',
    features: [
      'Real-time edge object detection using quantized TFLite YOLOv8 models',
      'Automated GPS geolocation mapping and spatial coordinate logging',
      'Centralized municipal telemetry dashboard with Leaflet GIS mapping overlays',
      'Programmatic repair scheduling and automated PDF maintenance report generation'
    ],
    role: 'Lead Full-Stack AI & Mobile Architect. Engineered the YOLOv8 model quantization, optimized the Flutter camera stream frame ingestion to achieve 24fps on-device, and developed the Go backend GIS telemetry mapping layers.',
    gitLink: 'https://github.com/RareDeadPool/AI-powered-infrastructure-Damage-Detection',
    liveLink: 'https://city-scan-website.vercel.app/',
    mockScreens: [
      '/projects/cityscan.png'
    ]
  },
  dataviz: {
    id: 'dataviz',
    title: 'DataViz.app',
    subtitle: 'Interactive High-Dimensional Particle System',
    desc: 'An interactive 3D WebGL particle system visualizing massive relational datasets at 60fps using custom GLSL shaders and force-directed node physics.',
    stack: ['WebGL', 'Three.js', 'GLSL Shaders', 'Web Audio API', 'React'],
    accentHex: '#a855f7',
    accentRGB: '168, 85, 247',
    problem: 'Traditional statistical visualizer tools fail to clearly capture structural density and inter-relational vectors inside high-dimensional datasets. Achieving fluid, interactive rendering of over 20,000 nodes simultaneously in a web browser without heating local GPUs was the main engineering challenge.',
    solution: 'Built a customized WebGL visualizer utilizing Three.js and custom GLSL vertex shaders to offload node coordinate transformations directly to GPU compute layers. Coupled with dynamic force-directed gravity simulations and the Web Audio API, which plays synchronized sound waves whose frequencies map to relational connection nodes.',
    features: [
      'Fluid rendering of 20k+ interactive particle nodes operating at a stable 60fps',
      'Custom GPU-bound vertex and fragment shaders for particle glow and mesh lines',
      'Dynamic spatial audio feedback using Web Audio oscillators mapped to node distances',
      'Interactive force-directed graph controls (repulsion, attraction, gravity sliders)'
    ],
    role: 'Creative WebGL Developer & Shader Engineer. Designed the GPU coordinate compute math, authored the custom GLSL gl_PointSize and gradient glow shaders, and mapped spatial audio node connections.',
    gitLink: 'https://github.com/RareDeadPool/DataVZ',
    liveLink: 'https://data-vizard.netlify.app/',
    mockScreens: [
      '/projects/dataviz.png'
    ]
  },
  baatcheet: {
    id: 'baatcheet',
    title: 'Baatcheet.chat',
    subtitle: 'Real-time Collaborative Channel Workspace',
    desc: 'A collaborative real-time message board engine leveraging WebSockets, Redis adapters, caching channels, and MongoDB message storage.',
    stack: ['React', 'Next.js', 'Socket.io', 'Redis', 'MongoDB', 'Tailwind'],
    accentHex: '#22d3ee',
    accentRGB: '34, 211, 238',
    problem: 'Standard channel-based messaging applications face severe message delivery lag, message order confusion, and connection drops when scaled to handle multiple parallel instances during peak traffic.',
    solution: 'Engineered a highly resilient collaborative chat hub. Utilized Node.js with Socket.io connected to a Redis Pub/Sub adapter to instantly sync active websocket threads across auto-scaled cluster nodes. Persistent logs are written to MongoDB with strategic query indexes, while Redis is used to cache channel membership metadata to decrease lookup times.',
    features: [
      'Sub-millisecond real-time message sync using Redis Pub/Sub adapters',
      'Stateful user typing indicator states and user presence tracking',
      'Rich Markdown editor preview widget and dynamic image file uploading',
      'Cached channel listings and optimized persistent thread search logs'
    ],
    role: 'Core Backend Architect. Designed the multi-node Socket.io synchronization protocol, set up the Redis cache architecture, and implemented the React socket listener hooks.',
    gitLink: 'https://github.com/manastamboli/chat-app',
    liveLink: 'https://baatcheet.aditya.dev',
    mockScreens: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBe-2GX2sIGZ_wjYCOxmLCjO0LJJ_Xgz1RwinplB9FchJk3e495uQ95nE9kOLxa6ArSxvrgxErRHclU0gz8pa7a6VaInyt0BSuxEjxKQwukZSYN0yCxIqdrx3SV3qp6TXTwlW5A2467adchpaKtR35VtH5aro8B_i7u4I5_-4Td_8fwQFUnL3k_dQHW8iGGCtuzVAMN1R3kvzdi2nCoX-4sM6rU1ItaajZ6WoT33CXeA_gPZZOJIyVQHCIeeFT-4fcpTdeeP5Ef2IsF',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCe-RgVZfkKGHbL0-QSbhuq4pkSWYfNTM6kLsXs8o2XU9CvGCDbk75lUt2IoWvke6S4zaBQXEXt_V-pTByr7XxAdgjXtfCpgotf1_YYQjGcl9QXRXxBO7vMV9azl4iXiZ09KueX_tPeRZv2ahjv2r9PBXdKE0d5c_gxvBk54q83YfPM_lkCCLbcjTxU6D6PBVWWJMD1laGKVp33oZXunR4UuRtRDaaw6DZ2D2qg7dY5z0gTHCroA7jtxvXLE97ChZPG0hG9BECBbITH',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDv60BAREN245TSya9mgSXW87HXEEbUmkLLAGFxz9j0uIktPX1-BBawXHG3p2E8fdeFV8BdRe6_grkv9_SZcUastJHtJ0GqIw_83s1Idy3dLgjUoEPy8_AD_ycJ3yL5TMvn7Hi1LkEgvugd4WtoSBaX9IvraOTeFm6Ni3Ts1ucrhNKcus4dEiuzVo6pJQDmoEt3YYSS6NDHAlOEnfZcojtEIH-bwff6Ke2VQAIMNi2LfcZ3xPSrllitpYuwMSYlRwUVcVOdWv64wRmG'
    ]
  },
  shivner: {
    id: 'shivner',
    title: 'Shivner.api',
    subtitle: 'High-Performance Logistics Routing Engine',
    desc: 'A high-throughput routing engine utilizing custom graph algorithms to calculate dynamic fleet transit maps under live traffic density.',
    stack: ['Go', 'Rust', 'gRPC', 'PostgreSQL', 'Redis', 'Docker'],
    accentHex: '#fb923c',
    accentRGB: '251, 146, 60',
    problem: 'Dynamic logistics planning for massive truck fleets suffers from exponential heuristics growth. Calculating shortest-path routes under volatile, real-time city traffic conditions with traditional REST layers created bottlenecks.',
    solution: 'Architected a hybrid microservices framework. Created a low-latency routing core in Rust implementing modified Dijkstra algorithms. The core communicates via gRPC with a Go backend gateway. Routes are stored in PostgreSQL with PostGIS extensions, and Redis caches highly queried route configurations.',
    features: [
      'Sub-10ms graph path computations utilizing optimized Rust cores',
      'gRPC communication protocols ensuring high-throughput binary serialization',
      'Geospatial PostGIS query indexing for spatial layout coordinate updates',
      'Containerized microservices orchestration via Docker Compose'
    ],
    role: 'Lead Backend Developer. Designed the gRPC interface definitions, built the Go API gateway with REST fallback end-points, and optimized SQL PostGIS queries for distance indexing.',
    gitLink: 'https://github.com/KishuKing/Shivner-Pratishthan-Frontend',
    liveLink: 'https://www.shivnerpratishthan.org/',
    mockScreens: [
      '/projects/shivner.png'
    ]
  }
};

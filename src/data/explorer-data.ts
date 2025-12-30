import { ExplorerData } from '@/types';

export const explorerData: ExplorerData = {
  nodes: [
    // ─────────────────────────────────────────────────────────────
    // FOUNDATION MODEL (Layer 1)
    // ─────────────────────────────────────────────────────────────
    {
      id: 'foundation',
      category: 'foundation',
      label: 'Foundation Model',
      description: 'Core AI engine powering all optimization capabilities. Advanced ML models for routing, scheduling, and resource allocation.',
      icon: 'Brain',
      status: 'live',
      tags: ['AI/ML', 'Core Engine', 'Multi-Domain'],
      link: {
        url: 'https://docs.omelet.ai/foundation',
        type: 'api-docs',
        label: 'Foundation Docs',
      },
    },

    // ─────────────────────────────────────────────────────────────
    // SOLVERS (Layer 2)
    // ─────────────────────────────────────────────────────────────
    {
      id: 'routing-engine',
      category: 'solver',
      label: 'Routing',
      description: 'Vehicle routing optimization API. Multi-stop, multi-vehicle routing with real-time traffic integration and capacity constraints.',
      icon: 'Route',
      status: 'live',
      tags: ['VRP', 'CVRP', 'VRPTW'],
      link: {
        url: 'https://www.oaasis.cc/routing',
        type: 'demo',
        label: 'Try Demo',
      },
    },
    {
      id: 'scheduling-engine',
      category: 'solver',
      label: 'Scheduling',
      description: 'Advanced scheduling optimization for jobs, resources, and appointments. Handles complex constraints and preferences.',
      icon: 'Calendar',
      status: 'live',
      tags: ['RCPSP', 'JSP', 'FSP'],
      link: {
        url: 'https://api.omelet.ai/scheduling',
        type: 'api-docs',
        label: 'API Docs',
      },
    },
    {
      id: 'packaging-engine',
      category: 'solver',
      label: 'Packaging',
      description: 'Container and cargo optimization. 2D/3D packing algorithms for efficient space utilization.',
      icon: 'Package',
      status: 'live',
      tags: ['3D Packing', 'Stowage'],
      link: {
        url: 'https://api.omelet.ai/packing',
        type: 'api-docs',
        label: 'API Docs',
      },
    },
    {
      id: 'inventory-engine',
      category: 'solver',
      label: 'Inventory Control',
      description: 'Smart inventory management with demand forecasting, safety stock optimization, and reorder point calculation.',
      icon: 'Warehouse',
      status: 'live',
      tags: ['Demand Planning', 'Inventory'],
      link: {
        url: 'https://api.omelet.ai/inventory',
        type: 'api-docs',
        label: 'API Docs',
      },
    },

    // ─────────────────────────────────────────────────────────────
    // MCP SERVERS (Layer 3) - Domain Specific
    // ─────────────────────────────────────────────────────────────
    // Routing Solver MCP Servers
    {
      id: 'tms-mcp',
      category: 'mcp-server',
      label: 'TMS',
      description: 'Transportation Management System server. Fleet management, dispatch optimization, and route planning.',
      icon: 'Truck',
      status: 'live',
      tags: ['Fleet', 'Transport'],
      link: {
        url: 'https://mcp.omelet.ai/tms',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    {
      id: 'delivery-mcp',
      category: 'mcp-server',
      label: 'Delivery',
      description: 'Last mile delivery optimization. Real-time tracking, proof of delivery, and route optimization.',
      icon: 'MapPin',
      status: 'live',
      tags: ['Last Mile', 'Delivery'],
      link: {
        url: 'https://mcp.omelet.ai/delivery',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    // Scheduling Solver MCP Servers
    {
      id: 'nurse-scheduling-mcp',
      category: 'mcp-server',
      label: 'Nurse Scheduling',
      description: 'Healthcare staff scheduling. Nurse rostering, shift management, and skill-based assignment.',
      icon: 'Heart',
      status: 'live',
      tags: ['Healthcare', 'Nursing'],
      link: {
        url: 'https://mcp.omelet.ai/nurse-scheduling',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    {
      id: 'crew-scheduling-mcp',
      category: 'mcp-server',
      label: 'Crew Scheduling',
      description: 'Crew rostering and shift optimization. Aviation, maritime, and transportation crew management.',
      icon: 'Users',
      status: 'live',
      tags: ['Crew', 'Aviation'],
      link: {
        url: 'https://mcp.omelet.ai/crew-scheduling',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    // Packaging Solver MCP Servers
    {
      id: 'stowage-planning-mcp',
      category: 'mcp-server',
      label: 'Stowage Planning',
      description: 'Container and cargo stowage optimization. Vessel loading, weight distribution, and stability.',
      icon: 'Ship',
      status: 'live',
      tags: ['Maritime', 'Stowage'],
      link: {
        url: 'https://mcp.omelet.ai/stowage-planning',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    {
      id: 'bin-packing-mcp',
      category: 'mcp-server',
      label: '3D Bin-Packing',
      description: '3D bin packing and container loading. Optimal space utilization and load planning.',
      icon: 'Box',
      status: 'live',
      tags: ['3D Packing', 'Loading'],
      link: {
        url: 'https://mcp.omelet.ai/bin-packing',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    // Inventory Control Solver MCP Servers
    {
      id: 'retail-inventory-mcp',
      category: 'mcp-server',
      label: 'Retail Inventory',
      description: 'Retail inventory optimization. Stock levels, replenishment, and store allocation.',
      icon: 'ShoppingCart',
      status: 'live',
      tags: ['Retail', 'Inventory'],
      link: {
        url: 'https://mcp.omelet.ai/retail-inventory',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },
    {
      id: 'demand-prediction-mcp',
      category: 'mcp-server',
      label: 'Demand Prediction',
      description: 'Demand forecasting and prediction. ML-based demand planning and trend analysis.',
      icon: 'TrendingUp',
      status: 'live',
      tags: ['Forecasting', 'ML'],
      link: {
        url: 'https://mcp.omelet.ai/demand-prediction',
        type: 'api-docs',
        label: 'MCP Docs',
      },
    },

    // ─────────────────────────────────────────────────────────────
    // APPLICATIONS (Layer 4) - User Specific Customizations
    // ─────────────────────────────────────────────────────────────
    // TMS MCP Applications
    {
      id: 'tms-web',
      category: 'application',
      label: 'TMS Web',
      description: 'Full-featured TMS application with route planning, fleet management, and real-time tracking.',
      icon: 'Monitor',
      status: 'live',
      link: { url: 'https://www.oaasis.cc/tms/', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'tms-mobile',
      category: 'application',
      label: 'TMS App',
      description: 'Driver companion app with navigation, proof of delivery, and real-time communication.',
      icon: 'Smartphone',
      status: 'live',
      link: { url: 'https://www.oaasis.cc/tms/', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'fleet-dashboard',
      category: 'application',
      label: 'Fleet Dashboard',
      description: 'Real-time fleet monitoring dashboard with GPS tracking and vehicle status.',
      icon: 'Monitor',
      status: 'live',
      link: { url: 'https://fleet.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // Delivery MCP Applications
    {
      id: 'lastmile-tracker',
      category: 'application',
      label: 'LastMile Tracker',
      description: 'Customer-facing delivery tracking with ETA and real-time notifications.',
      icon: 'Target',
      status: 'live',
      link: { url: 'https://track.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // Nurse Scheduling MCP Applications
    {
      id: 'hospital-scheduler',
      category: 'application',
      label: 'Nurse Scheduling Web',
      description: 'Nurse scheduling application. Manage shifts, skills, and compliance requirements.',
      icon: 'CalendarCheck',
      status: 'live',
      link: { url: 'https://cau.scheduling.oaasis.cc/en/login', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'hospital-admin',
      category: 'application',
      label: 'Hospital Admin',
      description: 'Hospital administration portal for staff management and resource allocation.',
      icon: 'Building2',
      status: 'live',
      link: { url: 'https://admin.hospital.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // Crew Scheduling MCP Applications
    {
      id: 'workforce-planner',
      category: 'application',
      label: 'Crew Planner',
      description: 'Crew scheduling application. Aviation, maritime, and transportation crew management.',
      icon: 'Users',
      status: 'live',
      link: { url: 'https://workforce.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'airline-crew',
      category: 'application',
      label: 'Airline Crew',
      description: 'Flight crew scheduling with fatigue management and regulatory compliance.',
      icon: 'Plane',
      status: 'live',
      link: { url: 'https://airline.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'maritime-roster',
      category: 'application',
      label: 'Maritime Roster',
      description: 'Ship crew rostering with certification tracking and voyage planning.',
      icon: 'Ship',
      status: 'live',
      link: { url: 'https://maritime.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // Stowage Planning MCP Applications
    {
      id: 'port-terminal',
      category: 'application',
      label: 'Stowage Planner',
      description: 'Container stowage planning system for vessel loading and weight distribution.',
      icon: 'Globe',
      status: 'live',
      link: { url: 'https://port.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'cargo-optimizer',
      category: 'application',
      label: 'Cargo Optimizer',
      description: 'Cargo load optimization for maximum space utilization and stability.',
      icon: 'Layers',
      status: 'live',
      link: { url: 'https://cargo.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // 3D Bin-Packing MCP Applications
    {
      id: 'wms-app',
      category: 'application',
      label: 'Bin Packing App',
      description: '3D bin packing application for container loading and space optimization.',
      icon: 'Package',
      status: 'live',
      link: { url: 'https://wms.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'warehouse-loader',
      category: 'application',
      label: 'Warehouse Loader',
      description: 'Truck and pallet loading optimization for warehouse operations.',
      icon: 'Box',
      status: 'live',
      link: { url: 'https://loader.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // Retail Inventory MCP Applications
    {
      id: 'retail-dashboard',
      category: 'application',
      label: 'Retail Dashboard',
      description: 'Retail inventory dashboard with stock levels and replenishment alerts.',
      icon: 'Store',
      status: 'live',
      link: { url: 'https://retail.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    {
      id: 'store-manager',
      category: 'application',
      label: 'Store Manager',
      description: 'Store-level inventory management with ordering and receiving.',
      icon: 'ShoppingCart',
      status: 'live',
      link: { url: 'https://store.omelet.ai', type: 'demo', label: 'Launch App' },
    },
    // Demand Prediction MCP Applications
    {
      id: 'analytics-hub',
      category: 'application',
      label: 'Demand Analytics',
      description: 'Demand forecasting dashboard with ML-powered predictions and trend analysis.',
      icon: 'TrendingUp',
      status: 'live',
      link: { url: 'https://analytics.omelet.ai', type: 'demo', label: 'Launch App' },
    },
  ],

  edges: [
    // Foundation -> Solvers
    { source: 'foundation', target: 'routing-engine' },
    { source: 'foundation', target: 'scheduling-engine' },
    { source: 'foundation', target: 'packaging-engine' },
    { source: 'foundation', target: 'inventory-engine' },

    // Routing Solver -> MCP Servers
    { source: 'routing-engine', target: 'tms-mcp' },
    { source: 'routing-engine', target: 'delivery-mcp' },
    
    // Scheduling Solver -> MCP Servers
    { source: 'scheduling-engine', target: 'nurse-scheduling-mcp' },
    { source: 'scheduling-engine', target: 'crew-scheduling-mcp' },
    
    // Packaging Solver -> MCP Servers
    { source: 'packaging-engine', target: 'stowage-planning-mcp' },
    { source: 'packaging-engine', target: 'bin-packing-mcp' },
    
    // Inventory Control Solver -> MCP Servers
    { source: 'inventory-engine', target: 'retail-inventory-mcp' },
    { source: 'inventory-engine', target: 'demand-prediction-mcp' },

    // MCP Servers -> Applications
    // TMS MCP -> Applications
    { source: 'tms-mcp', target: 'tms-web' },
    { source: 'tms-mcp', target: 'tms-mobile' },
    { source: 'tms-mcp', target: 'fleet-dashboard' },
    // Delivery MCP -> Applications
    { source: 'delivery-mcp', target: 'lastmile-tracker' },
    { source: 'delivery-mcp', target: 'tms-mobile' },
    // Nurse Scheduling MCP -> Applications
    { source: 'nurse-scheduling-mcp', target: 'hospital-scheduler' },
    { source: 'nurse-scheduling-mcp', target: 'hospital-admin' },
    // Crew Scheduling MCP -> Applications
    { source: 'crew-scheduling-mcp', target: 'workforce-planner' },
    { source: 'crew-scheduling-mcp', target: 'airline-crew' },
    { source: 'crew-scheduling-mcp', target: 'maritime-roster' },
    // Stowage Planning MCP -> Applications
    { source: 'stowage-planning-mcp', target: 'port-terminal' },
    { source: 'stowage-planning-mcp', target: 'cargo-optimizer' },
    // 3D Bin-Packing MCP -> Applications
    { source: 'bin-packing-mcp', target: 'wms-app' },
    { source: 'bin-packing-mcp', target: 'warehouse-loader' },
    // Retail Inventory MCP -> Applications
    { source: 'retail-inventory-mcp', target: 'retail-dashboard' },
    { source: 'retail-inventory-mcp', target: 'store-manager' },
    // Demand Prediction MCP -> Applications
    { source: 'demand-prediction-mcp', target: 'analytics-hub' },
    { source: 'demand-prediction-mcp', target: 'retail-dashboard' },
  ],
};
